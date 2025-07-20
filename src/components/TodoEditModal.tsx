"use client";

import React, { useState, useEffect } from "react";
import styles from "./TodoEditModal.module.css";
import { Button } from "./Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { category: string; title: string; content: string }) => void;
  initialData?: {
    category: string;
    title: string;
    content: string;
  };
  categories: { value: string; label: string }[];
}

export function TodoEditModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  categories
}: Props) {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    content: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        category: categories[0]?.value || "",
        title: "",
        content: ""
      });
    }
  }, [initialData, categories, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      onSave(formData);
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal backdrop */}
      <div className={styles.backdrop} onClick={onClose} />
      
      {/* Modal content */}
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>
              {initialData ? "조각 수정" : "조각 추가"}
            </h3>
            <button className={styles.closeButton} onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="#94A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>카테고리</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className={styles.select}
                required
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>제목</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={styles.input}
                placeholder="제목을 입력하세요 (최대 50자)"
                maxLength={50}
                required
              />
              <div className={styles.charCount}>
                {formData.title.length}/50
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>내용</label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                className={styles.textarea}
                placeholder="내용을 입력하세요 (최소 30자)"
                minLength={30}
                rows={5}
                required
              />
              <div className={styles.charCount}>
                {formData.content.length}자 {formData.content.length < 30 && `(최소 30자 필요)`}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <Button
                variant="tertiary"
                onClick={onClose}
                type="button"
              >
                취소
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={!formData.title.trim() || !formData.content.trim() || formData.content.length < 30}
              >
                {initialData ? "수정" : "추가"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}