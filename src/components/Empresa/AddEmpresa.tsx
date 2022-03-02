import React, { useState, ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import EmpresaDataService from "../../services/EmpresaService";
import DepartamentoDataService from "../../services/DepartamentoService"
import TipoDataService from "../../services/TipoService";
import IEmpresaData from '../../types/Empresa';
import ITipoData from "../../types/Tipo";
import {Dropdown} from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import "./AddEmpresa.css"

const AddEmpresa: React.FC = () => {
  const initialEmpresaState = {
    id: null,
    nombre:"",
    direccion:"",
    codTipo:null,
    codsDepartamentos:[{
      id: 0
    }]
  };


  const history = useHistory();

  const [empresa, setEmpresa] = useState<IEmpresaData>(initialEmpresaState);
  const [tipos, setTipos]= useState<Array<ITipoData>>([]);
  const [selectedTipo, setSelectedTipo] = useState<ITipoData>();
  const [departamentos, setDepartamentos]=useState(initialEmpresaState.codsDepartamentos);
  const [selectedDepartamentos, setSelectedDepartamentos]=useState(initialEmpresaState.codsDepartamentos);
  
  useEffect(() => {
    retrieveTipos();
    retrieveDepartamentos();
  }, []);
  
  const retrieveTipos = () => {
    TipoDataService.getAll()
    .then((response: any) => {
      setTipos(response.data);
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
    }
  const retrieveDepartamentos=()=>{
    DepartamentoDataService.getAll()
    .then((response: any)=>{
      setDepartamentos(response.data);
      console.log(response.data);
    })
    .catch((e:Error)=>{
      console.log(e);
    });
  };
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmpresa({ ...empresa, [name]: value });
  };
  
  const saveEmpresa = () => {
    var data = {
      nombre: empresa.nombre,
      direccion: empresa.direccion, 
      tipo: {selectedTipo}.selectedTipo?.id,
      codsDepartamentos : {selectedDepartamentos}
    };
    EmpresaDataService.create(data)
      .then((response: any) => {
        console.log(data)
        setEmpresa({
          id: response.data.id,
          nombre: response.data.nombre,
          direccion: response.data.direccion,
          codTipo: response.data.codTipo,
          codsDepartamentos:response.data.codsDepartamentos
        });
        history.push("/empresas");
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="form-group">

        <label htmlFor="nombre">Nombre</label>
        <input type="text" className="form-control" id="nombre" required value={empresa.nombre} onChange={handleInputChange} name="nombre"/><br/>

        <label htmlFor="direccion">Dirección</label>
        <input type="text" className="form-control" id="direccion" required value={empresa.direccion}  onChange={handleInputChange} name="direccion"/><br/>

        <label htmlFor="tipo">Tipo de empresa</label><br/>
        <Dropdown value={selectedTipo} options={tipos} onChange={(e)=>setSelectedTipo(e.value)} optionLabel="nombre" placeholder="Selecciona un Tipo de empresa" />
        <br/>

        <label htmlFor="codsDepartamentos">Codigos de Departamentos</label><br/>
        <MultiSelect className="multiselect-demo" id="codsDepartamentos" value={selectedDepartamentos} options={departamentos} onChange={(e) => setSelectedDepartamentos(e.value)} optionLabel="nombidre" display="chip"/>
      </div>
      <button onClick={saveEmpresa} className="btn btn-success">Añadir</button>
    </div>
  )
  };
  export default AddEmpresa;