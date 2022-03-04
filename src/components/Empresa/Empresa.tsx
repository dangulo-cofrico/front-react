import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { useEmpresaCRUD } from "../../hooks/api";
import { IEmpresaOutputData } from "../../hooks/api";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const Empresa: React.FC<Props>=(props: Props) => {
  const initialEmpresaState = {
    id: null,
    nombre:"",
    direccion:"",
    codTipo: null,
    tipo: {
      id:null,
      nombre:''
    }
  };

  const [currentEmpresa, setCurrentEmpresa] = useState<IEmpresaOutputData>(initialEmpresaState);
  const getEmpresa = (id: string) => {
    useEmpresaCRUD.getEmpresa(id)
      .then((response: any) => {
        setCurrentEmpresa(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getEmpresa(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentEmpresa({ ...currentEmpresa, [name]: value });
  };
  const updateEmpresa = () => {
    useEmpresaCRUD.updateEmpresa(currentEmpresa)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/empresas");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const deleteEmpresa = () => {
    useEmpresaCRUD.removeEmpresa(currentEmpresa.id).then((response: any) => {
        console.log(response.data);
        props.history.push("/empresas");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div className="edit-form">
      <h4>Empresa</h4>
      <form>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={currentEmpresa.nombre} onChange={handleInputChange}/>
          <label htmlFor="direccion">Direccion</label>
          <input type="text" className="form-control" id="direccion" name="direccion" value={currentEmpresa.direccion} onChange={handleInputChange}/>
          <label htmlFor="tipo">Nombre de tipo</label><br/>
          <input type="text" className="form-control" id="tipo" name="tipo" value={currentEmpresa.tipo.nombre} onChange={handleInputChange}/>
        </div> 
      </form>
      <button style={{color:"white", background:"red"}} onClick={deleteEmpresa}>Borrar</button>
      <button style={{color:"white", background:"yellow"}} onClick={updateEmpresa}>Editar</button>
    </div>
  );
};
export default Empresa;