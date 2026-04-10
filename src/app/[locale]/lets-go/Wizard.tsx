'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
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
  const [isPending, startTransition] = useTransition();

  const advance = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

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
      });
      if (result.success) {
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
            <textarea
              className={styles.textarea}
              placeholder={t.step2.placeholder}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
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
              {error && <p className={styles.error}>{error}</p>}
            </div>
            <div className={styles.actions}>
              <button className={styles.backButton} onClick={back}>
                {t.back}
              </button>
              <button
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={isPending || !name.trim() || !email.trim()}
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
        <Link href={`/${locale}`} className={styles.dismiss}>
          {locale === 'is' ? 'Bara að skoða' : 'Just browsing'}
        </Link>
      )}
    </main>
  );
}
