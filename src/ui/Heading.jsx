import styles from "./Heading.module.css";
function Heading({ children }) {
  return <h1 className={styles.heading}>{children}</h1>;
}

export default Heading;
