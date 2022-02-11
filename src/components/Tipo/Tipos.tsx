import React,{useState, useEffect} from "react";
import { useTipoCRUD } from "src/hooks/api";

const Tipo=()=>{
    const [tipos, setTipos] = useState([]);
    const tipoCrud = useTipoCRUD()
  useEffect(() => {
      tipoCrud.read.then(()=>)
      .then((response) => {
        setTipos(response.data);
      })
      .catch((error) => {
        console.log(error);

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
            
            
              <button></button>
              <button color="danger"></button>
            </div>
          </tr>
        </table>
      </div>
        
    );
}

export default Tipo;