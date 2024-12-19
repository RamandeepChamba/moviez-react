import Button from "./Button";
import styles from "./Pagination.module.css";

function Pagination({ totalPages, currentPage, onGotoPage }) {
  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <Button onClick={() => onGotoPage(parseInt(currentPage) - 1)}>
          Previous
        </Button>
      )}
      <span>{currentPage}</span>
      {currentPage < totalPages && (
        <Button onClick={() => onGotoPage(parseInt(currentPage) + 1)}>
          Next
        </Button>
      )}
    </div>
  );
}

export default Pagination;
