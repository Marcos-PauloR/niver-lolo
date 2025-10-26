import { useForm } from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import InputText from "../components/InputText/InputText";
import styles from "./Formulario.module.css";
import Button from "../components/Button/Button";
import TextArea from "../components/TextArea/TextArea";
import toast, { Toaster } from "react-hot-toast";
import Lista from "../components/Lista/Lista";
import { useState } from "react";

interface FormularioValue {
  nome: string;
  acompanhates: string;
  presente: string;
  confirmado: boolean;
  mensagem: string;
}

function Formulario() {
  const { control, getValues, resetField, reset } = useForm<FormularioValue>({
    defaultValues: { acompanhates: "" },
  });
  const [listaAcompanhantes, setListaAcompanhantes] = useState<string[]>([]);

  const insereAcompanhante = () => {
    const valor = getValues("acompanhates");
    if (!valor) return;

    setListaAcompanhantes((prev) => [...prev, valor]);
    resetField("acompanhates", { defaultValue: "", keepTouched: true });
  };

  const removerDaLista = (index: number) => {
    setListaAcompanhantes((prev) => prev.filter((_, i) => i !== index));
  };

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
          label={"Nome dos Acompanhantes:"}
          type={"text"}
          withButton
          buttonClick={insereAcompanhante}
        />

        <ul
          style={{
            width: 315,
            maxWidth: 315,
            margin: 0,
            background: "#F5F5F5",
            border: "solid 1px  #86B5B9",
            borderRadius: 8,
            paddingLeft: 20,
          }}
        >
          {listaAcompanhantes.map((valor, index) => (
            <li key={index} className={styles.texto}>
              <span>{valor}</span>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() => removerDaLista(index)}
              >
                <FiMinus fontSize={45} />
              </button>
            </li>
          ))}
        </ul>

        <TextArea
          control={control}
          name={"mensagem"}
          label={"Escreva uma mensagem para a aniversariante:"}
        />

        <div>
          <h3 className={styles.titleh1}>Sugestões de presente</h3>
          {lista.map((item, index) => (
            <Lista texto={item.texto} key={index} icone={item.icone} />
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
                companheiros: listaAcompanhantes,
              }),
            })
              .then((response) => {
                if (response.status == 201)
                  toast("Presença Confirmada, Muito Obrigado pelo Carinho!", {
                    icon: "🎉",
                  });
              })
              .catch((error) => {
                toast("Erro:" + error.message);
              });
            reset({ acompanhates: "", mensagem: "", nome: "" });
            setListaAcompanhantes([]);
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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.9479601244147!2d-49.3284111!3d-16.7792645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935e5968d44cfaf5%3A0xe4a29b708d63aa20!2sAnaLu%20Eventos%20e%20Decora%C3%A7%C3%B5es!5e0!3m2!1spt-BR!2sbr!4v1761499637477!5m2!1spt-BR!2sbr"
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
