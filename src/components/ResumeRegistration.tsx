"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./ResumeRegistration.module.css";
import cautionIcon from "@/assets/images/ic_caution.svg";
import { Button } from "./Button";

export function ResumeRegistration() {
  const router = useRouter();

  const handleResumeRegister = () => {
    router.push("/resume/create");
  };

  return (
    <div className={styles.resumeDesktop}>
      <div className={styles.frame}>
        <Image 
          src={cautionIcon} 
          alt="Caution" 
          width={16} 
          height={20}
          className={styles.icon}
        />
        <div className={styles.div}>이력서 등록이 필요해요.</div>
      </div>
      <div className={styles.btnInstance}>
        <Button variant="primary" onClick={handleResumeRegister}>
          이력서 등록
        </Button>
      </div>
    </div>
  );
}