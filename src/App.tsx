import styles from "./App.module.css";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <div className={styles.background}>
      <img src="/assets/Nuvens.svg" className="decor nuvem-right" />
      <img
        src="/assets/unicornio_nuvem.svg"
        className="decor unicornio decor-bottom-right"
      />
      <img src="/assets/Nuvens.svg" className="decor nuvem-left" />
      <img
        src="/assets/unicornio_nuvem.svg"
        style={{ transform: "scaleX(-1)" }}
        className="decor unicornio decor-bottom-left"
      />
      <nav>
        <img src="assets/Logo.svg" alt="" className="logo" />
      </nav>

      <AppRoutes />
    </div>
  );
}

export default App;
