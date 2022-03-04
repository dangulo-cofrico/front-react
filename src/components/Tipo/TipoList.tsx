import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTipoCRUD } from "../../hooks/api"
import { ITipoOutputData } from '../../hooks/api';

const TipoList: React.FC = () => {
  
  const [tipos, setTipos] = useState<Array<ITipoOutputData>>([]);
  const [currentTipo, setCurrentTipo] = useState<ITipoOutputData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchNombre, setSearchNombre] = useState<string>("");
  const history=useHistory();
  
  useEffect(() => {
    retrieveTipos();
  }, []);

  const onChangeSearchNombre = (e: ChangeEvent<HTMLInputElement>) => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };

  const retrieveTipos = () => {
    useTipoCRUD.getAllTipo()
      .then((response: any) => {
        setTipos(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTipos();
    setCurrentTipo(null);
    setCurrentIndex(-1);
  };

  const setActiveTipo = (tipo: ITipoOutputData, index: number) => {
    setCurrentTipo(tipo);
    setCurrentIndex(index);
  };

  const removeAllTipos = () => {
    useTipoCRUD.removeAllTipo()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const toAdd=()=>{
    history.push("/addtipo")
  };

  const findByNombre = () => {
    useTipoCRUD.findByNombreTipo(searchNombre)
      .then((response: any) => {
        setTipos(response.data);
        setCurrentTipo(null);
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
            <button className="btn btn-outline-secondary" type="button" onClick={findByNombre}>Buscar</button>
            <br/>
          </div>
        </div>
      </div>
      <br/>
      <button style={{color:"white", background:"black"}} onClick={toAdd}>Añadir Tipo</button>
      <div className="col-md-6">
        <h4>Lista de Tipos</h4>
        <ul className="list-group">
          {tipos && tipos.map((tipo, index) => (
              <li className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => setActiveTipo(tipo, index)}key={index}>
                {tipo.nombre}
              </li>
          ))}
        </ul>
        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllTipos}> Borrar Todo </button>
      </div>
      <div className="col-md-6">
        {currentTipo ? (
          <div>
            <h4>Tipo</h4>
            <div>
              <label><strong>Nombre:</strong></label>{" "}
              {currentTipo.nombre}
            </div>
            <Link to={"/tipos/" + currentTipo.id} className="badge badge-warning">Editar</Link>
          </div>
        ) : (
          <div>
            <br/>
            <p>Por favor pulse un Tipo...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default TipoList;