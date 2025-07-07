"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import styles from "./JogakCategory.module.css";
import experienceIcon from "@/assets/images/required-experience-and-competencies.svg";
import { JogakModal } from "./JogakModal";

interface JogakItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Props {
  state?: "done" | "active" | "default";
  className?: string;
  title?: string;
  initialItems?: JogakItem[];
  onItemToggle?: (itemId: string) => void;
  checkboxColor?: string;
  icon?: StaticImageData;
}

export function JogakCategory({
  state = "default",
  className = "",
  title = "필요한 경험과 역량",
  initialItems = [
    { id: "1", text: "경력 기간 명확화", completed: false },
    { id: "2", text: "리더 경험 만들기", completed: false },
    { id: "3", text: "최대 10개 표시입니다.", completed: false },
    { id: "4", text: "TO DO LIST EXAMPLE", completed: false },
  ],
  onItemToggle,
  checkboxColor = "#D9A9F9",
  icon = experienceIcon
}: Props) {
  const [items, setItems] = useState<JogakItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemToggle = (itemId: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
    onItemToggle?.(itemId);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`${styles.jogakCategory} ${className}`}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <Image 
            src={icon}
            alt={title}
            width={40}
            height={40}
          />
        </div>
        
        <div className={`${styles.title} ${styles[`state-${state}`]}`}>
          {["active", "default"].includes(state) && (
            <div className={styles.titleText}>{title}</div>
          )}
          
          {state === "done" && (
            <>
              <div className={styles.titleText}>{title}</div>
              <div className={styles.doneChip}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="var(--brandspec-pu400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className={styles.doneText}>완료</div>
              </div>
            </>
          )}
        </div>
        
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          className={styles.chevron}
          onClick={handleModalOpen}
          style={{ cursor: 'pointer' }}
        >
          <path d="M9 18L15 12L9 6" stroke="#94A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className={`${styles.itemList} ${styles[`state-${state}`]}`}>
        {items.map((item) => (
          <div key={item.id} className={styles.jogakItem} onClick={() => handleItemToggle(item.id)}>
            <div className={styles.itemContent}>
              <div 
                className={`${styles.checkbox} ${item.completed ? styles.checked : ''}`}
                style={item.completed ? { borderColor: checkboxColor } : {}}
              >
                {item.completed && (
                  <div className={styles.checkSquare} style={{ backgroundColor: checkboxColor }} />
                )}
              </div>
              <div className={styles.itemText}>{item.text}</div>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.itemChevron}>
              <path d="M9 18L15 12L9 6" stroke="#B0BDCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}
      </div>

      <JogakModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={title}
        items={items}
        icon={icon}
        checkboxColor={checkboxColor}
        onItemToggle={handleItemToggle}
      />
    </div>
  );
}