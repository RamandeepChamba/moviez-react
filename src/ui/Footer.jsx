import Image from "./Image";
import tmdbLogo from "../assets/tmdb.svg";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Powered by</p>
      <Image src={tmdbLogo} alt="TMDB logo" />
    </footer>
  );
}

export default Footer;
