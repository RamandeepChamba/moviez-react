import styles from "./Genre.module.css";

function Genre({ genre, index, genresBool, onChange }) {
  const { id, name } = genre;
  const checked = genresBool[index];
  return (
    <div key={id}>
      <label
        htmlFor={id}
        className={`${checked ? styles["label-checked"] : ""} ${
          styles["genre-label"]
        }`}
      >
        {name + " " + (checked ? "-" : "+")}
      </label>
      <input
        type="checkbox"
        name="genre"
        id={id}
        value={id}
        className={styles["checkbox-hidden"]}
        checked={checked}
        onChange={() => onChange(index)}
      />
    </div>
  );
}

export default Genre;
