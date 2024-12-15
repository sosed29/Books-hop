import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import Layout from "@/components/layout";
import styles from "@/styles/Cart.module.css";

interface CartItem {
  image: string;
  title: string;
  authors: string;
  rating: number;
  quantity: number;
  price: string;
  reviews: number; 
}

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalPrice = () =>
    items
      .reduce(
        (total: number, item: CartItem) =>
          total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);

  const handleIncrease = (title: string) => {
    const item = items.find((i) => i.title === title);
    if (item) {
      dispatch(addToCart({ ...item, quantity: 1 }));
    }
  };

  const handleDecrease = (title: string) => {
    const item = items.find((i) => i.title === title);
    if (item && item.quantity > 1) {
      dispatch(addToCart({ ...item, quantity: -1 }));
    } else {
      dispatch(removeFromCart(title));
    }
  };

  return (
    <Layout showHeader={false}>
      <div className={styles.cartContainer}>
        <h1>Shopping Cart</h1>
        <div className={styles.cartHeader}>
          <span>ITEM</span>
          <span>QUANTITY</span>
          <span>PRICE</span>
          <span>DELIVERY</span>
        </div>
        <ul className={styles.cartItems}>
          {items.map((item: CartItem, index: number) => (
            <li key={index} className={styles.cartItem}>
              <div className={styles.cartItemInfo}>
                <Image
                  src={item.image || "/img/placeholder.png"}
                  alt={item.title}
                  className={styles.itemImage}
                  width={100}
                  height={150}
                  priority
                />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.authors || "Unknown Author"}</p>
                  <div className={styles.itemRating}>
                    {"★".repeat(Math.floor(item.rating))}
                    {"☆".repeat(5 - Math.floor(item.rating))}
                    <span className={styles.reviews}>{item.reviews} reviews</span> 
                  </div>
                </div>
              </div>
              <div className={styles.cartItemQuantity}>
                <Image
                  src="/img/minus.svg"
                  alt="Minus-icon"
                  width={22}
                  height={25}
                  priority
                  className={styles.quantityButton}
                  onClick={() => handleDecrease(item.title)}
                />
                <span>{item.quantity}</span>
                <Image
                  src="/img/plus.svg"
                  alt="plus-icon"
                  width={21}
                  height={24}
                  priority
                  className={styles.quantityButton}
                  onClick={() => handleIncrease(item.title)}
                />
              </div>
              <p className={styles.cartItemPrice}>
                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
              </p>
              <p className={styles.cartItemDelivery}>Shipping: delivery</p>
            </li>
          ))}
        </ul>
        <div className={styles.cartTotal}>
          <h2>Total Price: ${calculateTotalPrice()}</h2>
          <button className={styles.checkoutButton}>Checkout</button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
