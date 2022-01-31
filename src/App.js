import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navBar/NavBar";

class App extends Component {
  render() {
    return (
      <div>
        <div><NavBar/></div>
      </div>
    )
  }
}

export default App;
