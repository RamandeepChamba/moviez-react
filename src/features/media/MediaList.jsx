import MediaItem from "./MediaItem";
import styles from "./MediaList.module.css";

function MediaList({ media, type }) {
  return (
    <>
      {media.length === 0 && <p>No {type} found</p>}
      {media.length > 0 && (
        <ul className={styles.list}>
          {media.map((mediaItem) => (
            <MediaItem key={mediaItem.id} mediaItem={mediaItem} type={type} />
          ))}
        </ul>
      )}
    </>
  );
}

export default MediaList;
