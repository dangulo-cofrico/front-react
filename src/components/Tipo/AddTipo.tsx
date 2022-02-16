import React, { useState, ChangeEvent } from "react";
import TipoDataService from "../../Service/TipoService";
import ITipoData from '../../types/Tipo';

const AddTipo: React.FC = () => {
  const initialTipoState = {
    id: null,
    nombre:""
  };
  const [tipo, setTipo] = useState<ITipoData>(initialTipoState);
  const [submitted, setSubmitted] = useState<boolean>(false);

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
          nombre: response.data.nombre,¡
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newTipo = () => {
    setTipo(initialTipoState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Se ha añadido correctamente el Tipo</h4>
          <button className="btn btn-success" onClick={newTipo}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              required
              value={tipo.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
          </div>

          <button onClick={saveTipo} className="btn btn-success">
            Añadir
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTipo;