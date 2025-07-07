"use client";

import styles from "./Button.module.css";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary" | "disabled";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({ variant = "primary", children, onClick, className = "" }: ButtonProps) {
  return (
    <button 
      className={`${styles.btn} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={variant === "disabled"}
    >
      <div className={styles.textWrapper}>{children}</div>
    </button>
  );
}