import React, { useState, useEffect } from "react";
import styles from "./Listagem.module.css";

const CORRECT_PASSWORD = "senha123";
const API_URL = "/api/confirmados";

type CardProps = {
  acompanhates: number;
  nome: string;
  mensagem: string;
};

const Card = ({ nome, acompanhates, mensagem }: CardProps) => (
  <div className={styles.card}>
    <div>
      <strong className={styles.label}>Convidado:</strong>
      <span className={styles.resposta}> {nome}</span>
    </div>
    <div>
      <strong className={styles.label}>Acompanhates:</strong>
      <span className={styles.resposta}> {acompanhates}</span>
    </div>
    <div>
      <strong className={styles.label}>Mensagem:</strong>
      <span className={styles.resposta}> {mensagem}</span>
    </div>
  </div>
);

const PasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardsData, setCardsData] = useState<CardProps[]>([]);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setLoggedIn(true);
    } else {
      setErrorMessage("Senha incorreta.");
    }
    setPassword("");
  };

  useEffect(() => {
    if (loggedIn) {
      const fetchCards = async () => {
        setLoading(true);
        setError("");
        try {
          const response = await fetch(API_URL, {
            method: "GET",
            headers: new Headers({
              Accept: "application/json",
            }),
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Falha ao buscar os dados.");
          }

          const data = await response.json();
          console.log(data);
          setCardsData(data);
        } catch (err) {
          console.error(err);
          setError("Erro ao carregar os dados. Tente novamente.");
        } finally {
          setLoading(false);
        }
      };

      fetchCards();
    }
  }, [loggedIn]);

  return (
    <div className={styles["password-container"]}>
      {!loggedIn ? (
        <form onSubmit={handleSubmit} className={styles["password-form"]}>
          <h1>Digite a Senha</h1>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Senha"
          />
          <button type="submit">Entrar</button>
          {errorMessage && (
            <p className={styles["error-message"]}>{errorMessage}</p>
          )}
        </form>
      ) : (
        <div className={styles["card-list"]}>
          <h1 className={styles.titleh1}>Lista de Convidados</h1>
          {loading && <p>Carregando dados...</p>}
          {error && <p className={styles["error-message"]}>{error}</p>}
          {cardsData.length > 0 && !loading && !error ? (
            cardsData.map((card, index) => <Card key={index} {...card} />)
          ) : (
            <p>Nenhum dado encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordScreen;
