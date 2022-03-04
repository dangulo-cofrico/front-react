import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../components/Home/Home";
import './App.css';
import AddEmpresa from "../components/Empresa/AddEmpresa";
import EmpresaList from "../components/Empresa/EmpresaList";
import Empresa from "../components/Empresa/Empresa";
import AddTipo from "../components/Tipo/AddTipo";
import Tipo from "../components/Tipo/Tipo";
import TipoList from "../components/Tipo/TipoList";
import DepartamentoList from "../components/Departamento/DepartamentoList";
import AddDepartamento from "../components/Departamento/AddDepartamento";
import Departamento from "../components/Departamento/Departamento";
import Empleado from "../components/Empleado/Empleado";
import AddEmpleado from "../components/Empleado/AddEmpleado";
import EmpleadoList from "../components/Empleado/EmpleadoList";
const App : React.FC = () => {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/home" className="navbar-brand">Home</a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item"><Link to={"/tipos"} className="nav-link">Tipos</Link></li>
          <li className="nav-item"><Link to={"/empresas"} className="nav-link">Empresas</Link></li>
          <li className="nav-item"><Link to={"/departamentos"} className="nav-link">Departamentos</Link></li>
          <li className="nav-item"><Link to={"/empleados"} className="nav-link">Empleados</Link></li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/tipos" component={TipoList}/>
          <Route exact path="/addtipo" component={AddTipo}/>
          <Route path="/tipos/:id" component={Tipo}/>
          <Route exact path="/empresas" component={EmpresaList}/>
          <Route exact path="/addempresa" component={AddEmpresa}/>
          <Route path="/empresas/:id" component={Empresa}/>
          <Route exact path="/departamentos" component={DepartamentoList}/>
          <Route exact path="/adddepartamento" component={AddDepartamento}/>
          <Route path="/departamentos/:id" component={Departamento}/>
          <Route exact path="/empleados" component={EmpleadoList}/>
          <Route exact path="/addempleado" component={AddEmpleado}/>
          <Route path="/empleados/:id" component={Empleado}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
