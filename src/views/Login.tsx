import { useForm } from "react-hook-form";
import InputText from "../components/InputText/InputText";
import styles from "./Login.module.css";
import Button from "../components/Button/Button";
import MapComponent from "../components/mapComponent/MapComponent";
import { useState } from "react";
import TextArea from "../components/TextArea/TextArea";
import QRCode from "react-qr-code";
import toast, { Toaster } from "react-hot-toast";

interface LoginValue {
  nome: string;
  acompanhates: number;
  presente: string;
  confirmado: boolean;
}

function Login() {
  const { control, getValues } = useForm<LoginValue>();

  const [valorSelecionado, setValorSelecionado] = useState(
    "Um Pacote de Fralda(M, G) + Mimo"
  );

  const handleChange = (e: string) => {
    setValorSelecionado(e);
  };

  return (
    <div className={styles.content}>
      <div>
        <Toaster />
      </div>
      <div className={styles.header}>
        <nav>
          <img src="assets/Logo.svg" alt="" className={styles.logo} />
        </nav>
        <img src="assets/Line.svg" className={styles.linha} />
        <h1 className={styles.titleh1}>Por Favor Confirme sua presença</h1>
        <h3 className={styles.titleh6}>Por Favor Confirme sua presença</h3>
      </div>

      <div className={styles.form}>
        <InputText
          control={control}
          name={"nome"}
          label={"Seu Nome:"}
          type="text"
        />

        <InputText
          control={control}
          name={"acompanhates"}
          label={"Quantidade de Pessoas: (Incluindo você)"}
          type={"number"}
          minValue={0}
          maxValue={5}
        />
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              value="Um Pacote de Fralda(M, G) + Mimo"
              checked={valorSelecionado === "Um Pacote de Fralda(M, G) + Mimo"}
              onChange={(e) => handleChange(e.target.value)}
            />
            <span className={styles.checkBoxSpan}>
              Pacote de Fralda M ou G + Mimo
            </span>
          </label>
          <label>
            <input
              type="radio"
              value="Um Pix Misterioso"
              checked={valorSelecionado === "Um Pix Misterioso"}
              onChange={(e) => handleChange(e.target.value)}
            />
            <span className={styles.checkBoxSpan}>Um Pix Misterioso</span>
          </label>
        </div>

        {valorSelecionado === "Um Pacote de Fralda(M, G) + Mimo" ? (
          <InputText
            control={control}
            name={"presente"}
            label={"Qual será o presente:"}
            type={"text"}
          />
        ) : null}
        {valorSelecionado === "Um Pix Misterioso" ? (
          <div className={styles.containerPix}>
            <QRCode
              size={256}
              viewBox={`0 0 256 256`}
              level="H"
              value={import.meta.env.VITE_PIX_COPIA_COLA}
            />
            <div className={styles.localSpan}>
              Apenas copiar a chave Copia e Cola e colar como chave pix no seu
              banco
            </div>
          </div>
        ) : null}
        <TextArea
          control={control}
          name={"mensagem"}
          label={"Nos deixe uma mensagem:"}
        />

        <div className={styles.localSpan}>
          <span>20 de Outubro ás 16:00</span>
          <div id="line1" className={styles.line1}></div>
          <span>Rua 22 de Abril, Qd 38, Lt 13, Casa 2</span>
          <span>Residencial Parque Flamboyant</span>
        </div>

        <Button
          style={{ marginTop: 48, marginBottom: 26, background: "#FFF0E3" }}
          label="Confirmar Presença "
          onClick={async () => {
            await fetch('/api', {
              method: "POST",
              body: JSON.stringify({
                ...getValues(),
                confirmado: true,
                acompanhates: Number(getValues().acompanhates),
              }),
              credentials: "include",
              headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
              }),
            }).then((response) => {
              if (response.status == 201)
                toast("Presença Confirmada, Muito Obrigado pelo Carinho!", {});
            });
          }}
        />
      </div>

      <MapComponent />
    </div>
  );
}

export default Login;
