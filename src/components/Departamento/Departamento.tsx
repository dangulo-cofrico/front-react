import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { useDepartamentoCRUD } from "../../hooks/api";
import {IDepartamentoOutputData} from '../../hooks/api';

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const Departamento: React.FC<Props>=(props: Props) => {
  const initialDepartamentoState = {
    id: null,
    nombre: ""
  };

  const [currentDepartamento, setCurrentDepartamento] = useState<IDepartamentoOutputData>(initialDepartamentoState);

  const getDepartamento = (id: string) => {
    useDepartamentoCRUD.getDepartamento(id)
      .then((response: any) => {
        setCurrentDepartamento(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getDepartamento(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentDepartamento({ ...currentDepartamento, [name]: value });
  };
  const updateDepartamento = () => {
    useDepartamentoCRUD.updateDepartamento(currentDepartamento)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/departamentos");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const deleteDepartamento = () => {
    useDepartamentoCRUD.removeDepartamento(currentDepartamento.id)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/departamentos");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div className="edit-form">
      <h4>Departamento</h4>
      <form>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={currentDepartamento.nombre} onChange={handleInputChange}/>
        </div>
      </form>
      <button style={{color:"black", background:"red"}} onClick={deleteDepartamento}>Borrar</button>{"  "}
      <button style={{color:"black", background:"yellow"}} onClick={updateDepartamento}>Editar</button>
    </div>
  );
};
export default Departamento;