import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import EmpresaDataService from "../../services/EmpresaService";
import IEmpresaData from '../../types/Empresa';

const EmpresaList: React.FC = () => {
  
  const [empresas, setEmpresas] = useState<Array<IEmpresaData>>([]);
  const [currentEmpresa, setCurrentEmpresa] = useState<IEmpresaData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchNombre, setSearchNombre] = useState<string>("");
  const history=useHistory();

  useEffect(() => {
    retrieveEmpresas();
  }, []);
  
  const retrieveEmpresas = () => {
    EmpresaDataService.getAll()
      .then((response: any) => {
        setEmpresas(response.data);
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
    retrieveEmpresas();
    setCurrentEmpresa(null);
    setCurrentIndex(-1);
  };

  const setActiveEmpresa = (empresa: IEmpresaData, index: number) => {
    setCurrentEmpresa(empresa);
    setCurrentIndex(index);
  };

  const removeAllEmpresas = () => {
    EmpresaDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
 
  const toAdd=()=>{
    history.push("/addempresa")
  };
  
  const findByNombre = () => {
    EmpresaDataService.findByNombre(searchNombre)
      .then((response: any) => {
        setEmpresas(response.data);
        setCurrentEmpresa(null);
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
      <button style={{color:"white", background:"black"}} onClick={toAdd}>Añadir Empresa</button>
      <div className="col-md-6">
        <h4>Lista de Empresas</h4>
        <ul className="list-group">
          {empresas && empresas.map((empresa, index) => (
              <li className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => setActiveEmpresa(empresa, index)} key={index}>
                {empresa.nombre}
              </li>
          ))}
        </ul>
        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllEmpresas}>Borrar Todo</button>
      </div>
      <div className="col-md-6">
        {currentEmpresa ? (
          <div>
            <h4>Empresa</h4>
            <div>
              <label><strong>Nombre: </strong></label>{" "}
              {currentEmpresa.nombre}<br/>
              <label><strong>Direccion:</strong></label>{" "}
              {currentEmpresa.direccion}<br/>
              <label><strong>Nombre de Tipo: </strong></label>{" "}
              {currentEmpresa.codTipo}
            </div>
            <Link to={"/empresas/" + currentEmpresa.id} className="badge badge-warning">Editar</Link>
          </div>
        ) : (
          <div>
            <p>Por favor pulse una Empresa...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default EmpresaList;