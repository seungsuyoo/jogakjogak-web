"use client";

import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import logo from "@/assets/images/logo.svg";

interface HeaderProps {
  backgroundColor?: "transparent" | "white";
}

const Header: React.FC<HeaderProps> = ({ backgroundColor = "transparent" }) => {
  return (
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
      <button className={styles.loginButton}>
        <span>로그인</span>
      </button>
    </header>
  );
};

export default Header;