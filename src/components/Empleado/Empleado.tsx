import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import EmpleadoDataService from "../../services/EmpleadoService";
import IEmpleadoData from "../../types/Empleado";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const Empleado: React.FC<Props>=(props: Props) => {
  const initialEmpleadoState = {
    id: null,
    dni:"",
    nombre:"",
    telefono:"",
    empleadodep:[{
        codDepartamento: 0,
        cargo:""
    }]
  };

  const [currentEmpleado, setCurrentEmpleado] = useState<IEmpleadoData>(initialEmpleadoState);
  const getEmpleado = (id: string) => {
    EmpleadoDataService.get(id)
      .then((response: any) => {
        setCurrentEmpleado(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getEmpleado(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentEmpleado({ ...currentEmpleado, [name]: value });
  };
  const updateEmpleado = () => {
    EmpleadoDataService.update(currentEmpleado)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/empleados");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const deleteEmpleado = () => {
    EmpleadoDataService.remove(currentEmpleado.id)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/empleados");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentEmpleado ? (
        <div className="edit-form">
          <h4>Empleado</h4>
          <form>
            <div className="form-group">
              <label htmlFor="dni">DNI</label>
              <input type="text" className="form-control" id="dni" name="dni" value={currentEmpleado.dni} onChange={handleInputChange}/>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" className="form-control" id="nombre" name="nombre" value={currentEmpleado.nombre} onChange={handleInputChange}/>
              <label htmlFor="telefono">Teléfono</label><br/>
              <input type="text" className="form-control" id="telefono" name="telefono" value={currentEmpleado.telefono} onChange={handleInputChange}/>
            </div>
          </form>
          <button style={{color:"black", background:"red"}} onClick={deleteEmpleado}>Borrar</button>
          <button style={{color:"black", background:"yellow"}} onClick={updateEmpleado}
          >
            Editar
          </button>
        </div>
      ) : (
        <div>
          <br />
          <p>Por favor pulse un/una Emplead@...</p>
        </div>
      )}
    </div>
  );
};
export default Empleado;