"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/Button";
import arrowBackIcon from "@/assets/images/ic_arrow_back.svg";
import arrowDropDownIcon from "@/assets/images/ic_drop_down.svg";
import chatInfoIcon from "@/assets/images/ic_chat_info.svg";

export default function CreateResumePage() {
  const router = useRouter();
  const [resumeTitle, setResumeTitle] = useState("나의 이력서");
  const [resumeText, setResumeText] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeTitle(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
  };

  const toggleHelp = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  return (
    <>
      <Header backgroundColor="white" showLogout={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <button className={styles.backButton} onClick={handleBack}>
              <Image 
                src={arrowBackIcon}
                alt="뒤로가기"
                width={15.57}
                height={15.16}
              />
            </button>
            <h1 className={styles.title}>나의 이력서 만들기</h1>
            <Button variant="disabled" className={styles.pdfButton}>
              PDF로 불러오기
            </Button>
          </div>

          <div className={styles.content}>
            <div className={styles.resumeSection}>
              <div className={styles.resumeHeader}>
                <input
                  type="text"
                  className={styles.resumeTitleInput}
                  value={resumeTitle}
                  onChange={handleTitleChange}
                  maxLength={30}
                />
                <span className={styles.counter}>{resumeTitle.length}/30</span>
              </div>
            </div>

            <div className={styles.inputSection}>
              <textarea
                className={styles.textarea}
                placeholder="갖고 있는 이력서 내용을 복사/붙여넣기 하면 한번에 정리해드릴게요."
                maxLength={5000}
                value={resumeText}
                onChange={handleTextChange}
              />
              <div className={styles.charCounter}>
                <span>{resumeText.length}/5000</span>
              </div>
            </div>

            <div className={styles.helpSection} onClick={toggleHelp}>
              <div className={styles.helpContent}>
                <Image 
                  src={chatInfoIcon}
                  alt="도움말"
                  width={16.67}
                  height={15.51}
                  className={styles.helpIcon}
                />
                <span className={styles.helpText}>
                  이력서에 어떤걸 넣을지 모르겠나요?
                </span>
              </div>
              <Image 
                src={arrowDropDownIcon}
                alt="펼치기"
                width={8.6}
                height={4.7}
                className={`${styles.dropdownIcon} ${isHelpOpen ? styles.rotated : ''}`}
              />
            </div>

            <button className={styles.completeButton}>
              <span className={styles.completeButtonText}>완료하기</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}