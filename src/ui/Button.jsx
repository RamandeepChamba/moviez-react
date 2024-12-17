import styles from "./Button.module.css";
function Button({ children, type, variation }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${
        variation ? styles[variation] : styles.regular
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
