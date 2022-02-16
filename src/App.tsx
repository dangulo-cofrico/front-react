import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AddTipo from "./components/Tipo/AddTipo";
import Tipo from "./components/Tipo/Tipo";
import TipoList from "./components/Tipo/TipoList";


const App : React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tipos" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tipos"} className="nav-link">
              Tutorials
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
        <Routes>
          <Route path="/tipos" element={TipoList}/>
          <Route path="tipos/add" element={AddTipo}/>
          <Route path="/tipos/:id" element={Tipo}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
