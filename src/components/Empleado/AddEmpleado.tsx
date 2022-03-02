import React, { useState, ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EmpleadoDataService from "../../services/EmpleadoService";
import DepartamentoDataService from "../../services/DepartamentoService";
import IEmpleadoData from '../../types/Empleado';
import { Dropdown } from "primereact/dropdown";
import IDepartamentoData from "../../types/Departamento";
import {DataTable} from 'primereact/datatable'
import { Column } from "primereact/column";
import IEmpleadoDep from "../../types/EmpleadoDep"

const AddEmpleado: React.FC = () => {
  const initialEmpleadoState = {
    id: null,
    dni:"",
    nombre:"",
    telefono: "",
    empleadodep:[{
      codDepartamento:0,
      cargo: ''
    }]
  };

  const initialDep={
    id:null,
    nombre:''
  }

  const initialEmpleadoDep={
    codDepartamento:null,
    cargo: ""
  }

  interface IObjetoFinal{
    id:number | null,
    nombre:string,
    cargo: string
  }

  const [empleado, setEmpleado] = useState<IEmpleadoData>(initialEmpleadoState);
  const [departamentos, setDepartamentos]= useState<Array<IDepartamentoData>>([]);
  const [selectedDepartamento, setSelectedDepartamento]= useState<IDepartamentoData>(initialDep);
  //const [empleadodep, setEmpleadodep]=useState<IEmpleadoDep>(initialEmpleadoDep);
  const [cargo, setCargo]= useState('');
  const objetoSeleccionado : IObjetoFinal= {"id":selectedDepartamento.id,"nombre":selectedDepartamento.nombre, "cargo":cargo};
  // const objetoSeleccionado2=objetoSeleccionado
  //var objetosTabla:any[]=[]
  const [objetosTabla, setObjetosTabla]=useState<Array<IObjetoFinal>>([]);
  const history = useHistory();

  

  const retrieveDep= () =>{
    DepartamentoDataService.getAll()
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
  
  // useEffect(()=>{
  //   setObjetosTabla(objetosTabla)
  // },[])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmpleado({ ...empleado, [name]: value });
  };
  
  const saveEmpleado = () => {
    
    let data = {
      dni : empleado.dni,
      nombre : empleado.nombre,
      telefono : empleado.telefono,
      empleadodep : [
        {
          codDepartamento:1,
          cargo:"Ayudante"
        },
        {
          codDepartamento:2,
          cargo:"Jefe"
        }
      ]
    };
    EmpleadoDataService.create(data)
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
    console.log(objetoSeleccionado)
    
    // setSelectedDepartamento(selectedDepartamento);
    // setCargo(cargo)
    objetosTabla.push(objetoSeleccionado)
        
    // objetoSeleccionado2.id=''
    // objetoSeleccionado2.cargo=''
    console.log(objetosTabla)
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
            <Dropdown value={selectedDepartamento} options={departamentos} id="id" key="id" optionLabel="nombre" onChange={e=> setSelectedDepartamento(e.value)} placeholder="Selecciona un Departamento"/><br/>
            {/* Impunt */}
            <label htmlFor="cargo">Cargo</label>
            <input type="text" className="form-control" id="cargo"  name="cargo" required value={cargo}/><br/>
            <input type="button" value="Insertar" onClick={insertInEmpleadoDep}/>
            <h3>Departamentos del Empleado</h3>
            <DataTable value={objetosTabla} className="table dark-table" responsiveLayout="scroll">
              <Column field="id" header="ID"/>
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