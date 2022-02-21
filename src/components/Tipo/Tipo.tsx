import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import TipoDataService from "../../services/TipoService";
import ITipoData from "../../types/Tipo";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const Tipo: React.FC<Props>=(props: Props) => {
  const initialTipoState = {
    id: null,
    nombre: ""
  };

  const [currentTipo, setCurrentTipo] = useState<ITipoData>(initialTipoState);
  const [message, setMessage] = useState<string>("");
  const getTipo = (id: string) => {
    TipoDataService.get(id)
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
    TipoDataService.update(currentTipo)
      .then((response: any) => {
        console.log(response.data);
        setMessage("El Tipo se modificó adecuadamente!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const deleteTipo = () => {
    TipoDataService.remove(currentTipo.id)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/tipos");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentTipo ? (
        <div className="edit-form">
          <h4>Tipo</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={currentTipo.nombre}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteTipo}>
            Borrar
          </button>
          <button
            className="badge badge-success"
            onClick={updateTipo}
          >
            Editar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Por favor pulse un Tipo...</p>
        </div>
      )}
    </div>
  );
};
export default Tipo;