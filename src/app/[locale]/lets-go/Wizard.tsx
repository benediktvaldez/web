'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { WIZARD_STEPS, trackInquirySubmitted, trackWizardStep } from '@/lib/analytics';
import { submitInquiry } from './actions';
import styles from './page.module.css';

interface Props {
  locale: Locale;
  t: Dictionary['letsGo'];
}

export function Wizard({ locale, t }: Props) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [timeline, setTimeline] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [isPending, startTransition] = useTransition();

  // Anti-spam: capture mount time so the server can reject submissions that
  // arrive impossibly fast (typical bot behaviour). useState's lazy init runs
  // exactly once at mount.
  const [mountedAt] = useState(() => Date.now());

  useEffect(() => {
    trackWizardStep('type', locale);
  }, [locale]);

  const goTo = (next: number) => {
    setStep(next);
    if (next >= 0 && next < WIZARD_STEPS.length) {
      trackWizardStep(WIZARD_STEPS[next], locale);
    }
  };
  const advance = () => goTo(step + 1);
  const back = () => goTo(Math.max(0, step - 1));

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = () => {
    setError('');
    setEmailError('');

    if (!name.trim()) return;
    if (!email.trim() || !isValidEmail(email.trim())) {
      setEmailError(
        locale === 'is'
          ? 'Vinsamlegast sláðu inn gilt netfang'
          : 'Please enter a valid email address',
      );
      return;
    }

    startTransition(async () => {
      const result = await submitInquiry({
        type,
        details,
        timeline,
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        locale,
        honeypot,
        mountedAt,
      });
      if (result.success) {
        trackInquirySubmitted(locale, type, timeline);
        advance();
      } else {
        setError(t.error);
      }
    });
  };

  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.langCorner}>
        <LanguageSwitcher locale={locale} />
      </div>

      <div className={styles.progress}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`${styles.dot} ${i <= step ? styles.dotActive : ''}`} />
        ))}
      </div>

      <div key={step} className={styles.stepContent}>
        {step === 0 && (
          <div className={styles.step}>
            <h1 className={styles.heading}>{t.step1.heading}</h1>
            <div className={styles.options}>
              {t.step1.options.map((option) => (
                <button
                  key={option}
                  className={`${styles.option} ${type === option ? styles.optionSelected : ''}`}
                  onClick={() => {
                    setType(option);
                    advance();
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className={styles.step}>
            <h1 className={styles.heading}>{t.step2.heading}</h1>
            <p className={styles.stepDescription}>{t.step2.placeholder}</p>
            <textarea
              className={styles.textarea}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
            />
            <div className={styles.actions}>
              <button className={styles.backButton} onClick={back}>
                {t.back}
              </button>
              <button className={styles.nextButton} onClick={advance}>
                {details.trim() ? '→' : t.step2.skip}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h1 className={styles.heading}>{t.step3.heading}</h1>
            <div className={styles.options}>
              {t.step3.options.map((option) => (
                <button
                  key={option}
                  className={`${styles.option} ${timeline === option ? styles.optionSelected : ''}`}
                  onClick={() => {
                    setTimeline(option);
                    advance();
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className={styles.backButton} onClick={back}>
              {t.back}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className={styles.step}>
            <h1 className={styles.heading}>{t.step4.heading}</h1>
            <div className={styles.form}>
              <input
                className={styles.input}
                type="text"
                placeholder={t.step4.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className={styles.fieldGroup}>
                <input
                  className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                  type="email"
                  placeholder={t.step4.email}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  onBlur={() => {
                    if (email.trim() && !isValidEmail(email.trim())) {
                      setEmailError(
                        locale === 'is'
                          ? 'Vinsamlegast sláðu inn gilt netfang'
                          : 'Please enter a valid email address',
                      );
                    }
                  }}
                  required
                />
                {emailError && <p className={styles.fieldError}>{emailError}</p>}
              </div>
              <input
                className={styles.input}
                type="text"
                placeholder={t.step4.company}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              {/* Honeypot — hidden from humans, attractive to dumb bots. */}
              <input
                className={styles.honeypot}
                type="text"
                name="company_url"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                aria-hidden="true"
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>
            <button className={styles.summaryToggle} onClick={() => setShowSummary(!showSummary)}>
              {showSummary
                ? locale === 'is'
                  ? 'Fela svör'
                  : 'Hide summary'
                : locale === 'is'
                  ? 'Sjá svörin mín'
                  : 'Review my answers'}
            </button>
            {showSummary && (
              <dl className={styles.summary}>
                {type && (
                  <>
                    <dt>{t.step1.heading}</dt>
                    <dd>{type}</dd>
                  </>
                )}
                {details && (
                  <>
                    <dt>{t.step2.heading}</dt>
                    <dd>{details}</dd>
                  </>
                )}
                {timeline && (
                  <>
                    <dt>{t.step3.heading}</dt>
                    <dd>{timeline}</dd>
                  </>
                )}
              </dl>
            )}
            <div className={styles.actions}>
              <button className={styles.backButton} onClick={back}>
                {t.back}
              </button>
              <button
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={isPending || !name.trim() || !isValidEmail(email.trim())}
              >
                {isPending ? '...' : t.step4.submit}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={styles.step}>
            <h1 className={styles.heading}>{t.step5.heading}</h1>
            <p className={styles.message}>{t.step5.message}</p>
            <Link href={`/${locale}`} className={styles.backLink}>
              {t.step5.backToSite}
            </Link>
          </div>
        )}
      </div>

      {step < 4 && (
        <Link
          href={`/${locale}`}
          className={styles.dismiss}
          onClick={() =>
            trackWizardStep('dismissed', locale, {
              atStep: WIZARD_STEPS[step] ?? 'unknown',
            })
          }
        >
          {locale === 'is' ? 'Bara að skoða' : 'Just browsing'}
        </Link>
      )}
    </main>
  );
}
