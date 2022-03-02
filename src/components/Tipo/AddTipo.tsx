import React, { useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import TipoDataService from "../../services/TipoService";
import ITipoData from '../../types/Tipo';

const AddTipo: React.FC = () => {
  
  const initialTipoState = {
    id: null,
    nombre:""
  };

  const history = useHistory();

  const [tipo, setTipo] = useState<ITipoData>(initialTipoState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTipo({ ...tipo, [name]: value });
  };

  const saveTipo = () => {
    var data = {
      nombre: tipo.nombre
    };
    TipoDataService.create(data)
      .then((response: any) => {
        setTipo({
          id: response.data.id,
          nombre: response.data.nombre
        });
        history.push("/tipos");
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

    return (
        <div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" className="form-control" id="nombre" required value={tipo.nombre} onChange={handleInputChange} name="nombre"/>
          </div>
          <button onClick={saveTipo} className="btn btn-success">Añadir</button>
        </div>
    )
  };
  export default AddTipo;