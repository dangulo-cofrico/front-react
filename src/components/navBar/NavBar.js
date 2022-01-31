import { Component } from "react";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tipo from "../tipos/Tipo";
import Empleado from "../empleados/Empleado";
import Departamento from "../departamentos/Departamento";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit} from "@fortawesome/free-solid-svg-icons";
class NavBar extends Component{
    constructor(){
        super();
        this.state={
            checked : 0
        }
        this.handleChange= this.handleChange.bind(this);
    }
    
    handleChange(checked){
        this.setState({ checked });
    }

    render(){
        return(
            <div>
                <div class="nav">
                    <button class="nav-buttons" onClick={()=>this.handleChange(1)}><FontAwesomeIcon icon={faEdit} />Tipos</button>
                    <button class="nav-buttons" onClick={()=>this.handleChange(2)}><FontAwesomeIcon icon={faEdit} />Empresas</button>
                    <button class="nav-buttons" onClick={()=>this.handleChange(3)}><FontAwesomeIcon icon={faEdit} />Departamentos</button>
                    <button class="nav-buttons" onClick={()=>this.handleChange(4)}><FontAwesomeIcon icon={faEdit} />Departamentos de Empleados</button>
                    <button class="nav-buttons" onClick={()=>this.handleChange(5)}><FontAwesomeIcon icon={faEdit} />Empleados</button>
                </div>
                <span>
                    {
                          this.state.checked === 1 ? <div><Tipo/></div> 
                        : this.state.checked === 2 ? <div>Empresa</div>
                        : this.state.checked === 3 ? <div><Departamento/></div>
                        : this.state.checked === 4 ? <div>EmpleadosDep</div>
                        : this.state.checked === 5 ? <div><Empleado/></div>
                        : this.state.checked === 0
                    }
                </span>
            </div>
        )
    }

}
export default NavBar;