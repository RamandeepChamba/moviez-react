import styles from "./Select.module.css";
function Select({ options, value = "", placeholder = "Select", onChange }) {
  return (
    <select value={value} onChange={onChange} className={styles.select}>
      <option disabled value="">
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
