import { Link } from "react-router-dom";
import styles from "./StyledLink.module.css";

function StyledLink({
  children,
  to,
  variation = "regular",
  size = "small",
  className = "",
  corners = "rounded",
}) {
  return (
    <Link
      to={to}
      className={`${styles.link} ${styles[variation]} ${styles[size]} ${styles[corners]} ${className}`}
    >
      {children}
    </Link>
  );
}

export default StyledLink;
