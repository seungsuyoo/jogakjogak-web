"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import logo from "@/assets/images/logo.svg";
import LoginModal from "./LoginModal";

interface HeaderProps {
  backgroundColor?: "transparent" | "white";
}

const Header: React.FC<HeaderProps> = ({ backgroundColor = "transparent" }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${backgroundColor === "white" ? styles.whiteBackground : ""}`}>
        <div className={styles.logo}>
          <Image 
            src={logo} 
            alt="조각조각 로고" 
            width={127.82} 
            height={25.11}
            priority
          />
        </div>
        <button className={styles.loginButton} onClick={handleLoginClick}>
          <span>로그인</span>
        </button>
      </header>
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Header;