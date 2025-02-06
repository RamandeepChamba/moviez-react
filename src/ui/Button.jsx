import styles from "./Button.module.css";
function Button({
  children,
  type,
  variation,
  size = "md",
  className = "",
  onClick,
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${
        variation ? styles[variation] : styles.regular
      } ${styles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
