import { Link } from "react-router-dom";
import SearchMovie from "../features/movie/SearchMovie";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/moviez-react">Moviez</Link>
      <SearchMovie />
    </header>
  );
}

export default Header;
