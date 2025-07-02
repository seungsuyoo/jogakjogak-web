"use client";

import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import emailIcon from "@/assets/images/ico_email.svg";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo section */}
        <div className={styles.logoSection}>
          <Image src={logo} alt="조각조각" width={148.27} height={29.13} className={styles.logo} />
        </div>

        {/* Main content section */}
        <div className={styles.mainContent}>
          {/* Links */}
          <nav className={styles.linkContainer}>
            <a href="#" className={styles.link}>서비스 소개</a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.link}>문의하기</a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.link}>이용약관</a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.link}>개인정보 처리방침</a>
          </nav>

          {/* Contact and copyright */}
          <div className={styles.contactSection}>
            <div className={styles.emailContainer}>
              <Image
                src={emailIcon}
                alt="이메일"
                width={13.33}
                height={10.67}
                className={styles.emailIcon}
              />
              <span className={styles.email}>jogakjogakhelp@gmail.com</span>
            </div>
            <p className={styles.copyright}>© 2025. JogakJogak. All rights reserved.</p>
          </div>

          {/* Withdraw link */}
          <a href="#" className={styles.withdrawLink}>탈퇴하기</a>
        </div>

        {/* Scroll to top button */}
        <button
          className={styles.scrollToTop}
          onClick={scrollToTop}
          aria-label="맨 위로 가기"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 26V6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 14L16 6L24 14"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}