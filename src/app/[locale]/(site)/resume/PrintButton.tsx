"use client";

import styles from "./page.module.css";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      className={styles.printButton}
      data-print-hide
      onClick={() => window.print()}
    >
      {label}
    </button>
  );
}
