import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from 'next/image';
import Layout from "@/components/layout";
import styles from "@/styles/Profile.module.css";

const Profile: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);

  return (
    <Layout showHeader={false}> 
      <div className={styles.profileContainer}>
        <h1>PROFILE</h1>
        {userInfo && (
          <div className={styles.userInfoAndAbout}>
            <div className={styles.userInfo}>
            <Image
                src="/img/PROFILE.png"
                alt="Профиль"
                className={styles.profileImage}
                width={100} 
                height={100}
              />
              <div className={styles.userDetails}>
                <div className={styles.infoBlock}>
                  <p className={styles.infoTitle}>Your Name</p>
                  <p className={styles.infoValue}>{userInfo.name}</p>
                </div>
                <div className={styles.infoBlock}>
                  <p className={styles.infoTitle}>Your Email</p>
                  <p className={styles.infoValue}>{userInfo.email}</p>
                </div>
                <button className={styles.editButton}>Edit Profile</button>
              </div>
            </div>
            <div className={styles.aboutMe}>
              <h2 className={styles.aboutMeTitle}>ABOUT ME</h2>
              <p className={styles.aboutMeText}>
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit. Sed in
                ante consequat,<br /> ornare nisi et, ultrices libero. Nunc nibh
                dolor,<br /> maximus quis auctor nec, tempor <br /> quis ipsum. Proin mollis
                pellentesque nulla ac <br /> varius.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
