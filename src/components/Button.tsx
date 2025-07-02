"use client";

import styles from "./Button.module.css";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary" | "disabled";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = "primary", children, onClick }: ButtonProps) {
  return (
    <button 
      className={`${styles.btn} ${styles[variant]}`}
      onClick={onClick}
      disabled={variant === "disabled"}
    >
      <div className={styles.textWrapper}>{children}</div>
    </button>
  );
}