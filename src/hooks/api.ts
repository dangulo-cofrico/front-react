import { useCRUD } from "@gluedigital/ruse-fetch-extras";

const base = process.env.API_URL||http://localhost:8080

export interface TipoInfo{
    id: number;
    nombre: string;
}
export interface EmpresaInfo{
    id: number;
    nombre: string;
    direccion: string;
    codTipo: number;
}
export interface DepartamentoInfo{
    id: number;
    nombre: string;
}
export interface EmpleadoDepInfo{
    id: number;
    cargo: string;
    nombreEmp:string;
    nombreDep:string;
}
export interface EmpleadoInfo{
    id: number;
    dni:string;
    nombre: string;
    telefono: number;
}

export const useTipoCRUD=()=>{
    const crud = useCRUD<number, TipoInfo>(base+"/tipos");
    return{
        create:(tipo: TipoInfo):Promise<TipoInfo>=>
        crud.custom("",{body:tipo, method="POST"}),
        update:(tipo: TipoInfo):Promise<TipoInfo>=>
        crud.custom("",{body:tipo, method:"PATCH"}),
        delete:(id: number):Promise<boolean>=>
        crud.custom(""+id, {method="DELETE"}),
    }
}