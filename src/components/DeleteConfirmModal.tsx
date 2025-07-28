"use client";

import React from "react";
import styles from "./DeleteConfirmModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "채용공고 삭제",
  message = "이 채용공고를 삭제하시겠습니까?\n삭제된 채용공고는 복구할 수 없습니다."
}: Props) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <p className={styles.modalMessage}>
          {message.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < message.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        <div className={styles.modalButtons}>
          <button 
            className={styles.modalCancel}
            onClick={onClose}
          >
            취소
          </button>
          <button 
            className={styles.modalConfirm}
            onClick={onConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}