import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import DepartamentoDataService from "../../services/DepartamentoService";
import IDepartamentoData from '../../types/Departamento';

const DepartamentoList: React.FC = () => {

  const [departamentos, setDepartamentos] = useState<Array<IDepartamentoData>>([]);
  const [currentDepartamento, setCurrentDepartamento] = useState<IDepartamentoData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchNombre, setSearchNombre] = useState<string>("");
  const history=useHistory();

  useEffect(() => {
    retrieveDepartamentos();
  }, []);

  const onChangeSearchNombre = (e: ChangeEvent<HTMLInputElement>) => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };

  const retrieveDepartamentos = () => {
    DepartamentoDataService.getAll()
      .then((response: any) => {
        setDepartamentos(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveDepartamentos();
    setCurrentDepartamento(null);
    setCurrentIndex(-1);
  };

  const setActiveDepartamento = (departamento: IDepartamentoData, index: number) => {
    setCurrentDepartamento(departamento);
    setCurrentIndex(index);
  };

  const removeAllDepartamentos = () => {
    DepartamentoDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const toAdd=()=>{
    history.push("/adddepartamento")
  };

  const findByNombre = () => {
    DepartamentoDataService.findByNombre(searchNombre)
      .then((response: any) => {
        setDepartamentos(response.data);
        setCurrentDepartamento(null);
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
        <div className="input-group mb-3"><input type="text" className="form-control" placeholder="Buscar por nombre" value={searchNombre} onChange={onChangeSearchNombre}/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByNombre}>Buscar</button>
          </div>
        </div>
      </div>
      <button style={{color:"white", background:"black"}} onClick={toAdd}>Añadir Departamento</button>
      <div className="col-md-6">
        <h4>Lista de Departamentos</h4>
        <ul className="list-group">
          {departamentos && departamentos.map((departamento, index) => (
              <li className={"list-group-item " + (index === currentIndex ? "active" : "")}onClick={() => setActiveDepartamento(departamento, index)}key={index}>
                {departamento.nombre}
              </li>
          ))}
        </ul>
        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllDepartamentos}>Borrar Todo</button>
      </div>
      <div className="col-md-6">
        {currentDepartamento ? (
          <div>
            <h4>Departamento</h4>
            <div>
              <label><strong>Nombre:</strong></label>{" "}
              {currentDepartamento.nombre}
            </div>
            <Link to={"/departamentos/" + currentDepartamento.id} className="badge badge-warning">Editar</Link>
          </div>
        ) : (
          <div><p>Por favor pulse un Departamento...</p></div>
        )}
      </div>
    </div>
  );
};
export default DepartamentoList;