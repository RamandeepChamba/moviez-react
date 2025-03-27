import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import SearchMediaForm from "../features/media/SearchMedia";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/moviez-react">Moviez</Link>
      <SearchMediaForm />
    </header>
  );
}

export default Header;
