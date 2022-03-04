import React, { useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { useDepartamentoCRUD } from "../../hooks/api";
import {IDepartamentoOutputData} from '../../hooks/api';

const AddDepartamento: React.FC = () => {
  const initialDepartamentoState = {
    id: null,
    nombre:""
  };

  const history = useHistory();

  const [departamento, setDepartamento] = useState<IDepartamentoOutputData>(initialDepartamentoState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDepartamento({ ...departamento, [name]: value });
  };

  const saveDepartamento = () => {
    var data={
      nombre:departamento.nombre
    }
    useDepartamentoCRUD.createDepartamento(data)
      .then((response: any) => {
        setDepartamento({
          id: response.data.id,
          nombre: response.data.nombre
        });
        history.push("/departamentos");
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
            <input type="text" className="form-control" id="nombre" required value={departamento.nombre} onChange={handleInputChange} name="nombre"/>
          </div>
          <button onClick={saveDepartamento} className="btn btn-success">Añadir</button>
        </div>
    )
  };
  export default AddDepartamento;