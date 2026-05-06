'use client';

import { useState, useTransition } from 'react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { subscribe } from '@/lib/newsletter/actions';
import styles from './SubscribeForm.module.css';

interface Props {
  locale: Locale;
  t: Dictionary['subscribe'];
  variant?: 'inline' | 'block';
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function SubscribeForm({ locale, t, variant = 'inline' }: Props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setEmailError('');

    const trimmed = email.trim();
    if (!trimmed || !isValidEmail(trimmed)) {
      setEmailError(t.invalidEmail);
      return;
    }

    startTransition(async () => {
      const result = await subscribe({ email: trimmed, locale });
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(t.error);
      }
    });
  };

  const containerClass =
    variant === 'block' ? `${styles.container} ${styles.block}` : styles.container;

  if (submitted) {
    return (
      <div className={containerClass} role="status">
        <p className={styles.heading}>{t.successHeading}</p>
        <p className={styles.successBody}>{t.successBody}</p>
      </div>
    );
  }

  return (
    <form className={containerClass} onSubmit={handleSubmit} noValidate>
      {variant === 'block' ? (
        <p className={styles.heading}>{t.heading}</p>
      ) : (
        <p className={styles.inlineHeading}>{t.inlineHeading}</p>
      )}
      {variant === 'block' && t.intro && <p className={styles.intro}>{t.intro}</p>}
      <div className={styles.fieldRow}>
        <label className={styles.srOnly} htmlFor={`subscribe-email-${variant}`}>
          {t.emailLabel}
        </label>
        <input
          id={`subscribe-email-${variant}`}
          className={`${styles.input} ${emailError ? styles.inputError : ''}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError('');
          }}
          onBlur={() => {
            const trimmed = email.trim();
            if (trimmed && !isValidEmail(trimmed)) setEmailError(t.invalidEmail);
          }}
          required
          aria-invalid={emailError ? 'true' : 'false'}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isPending || !isValidEmail(email.trim())}
        >
          {isPending ? '...' : t.submit}
        </button>
      </div>
      {emailError && <p className={styles.fieldError}>{emailError}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.privacy}>{t.privacy}</p>
    </form>
  );
}
