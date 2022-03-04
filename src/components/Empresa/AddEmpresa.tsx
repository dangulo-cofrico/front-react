import React, { useState, ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IEmpresaInputData, ITipoOutputData,  useTipoCRUD,useDepartamentoCRUD, useEmpresaCRUD, IDepartamentoOutputData } from "../../hooks/api";
import {Dropdown} from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import "./AddEmpresa.css"

const AddEmpresa: React.FC = () => {
  const initialEmpresaState = {
    id : null,
    nombre : "",
    direccion : "",
    tipo : {
      id:null,
      nombre:''
    },
    departamentos : [{
      id : null,
      nombre : ''
    }]
  };


  const history = useHistory();

  const [empresa, setEmpresa] = useState<IEmpresaInputData>(initialEmpresaState);
  const [tipos, setTipos]= useState<Array<ITipoOutputData>>([]);
  const [selectedTipo, setSelectedTipo] = useState<ITipoOutputData>();
  const [departamentos, setDepartamentos]=useState(initialEmpresaState.departamentos);
  const [selectedDepartamentos, setSelectedDepartamentos]=useState<IDepartamentoOutputData>();
  
  useEffect(() => {
    retrieveTipos();
    retrieveDepartamentos();
  }, []);
  
  const retrieveTipos = () => {
    useTipoCRUD.getAllTipo()
    .then((response: any) => {
      setTipos(response.data);
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
    }
  const retrieveDepartamentos=()=>{
    useDepartamentoCRUD.getAllDepartamento()
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
      tipo: empresa.tipo.id,
      departamentos : {selectedDepartamentos}
    };
    useEmpresaCRUD.createEmpresa(data)
      .then((response: any) => {
        console.log(data)
        setEmpresa({
          id: response.data.id,
          nombre: response.data.nombre,
          direccion: response.data.direccion,
          tipo: response.data.tipo,
          departamentos:response.data.departamentos
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