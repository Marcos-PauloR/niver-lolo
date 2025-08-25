import styles from "./Lista.module.css";

interface ListaProps {
  texto: string;
  icone: string;
}

const Lista: React.FC<ListaProps> = ({ texto, icone }) => {
  return (
    <div className={styles.itemLista}>
      <div className={styles.circulo}>{icone}</div>
      <div className={styles.retangulo}>{texto}</div>
    </div>
  );
};

export default Lista;
