"use client";

import React, { useState } from "react";
import styles from "./MemoBox.module.css";

interface Props {
  maxLength?: number;
  placeholder?: string;
  className?: string;
}

export function MemoBox({ 
  maxLength = 1000, 
  placeholder = "해당 조각에 대해 메모해보세요.",
  className = ""
}: Props) {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  return (
    <div className={`${styles.memoBox} ${className}`}>
      <textarea
        className={styles.textArea}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
      />
      <div className={styles.countWrapper}>
        <div className={styles.count}>{text.length}/{maxLength}</div>
      </div>
    </div>
  );
}