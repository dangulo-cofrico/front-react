import React, { Component } from "react";
import "./Departamento.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "http://localhost:8080/departamentos";

class Departamento extends Component {
    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form : {
          id : '',
          nombre : '',
          departamentoModal:''
        },
      };
    
      peticionGet = () => {
        axios.get(url).then((response) => {
          this.setState({ data: response.data });
        }).catch((error) => {
          console.log(error.message);
        });
      };
      peticionPost = async () => {
        delete this.state.form.id;
        await axios.post(url, this.state.form).then((response) => {
            this.modalInsertar();
            this.peticionGet();
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
    
      peticionPatch = async () => {
        await axios.patch(url, this.state.form).then((response) => {
            this.modalInsertar();
            this.peticionGet();
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
    
    
      peticionDelete = () => {
        axios.delete(url + "/" + this.state.form.id).then((response) => {
          this.setState({ modalEliminar: false });
          this.peticionGet();
        });
      };
    
      modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
      };
    
      seleccionarDepartamento = (departamento) => {
        this.setState({
          tipoModal: "actualizar",
          form: {
            id : departamento.id,
            dni : departamento.dni,
            nombre : departamento.nombre,
            telefono : departamento.telefono
          },
        });
      };
    
      handleChange = async (e) => {
        e.persist();
        await this.setState({
          form: {...this.state.form, [e.target.name]: e.target.value},
        });
        console.log(this.state.form);
      };
    
      async componentDidMount() {
        this.peticionGet();
      }
    
      render() {
        const { form } = this.state;
        return (
          <div className="App">
            <br /><button className="btn btn-success" onClick={() => {this.setState({form:null,empleadoModal: 'insertar'});this.modalInsertar()}}> Insertar nueva Departamento</button><br /><br />
            <table className="table">
              <thead><tr><th>Nombre</th><th>Acciones</th></tr></thead>
              <tbody>
                {this.state.data.map((departamento) => {
                  return (
                    <tr>
                      <td>{departamento.nombre}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => {this.seleccionarDepartamento(departamento);this.modalInsertar()}}><FontAwesomeIcon icon={faEdit} /></button>{" "}
                        <button className="btn btn-danger" onClick={() => {this.seleccionarDe(departamento); this.setState({ modalEliminar: true });}}><FontAwesomeIcon icon={faTrashAlt} /></button>
                      </td>
                    </tr>
                  );})}
              </tbody>
            </table>
    
            <Modal isOpen={this.state.modalInsertar}>
              <ModalHeader style={{ display: "block" }}>
                <span style={{ float: "right" }} onClick={() => this.modalInsertar()}>x</span>
              </ModalHeader>
              <ModalBody>
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id:this.state.data.length + 1}/><br />
                  <label htmlFor="nombre">Nombre</label>
                  <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''}/>
                </div>
              </ModalBody>
              <ModalFooter>
                {this.state.empleadoModal == 'insertar' ? (
                  <button className="btn btn-success" onClick={() => this.peticionPost()} >Insertar</button>
                ) : (
                  
                  <button className="btn btn-primary" onClick={() => this.peticionPatch()}>Actualizar</button>
                )}
                <button className="btn btn-danger"onClick={() => this.modalInsertar()}>Cancelar</button>
              </ModalFooter>
            </Modal>
    
            <Modal isOpen={this.state.modalEliminar}>
              <ModalBody>Estás seguro que deseas eliminar a el/la emplead@ {form && form.nombre}</ModalBody>
              <ModalFooter>
              <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Si</button>
                <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
}
export default Departamento;