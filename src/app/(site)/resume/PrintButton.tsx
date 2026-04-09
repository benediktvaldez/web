"use client";

import styles from "./page.module.css";

export function PrintButton() {
  return (
    <button
      className={styles.printButton}
      data-print-hide
      onClick={() => window.print()}
    >
      Print / Save as PDF
    </button>
  );
}
