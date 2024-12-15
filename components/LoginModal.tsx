import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";
import styles from "@/styles/LoginModal.module.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (password.length < 6) {
      setError("Your password must be at least 6 characters long");
      return;
    }

    dispatch(login({ name: "John Smith", email }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2 className={styles.modalHeader}>Log in</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.inputLabel}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.inputField}
            style={{
              borderColor: "blue",  

              color: "blue", 
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.inputLabel}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.inputField}
            style={{
              borderColor: "red", 
              color: "red",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        <button className={styles.loginButton} onClick={handleLogin}>
          LOG IN
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
