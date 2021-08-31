import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login.js";
import Menu from "./components/menu.js";
import Admin from "./components/admin.js";
import Inicio from "./components/inicio.js";

function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Menu />
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/" component={Inicio} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
