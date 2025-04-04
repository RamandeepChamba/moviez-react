import styles from "./RadioOptions.module.css";
function RadioOptions({ children, className }) {
  return (
    <div className={`${styles["radio-options"]} ${className}`}>{children}</div>
  );
}

export default RadioOptions;
