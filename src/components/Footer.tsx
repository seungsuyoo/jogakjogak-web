"use client";

import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import emailIcon from "@/assets/images/ico_email.svg";
import styles from "./Footer.module.css";
import { tokenManager } from "@/utils/auth";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWithdrawal = async () => {
    const confirmed = confirm(
      "정말로 탈퇴하시겠습니까?\n\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다."
    );

    if (!confirmed) return;

    try {
      const accessToken = tokenManager.getAccessToken();
      
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch('/api/member/withdrawal', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        alert("탈퇴가 완료되었습니다.");
        // 토큰 삭제하고 홈으로 이동
        tokenManager.removeAccessToken();
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        alert(`탈퇴에 실패했습니다: ${errorData.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      alert("탈퇴 중 오류가 발생했습니다.");
    }
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
          <button onClick={handleWithdrawal} className={styles.withdrawLink}>탈퇴하기</button>
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