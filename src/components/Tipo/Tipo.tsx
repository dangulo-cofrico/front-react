import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { useTipoCRUD } from "../../hooks/api";
import { ITipoOutputData } from "../../hooks/api";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const Tipo: React.FC<Props>=(props: Props) => {
  const initialTipoState = {
    id: null,
    nombre: ""
  };

  const [currentTipo, setCurrentTipo] = useState<ITipoOutputData>(initialTipoState);

  const getTipo = (id: string) => {
    useTipoCRUD.getTipo(id)
      .then((response: any) => {
        setCurrentTipo(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getTipo(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentTipo({ ...currentTipo, [name]: value });
  };
  const updateTipo = () => {
    useTipoCRUD.updateTipo(currentTipo)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/tipos");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const deleteTipo = () => {
    useTipoCRUD.removeTipo(currentTipo.id)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/tipos");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div className="edit-form">
      <h4>Tipo</h4>
      <form>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={currentTipo.nombre} onChange={handleInputChange}
          />
        </div>
      </form>
      <button style={{color:"black", background:"red"}} onClick={deleteTipo}>Borrar</button>{"  "}
      <button style={{color:"black", background:"yellow"}} onClick={updateTipo}>Editar</button>
    </div>
  );
};
export default Tipo;