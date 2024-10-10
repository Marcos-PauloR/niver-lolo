import { Route, Routes } from "react-router-dom";
import Login from '../views/Login'
function AppRoutes() {
    return ( 
        <Routes>
            <Route Component={Login} path="/login" />
            {/*<Route Component={ Confirmacao} path="/confirmacao" />
            <Route Component={ Cadastro} path="/cadastro" />
            <Route Component={ Lista} path="/lista" /> */}
            <Route Component={Login} path="/"/>
        </Routes>
     );
}

export default AppRoutes;