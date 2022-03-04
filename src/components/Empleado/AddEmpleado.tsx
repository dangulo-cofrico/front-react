import React, { useState, ChangeEvent, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import { Column } from "primereact/column";
import {DataTable} from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import {IDepartamentoOutputData, useDepartamentoCRUD, useEmpleadoCRUD} from "../../hooks/api";
import {IEmpleadoOutputData} from '../../hooks/api';

const AddEmpleado: React.FC = () => {
  const initialEmpleadoState = {
    id : null,
    dni : "",
    nombre : "",
    telefono : "",
    empleadodep:[{
      cargo : "",
      departamento: {
        codDepartamento:null,
        nombre:''
      }
    }]
  };

  const initialDep={
    id:null,
    nombre:''
  }
  interface ICargoEmpleado{
    id?:any|null,
    codDepartamento?:number|null,
    nombre: string
    cargo : string
  }

  interface IEstadoCargo{
    cargos : ICargoEmpleado[]
    nombreCargo : string
  }

  

  const [empleado, setEmpleado] = useState<IEmpleadoOutputData>(initialEmpleadoState);
  const [departamentos, setDepartamentos]= useState<Array<IDepartamentoOutputData>>([]);
  const [selectedDepartamento, setSelectedDepartamento]= useState<IDepartamentoOutputData>(initialDep);
  const [estadoCargo, setEstadoCargo]= useState<IEstadoCargo>({cargos:[], nombreCargo:''});
  //const [empleadodep, setEmpleadodep]=useState<IEmpleadoDep>(initialEmpleadoDep);
  const [cargo, setCargo]= useState('');

  const history = useHistory();

  

  const retrieveDep= () =>{
    useDepartamentoCRUD.getAllDepartamento()
    .then((response: any)=>{
      setDepartamentos(response.data);
      console.log(response.data);
    })
    .catch((e:Error)=>{
      console.log(e);
    });
  };

  useEffect(()=>{
    retrieveDep();
  },[]);
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmpleado({ ...empleado, [name]: value });
  };
  
  const handleSetCargo=(e:any)=>{
    setCargo(e.target.value)
    setEstadoCargo({cargos : estadoCargo.cargos, nombreCargo: e.target.value})
  }

  const saveEmpleado = () => {
    
    let data = {
      dni : empleado.dni,
      nombre : empleado.nombre,
      telefono : empleado.telefono,
      empleadodep : estadoCargo.cargos
    };
    useEmpleadoCRUD.createEmpleado(data)
      .then((response: any) => {
        console.log(data)
        setEmpleado({
          id : response.data.id,
          dni : response.data.dni,
          nombre : response.data.nombre,
          telefono : response.data.telefono,
          empleadodep: response.data.empleadodep
        });
        history.push("/empleados");
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const insertInEmpleadoDep=()=>{

    let nuevoCargo={
      id: new Date().getTime()*(-1),
      codDepartamento:selectedDepartamento.id,
      nombre: selectedDepartamento.nombre,
      cargo: estadoCargo.nombreCargo
    }
    estadoCargo.cargos.push(nuevoCargo)
    estadoCargo.nombreCargo=''
    setEstadoCargo(estadoCargo)
    setCargo(estadoCargo.nombreCargo)
  }

  return (
    <div>
      <div className="form-group">

        <label htmlFor="dni">DNI</label>
        <input type="text" className="form-control" id="dni" required value={empleado.dni} onChange={handleInputChange} name="dni"/><br/>

        <label htmlFor="nombre">Nombre</label>
        <input type="text" className="form-control" id="nombre" required value={empleado.nombre}  onChange={handleInputChange} name="nombre"/><br/>

        <label htmlFor="telefono">Teléfono</label>
        <input type="text" className="form-control" id="telefono" required value={empleado.telefono}  onChange={handleInputChange} name="telefono"/><br/>
        
        <div className="form-group">
          
            {/* Dropdowm */}
            <Dropdown value={selectedDepartamento} options={departamentos} id="codDepartamento" key="codDepartamento" optionLabel="nombre" onChange={e=> setSelectedDepartamento(e.value)} placeholder="Selecciona un Departamento"/><br/>
            {/* Impunt */}
            <label htmlFor="cargo">Cargo</label>
            <input type="text" className="form-control" id="cargo"  name="cargo" required value={cargo} onChange={handleSetCargo} /><br/>
            <input type="button" value="Insertar" onClick={insertInEmpleadoDep} />
            <h3>Departamentos del Empleado</h3>
            <DataTable value={estadoCargo.cargos} className="table dark-table" responsiveLayout="scroll">
              <Column field="nombre" header="Departamentos"/>
              <Column field="cargo" header="Cargos"/>
            </DataTable>
      </div>  
        </div>

        
      <button onClick={saveEmpleado} className="btn btn-success">Añadir</button>
      <p></p>
      <p></p>
    </div>
  )
  };
  export default AddEmpleado;