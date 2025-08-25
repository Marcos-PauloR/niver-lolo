import { Routes, Route } from "react-router-dom";
import Historia from "../views/Historia";
import ScrollToTop from "../views/ScrollToTop";
import Listagem from "../views/Listagem";
import Formulario from "../views/Formulario";

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route Component={Formulario} path="/confirmar" />
        <Route Component={Listagem} path="/lista" />
        <Route Component={Historia} path="/" />
      </Routes>
    </>
  );
}

export default AppRoutes;
