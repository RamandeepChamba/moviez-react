import styles from "./Button.module.css";
function Button({ children, type, variation, className = "", onClick }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${
        variation ? styles[variation] : styles.regular
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
