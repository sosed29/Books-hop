import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import LoginModal from '@/components/LoginModal';
import styles from '@/styles/UserShop.module.css';
import { RootState } from '@/store';
import CartIcon from '@/components/CartIcon';
import Image from 'next/image';

const UserShop: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className={styles.userShop}>
      {isAuthenticated ? (
        <Link href="/profile">
            <Image
            src="/img/user.svg"
            alt="User "
            className={styles.icon}
            width={12} 
            height={15} 
          />
        </Link>
      ) : (
        <Image
          src="/img/user.svg"
          alt="User"
          className={styles.icon}
          width={12}
          height={15}
          onClick={handleProfileClick}
        />
      )}
      <Link href="/cart">
        <Image
         src="/img/shop bag.svg" 
         alt="Cart" 
         width={12}
         height={15}
         className={styles.icon}
          />
      </Link>
      <CartIcon /> 
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default UserShop;
