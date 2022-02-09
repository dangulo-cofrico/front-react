import React,{useState, useEffect} from "react";
import Axios from "axios";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit,faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Tipo=()=>{
    const [tipos, setTipos] = useState([]);
  useEffect(() => {
    Axios({
      url: "http://localhost:8080/tipos",
    })
      .then((response) => {
        setTipos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, [setTipos]);
    
    return (
      <div className="App">
        <button>Insertar nuevo tipo</button>
        <table>
          <tr><th>Nombre</th><th>Acciones</th></tr>
          <tr>
            <div>
              {tipos.map((tipo) => (
                <div key={tipo.id}>
                  <td>{tipo.nombre}</td>
                </div>
              ))}
            
            
              <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit}/></button>
              <button color="danger"><FontAwesomeIcon icon={faTrashAlt}/></button>
            </div>
          </tr>
        </table>
      </div>
        
    );
}

export default Tipo;