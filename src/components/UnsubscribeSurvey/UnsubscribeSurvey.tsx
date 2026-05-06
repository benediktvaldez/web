'use client';

import { useState, useTransition } from 'react';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { submitUnsubscribeFeedback, type FeedbackReason } from '@/lib/newsletter/actions';
import styles from './UnsubscribeSurvey.module.css';

interface Props {
  token: string;
  t: Dictionary['subscribe']['survey'];
}

const REASONS: FeedbackReason[] = ['inboxCleanup', 'notForMe', 'accidental', 'other'];

export function UnsubscribeSurvey({ token, t }: Props) {
  const [reason, setReason] = useState<FeedbackReason | null>(null);
  const [reasonOther, setReasonOther] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (dismissed) return null;

  if (submitted) {
    return (
      <div className={styles.container} role="status">
        <p className={styles.thankYou}>{t.thankYou}</p>
      </div>
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!reason) return;
    startTransition(async () => {
      await submitUnsubscribeFeedback({
        token,
        reason,
        reasonOther: reason === 'other' ? reasonOther.trim() || undefined : undefined,
      });
      setSubmitted(true);
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <p className={styles.leadIn}>{t.leadIn}</p>
      <fieldset className={styles.fieldset}>
        <legend className={styles.srOnly}>{t.leadIn}</legend>
        {REASONS.map((key) => (
          <label key={key} className={styles.option}>
            <input
              type="radio"
              name="reason"
              value={key}
              checked={reason === key}
              onChange={() => setReason(key)}
              className={styles.radio}
            />
            <span className={styles.optionLabel}>{t.reasons[key]}</span>
          </label>
        ))}
      </fieldset>
      {reason === 'other' && (
        <textarea
          className={styles.textarea}
          placeholder={t.otherPlaceholder}
          value={reasonOther}
          onChange={(e) => setReasonOther(e.target.value)}
          rows={3}
          maxLength={2000}
        />
      )}
      <div className={styles.actions}>
        <button type="button" className={styles.dismissButton} onClick={() => setDismissed(true)}>
          {t.noThanks}
        </button>
        <button type="submit" className={styles.submitButton} disabled={!reason || isPending}>
          {isPending ? '...' : t.submit}
        </button>
      </div>
    </form>
  );
}
