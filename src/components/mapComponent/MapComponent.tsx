import styles from "./MapComponent.module.css";

const MapComponent = () => {
  return (
    <iframe
      loading="lazy"
      allowFullScreen
      className={styles.map}
      src={`https://www.google.com/maps/embed/v1/place?q=-16.736136,-49.219707&key=${
        import.meta.env.VITE_GOOGLE_API_LOCATION
      }`}
    />
  );
};

export default MapComponent;
