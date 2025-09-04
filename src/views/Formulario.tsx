import { useForm } from "react-hook-form";
import InputText from "../components/InputText/InputText";
import styles from "./Formulario.module.css";
import Button from "../components/Button/Button";
import TextArea from "../components/TextArea/TextArea";
import toast, { Toaster } from "react-hot-toast";
import Lista from "../components/Lista/Lista";

interface FormularioValue {
  nome: string;
  acompanhates: number;
  presente: string;
  confirmado: boolean;
  mensagem: string;
}

function Formulario() {
  const { control, getValues } = useForm<FormularioValue>();

  const lista = [
    { icone: "📚", texto: "Livros Infantis" },
    { icone: "🧸", texto: "Brinquedos Educativos" },
    { icone: "👗", texto: "Roupas Tamanho: 2/3 anos" },
    { icone: "🩴", texto: "Sapatos Tamanho: 21/22" },
  ];

  return (
    <div className={styles.content}>
      <div>
        <Toaster />
      </div>
      <div className={styles.header}>
        <h2 className={styles.titleh1}>Por Favor, Confirme sua presença</h2>
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
        <TextArea
          control={control}
          name={"mensagem"}
          label={"Escreva uma mensagem para a aniversariante:"}
        />

        <div>
          <h3 className={styles.titleh1}>Sugestões de presente</h3>
          {lista.map((item) => (
            <Lista texto={item.texto} icone={item.icone} />
          ))}
        </div>

        <Button
          style={{ marginTop: 12, marginBottom: 8, background: "#ecf0f1" }}
          label="Confirmar Presença "
          onClick={async () => {
            await fetch("/api/confirmar", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                ...getValues(),
                confirmado: true,
                acompanhates: Number(getValues().acompanhates),
                mensagem: getValues().mensagem.replace(/\r\n/g, "\n"),
              }),
            })
              .then((response) => {
                if (response.status == 201)
                  toast("Presença Confirmada, Muito Obrigado pelo Carinho!", {
                    icon: "🎉",
                  });
              })
              .catch((error) => {
                toast("Erro:" + error);
              });
          }}
        />

        <div className={styles.localSpan}>
          <span>22 de Novembro ás 16:00</span>
          <div id="line1" className={styles.line1}></div>
          <span>Alameda Fleuri Curado, nº159</span>
          <span>No Salão de Festas do Condiminio Vida Sol</span>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.705501784049!2d-49.307511500000004!3d-16.741539799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef70c7c972449%3A0xa31088b20a198aab!2sCondom%C3%ADnio%20Vida%20Sol!5e0!3m2!1spt-BR!2sbr!4v1755877394742!5m2!1spt-BR!2sbr"
        width="800"
        height="150"
        style={{ border: 0, marginBottom: "00px", marginTop: 0, zIndex: 4 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Formulario;
