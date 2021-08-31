import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Menu from "./components/Menu";
import Admin from "./components/Admin";
import Inicio from "./components/Inicio";

function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Menu />
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/" component={Inicio} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
