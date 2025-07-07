"use client";

import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import styles from "./JogakModal.module.css";
import { JogakDetailModal } from "./JogakDetailModal";
import { Button } from "./Button";

interface JogakItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  items?: JogakItem[];
  icon?: StaticImageData;
  checkboxColor?: string;
  onItemToggle?: (itemId: string) => void;
}

export function JogakModal({
  isOpen,
  onClose,
  title = "필요한 경험과 역량",
  items = [],
  icon,
  checkboxColor = "#D9A9F9",
  onItemToggle
}: Props) {
  if (!isOpen) return null;

  const completedCount = items.filter(item => item.completed).length;
  const allCompleted = completedCount === items.length;

  return (
    <>
      {/* Modal backdrop */}
      <div className={styles.backdrop} onClick={onClose} />
      
      {/* Modal content */}
      <div className={styles.jogakModal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.headerLeft}>
              {icon && (
                <Image src={icon} alt={title} width={40} height={40} />
              )}
              <div className={styles.modalTitle}>{title}</div>
              {allCompleted && (
                <div className={styles.doneChip}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M10 3L4.5 8.5L2 6" stroke="var(--brandspec-pu400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className={styles.doneText}>완료</div>
                </div>
              )}
            </div>
            <button className={styles.closeButton} onClick={onClose}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M25 11L11 25M11 11L25 25" stroke="#94A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.itemsWrapper}>
            <div className={styles.itemsList}>
              {items.map((item) => (
                <JogakDetailModal
                  key={item.id}
                  state={item.completed ? "done" : "default"}
                  text={item.text}
                  onClick={() => onItemToggle?.(item.id)}
                  checkboxColor={checkboxColor}
                  completedAt={item.completed ? "24.12.15 14:30:00" : undefined}
                  onEdit={() => console.log(`Edit item: ${item.id}`)}
                  onDelete={() => console.log(`Delete item: ${item.id}`)}
                />
              ))}
              <JogakDetailModal state="add-custom" onClick={() => console.log("Add custom item")} />
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button
            variant="tertiary"
            onClick={onClose}
            className={styles.mainButton}
          >
            닫기
          </Button>
        </div>
      </div>
    </>
  );
}