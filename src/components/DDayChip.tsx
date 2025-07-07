import React from "react";
import styles from "./DDayChip.module.css";

interface Props {
  alarm?: "on" | "off";
  state?: "default" | "alarm";
  className?: string;
  dDay?: number;
}

export function DDayChip({ 
  alarm = "off", 
  state = "default", 
  className = "",
  dDay = 52 
}: Props) {
  return (
    <div className={`${styles.chip} ${styles[state]} ${className}`}>
      <span className={styles.text}>D-{dDay}</span>
    </div>
  );
}