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
        <Route Component={Formulario} path="/" />
        <Route Component={Listagem} path="/lista" />
        <Route Component={Historia} path="/confirmar" />
      </Routes>
    </>
  );
}

export default AppRoutes;
