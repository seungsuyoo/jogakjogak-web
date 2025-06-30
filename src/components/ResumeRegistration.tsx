"use client";

import Image from "next/image";
import styles from "./ResumeRegistration.module.css";
import alertIcon from "@/assets/images/ic_alert.svg";
import { Button } from "./Button";

export function ResumeRegistration() {
  return (
    <div className={styles.resumeDesktop}>
      <div className={styles.frame}>
        <Image 
          src={alertIcon} 
          alt="Alert" 
          width={24} 
          height={24}
          className={styles.icon}
        />
        <div className={styles.div}>이력서 등록이 필요해요.</div>
      </div>
      <div className={styles.btnInstance}>
        <Button variant="primary">이력서 등록</Button>
      </div>
    </div>
  );
}