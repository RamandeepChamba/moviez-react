import { HiStar } from "react-icons/hi2";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <h1>
        <span className={styles.title}>
          Harry Potter and the Deathly Hallows: Part 2
        </span>
        <span className={styles.ratingContainer}>
          <span className={styles.rating}>
            8.1
            <HiStar />
          </span>
        </span>
      </h1>
      <p>It all ends.</p>
      <ul className={styles.genres}>
        <li>Fantasy</li>
        <li>Adventure</li>
      </ul>
    </div>
  );
}

export default Header;
