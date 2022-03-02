import { ICodsDepartamentoData } from "./Departamento";

export default interface IEmpleadoData {
    id?: any | null,
    nombre: string,
    direccion: string,
    codTipo : any|null
    codsDepartamentos:ICodsDepartamentoData[]
  }
