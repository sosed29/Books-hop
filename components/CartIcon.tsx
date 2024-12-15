import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import styles from '@/styles/CartIcon.module.css'; 

const CartIcon: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart" className={styles.cartIcon}>
      {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
    </Link>
  );
};

export default CartIcon;
