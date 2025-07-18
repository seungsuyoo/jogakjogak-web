"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import logo from "@/assets/images/logo.svg";
import logoutIcon from "@/assets/images/ic_logout.svg";
import LoginModal from "./LoginModal";
import { logout } from "@/utils/auth";

interface HeaderProps {
  backgroundColor?: "transparent" | "white";
  showLogout?: boolean;
}

export default function Header({ backgroundColor = "transparent", showLogout = false }: HeaderProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
        {showLogout ? (
          <button className={styles.logoutButton} onClick={handleLogoutClick}>
            <Image 
              src={logoutIcon} 
              alt="로그아웃" 
              width={17.6} 
              height={18}
            />
          </button>
        ) : (
          <button className={styles.loginButton} onClick={handleLoginClick}>
            <span>로그인</span>
          </button>
        )}
      </header>
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
    </>
  );
}