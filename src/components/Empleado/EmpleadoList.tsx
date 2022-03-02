import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import EmpleadoDataService from "../../services/EmpleadoService";
import IEmpleadoData from '../../types/Empleado';

const EmpleadoList: React.FC = () => {
  
  const [empleados, setEmpleados] = useState<Array<IEmpleadoData>>([]);
  const [currentEmpleado, setCurrentEmpleado] = useState<IEmpleadoData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchNombre, setSearchNombre] = useState<string>("");
  const history=useHistory();

  useEffect(() => {
    retrieveEmpleados();
  }, []);
  
  const retrieveEmpleados = () => {
    EmpleadoDataService.getAll()
      .then((response: any) => {
        setEmpleados(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const onChangeSearchNombre = (e: ChangeEvent<HTMLInputElement>) => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };

  const refreshList = () => {
    retrieveEmpleados();
    setCurrentEmpleado(null);
    setCurrentIndex(-1);
  };

  const setActiveEmpleado = (empleado: IEmpleadoData, index: number) => {
    setCurrentEmpleado(empleado);
    setCurrentIndex(index);
  };

  const removeAllEmpleados = () => {
    EmpleadoDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
 
  const toAdd=()=>{
    history.push("/addempleado")
  };
  
  const findByNombre = () => {
    EmpleadoDataService.findByNombre(searchNombre)
      .then((response: any) => {
        setEmpleados(response.data);
        setCurrentEmpleado(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return ( 
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Buscar por nombre" value={searchNombre} onChange={onChangeSearchNombre}/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByNombre}> Buscar</button>
          </div>
        </div>
      </div>
      <button style={{color:"white", background:"black"}} onClick={toAdd}>Añadir Empleado</button>
      <div className="col-md-6">
        <h4>Lista de Empleados</h4>
        <ul className="list-group">
          {empleados && empleados.map((empleado, index) => (
              <li className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => setActiveEmpleado(empleado, index)} key={index}>
                {empleado.nombre}
              </li>
          ))}
        </ul>
        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllEmpleados}>Borrar Todo</button>
      </div>
      <div className="col-md-6">
        {currentEmpleado ? (
          <div>
            <h4>Empleado</h4>
            <div>
              <label><strong>DNI: </strong></label>{" "}
              {currentEmpleado.dni}<br/>
              <label><strong>Nombre: </strong></label>{" "}
              {currentEmpleado.nombre}<br/>
              <label><strong>Teléfono: </strong></label>{" "}
              {currentEmpleado.telefono}
            </div>
            <Link to={"/empleados/" + currentEmpleado.id}className="badge badge-warning">Editar</Link>
          </div>
        ) : (
          <div>
            <p>Por favor pulse una Empleado...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default EmpleadoList;