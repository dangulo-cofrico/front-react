import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTipo from "./components/Tipo/AddTipo";
import Tipo from "./components/Tipo/Tipo";
import TipoList from "./components/Tipo/TipoList";
import './App.css';
const App : React.FC = () => {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tipos" className="navbar-brand">
          Home
        </a>
        
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tipos"} className="nav-link">
              Tipos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tipos"]} component={TipoList}/>
          <Route exact path="tipos/add" component={AddTipo}/>
          <Route path="/tipos/:id" component={Tipo}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
