import styles from "./App.module.css";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <div className={styles.background}>
      <AppRoutes />
    </div>
  );
}

export default App;
