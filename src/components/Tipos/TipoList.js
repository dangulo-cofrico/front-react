import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

class TipoList extends Component {
  constructor(props) {
    super(props);
    this.state = { tipos: [] };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    fetch("/tipos")
      .then((response) => response.json())
      .then((data) => this.setState({ tipos: data }));
  }
}
export default TipoList;
