import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tipos from "./Tipos";

class App extends Component {
  render() {
    return (

      <div>
        <div>Barra de navegacion</div>
        <div><Tipos/></div>
      </div>
    )
  }
}

export default App;
