import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import styles from "./Historia.module.css";

function Historia() {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <p className={styles.titleh1}>
        Num cantinho mágico do mundo onde o céu era cor-de-rosa e os unicórnios
        corriam livres entre as nuvens de algodão-doce, uma princesinha chamada
        Eloá. Desde que o primeiro arco-íris apareceu anunciando sua chegada,
        todo o reino sabia: algo muito especial estava para acontecer. E não é
        que aconteceu mesmo? Quando a princesa Eloá nasceu, tudo ficou mais
        bonito! O sol brilhou com mais vontade, os passarinhos inventaram novas
        músicas e até os unicórnios vieram galopando com suas crinas coloridas
        só pra dar boas-vindas. A cada risadinha dela, o dia ganhava mais cor. A
        cada olhinho brilhando de curiosidade, o mundo parecia mais feliz.
      </p>
      <p className={styles.titleh1}>
        Eloá trouxe uma magia diferente, daquelas que não se vê com os olhos,
        mas se sente no coração. Sua família, que já a amava antes mesmo de
        conhecê-la, agora vivia encantada com cada descoberta, cada gracinha,
        cada pedacinho do seu jeitinho único. E agora… adivinha só? A princesa
        está completando seu primeiro aninho! Um ano de fofuras, aventuras,
        dengos e muito amor. E, claro, o reino inteiro está preparando uma festa
        de tirar o fôlego: com nuvens que soltam confete, bolo com glitter
        comestível e unicórnios dançando ao som de risadas felizes.
      </p>
      <p className={styles.titleh1}>
        E assim começa a linda história da princesa mais doce do reino dos
        unicórnios. E olha… esse é só o primeiro capítulo!
      </p>

      <Button
        style={{
          marginTop: 12,
          marginBottom: 8,
          background: "#ecf0f1",
          width: 350,
          fontSize: "2rem",
        }}
        label="Confirmar Presença "
        onClick={async () => {
          navigate("/confirmar");
        }}
      />
    </div>
  );
}
export default Historia;
