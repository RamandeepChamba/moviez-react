import styles from "./RadioOptions.module.css";
function RadioOptions({ children }) {
  return <div className={styles["radio-options"]}>{children}</div>;
}

export default RadioOptions;
