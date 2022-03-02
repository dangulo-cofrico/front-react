import IDepartamentoData from "./Departamento";
import IEmpleadoDepData from "./EmpleadoDep";

export default interface IEmpleadoData {
    id?: any | null,
    dni: string
    nombre: string,
    telefono: string,
    empleadodep:{
      codDepartamento: number,
      cargo: string
    }[]
  }
