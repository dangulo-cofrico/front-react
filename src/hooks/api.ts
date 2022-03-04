import http from "../http-common";

export  interface ITipoOutputData {
  id?: any | null,
  nombre: string
}
export interface IEmpresaOutputData {
  id?: any | null,
  nombre: string,
  direccion: string,
  tipo : ITipoOutputData
}
export interface IEmpresaInputData{
  id?: any | null,
  nombre: string,
  direccion: string,
  tipo : ITipoOutputData,
  departamentos: IDepartamentoOutputData[]
}
export interface IDepartamentoOutputData {
  id?: number|null,
  nombre:string
}
export interface IEmpleadoDepOutputData {
  cargo:string,
  departamento: IDepartamentoOutputData
}
export interface IEmpleadoMinOutputData {
    codDepartamento?: any|null,
    nombre: string
  }
export  interface IEmpleadoOutputData {
  id?: any | null,
  dni: string
  nombre: string,
  telefono: string,
  empleadodep:IEmpleadoDepOutputData[]
}
export interface IEmpleadoMinOutputData {
  id?: any|null,
  nombre: string
}

const getAllEmpleado = () => {
  return http.get<Array<IEmpleadoOutputData>>("/empleados");
};

const getEmpleado = (id: any) => {
  return http.get<IEmpleadoOutputData>(`/empleados/${id}`);
};

const createEmpleado = (data: any) => {
  return http.post<IEmpleadoOutputData>("/empleados", data);
};

const updateEmpleado = (data: any) => {
  return http.patch<IEmpleadoOutputData>("/empleados", data);
};

const removeEmpleado = (id: any) => {
  return http.delete<any>(`/empleados/${id}`);
};

const removeAllEmpleado = () => {
  return http.delete<any>(`/empleados`);
};

const findByNombreEmpleado = (nombre: string) => {
  return http.get<Array<IEmpleadoOutputData>>(`/empleados/nombre/${nombre}`);
};

const getAllEmpleadoDep = () => {
  return http.get<Array<IEmpleadoDepOutputData>>("/departamentos");
};

const getEmpleadoDep = (id: any) => {
  return http.get<IEmpleadoDepOutputData>(`/departamentos/${id}`);
};

const createEmpleadoDep = (data: IEmpleadoDepOutputData) => {
  return http.post<IEmpleadoDepOutputData>("/departamentos", data);
};

const updateEmpleadoDep = (data: IEmpleadoDepOutputData) => {
  return http.patch<IEmpleadoDepOutputData>(`/departamentos`, data);
};

const getAllDepartamento = () => {
  return http.get<Array<IDepartamentoOutputData>>("/departamentos");
};

const getDepartamento = (id: any) => {
  return http.get<IDepartamentoOutputData>(`/departamentos/${id}`);
};

const createDepartamento = (data: IDepartamentoOutputData) => {
  return http.post<IDepartamentoOutputData>("/departamentos", data);
};

const updateDepartamento = (data: IDepartamentoOutputData) => {
  return http.patch<IDepartamentoOutputData>(`/departamentos`, data);
};

const removeDepartamento = (id: any) => {
  return http.delete<any>(`/departamentos/${id}`);
};

const removeAllDepartamento = () => {
  return http.delete<any>(`/departamentos`);
};

const findByNombreDepartamento = (nombre: string) => {
  return http.get<Array<IDepartamentoOutputData>>(`/departamentos/nombre/${nombre}`);
};
  
const getAllEmpresa = () => {
  return http.get<Array<IEmpresaOutputData>>("/empresas");
};

const getEmpresa = (id: any) => {
  return http.get<IEmpresaOutputData>(`/empresas/${id}`);
};

const createEmpresa = (data: any) => {
  return http.post<IEmpresaOutputData>("/empresas", data);
};

const updateEmpresa = (data: IEmpresaOutputData) => {
  return http.patch<IEmpresaOutputData>(`/empresas`, data);
};

const removeEmpresa = (id: any) => {
  return http.delete<any>(`/empresas/${id}`);
};

const removeAllEmpresa = () => {
  return http.delete<any>(`/empresas`);
};

const findByNombreEmpresa = (nombre: string) => {
  return http.get<Array<IEmpresaOutputData>>(`/empresas/nombre/${nombre}`);
};

const getAllTipo = () => {
  return http.get<Array<ITipoOutputData>>("/tipos");
};

const getTipo = (id: any) => {
  return http.get<ITipoOutputData>(`/tipos/${id}`);
};

const createTipo = (data: ITipoOutputData) => {
  return http.post<ITipoOutputData>("/tipos", data);
};

const updateTipo = (data: ITipoOutputData) => {
  return http.patch<ITipoOutputData>(`/tipos`, data);
};

const removeTipo = (id: any) => {
  return http.delete<any>(`/tipos/${id}`);
};

const removeAllTipo = () => {
  return http.delete<any>(`/tipos`);
};

const findByNombreTipo = (nombre: string) => {
  return http.get<Array<ITipoOutputData>>(`/tipos/nombre/${nombre}`);
};
  
export const useTipoCRUD = {
 getAllTipo, getTipo, createTipo, updateTipo, removeTipo, removeAllTipo, findByNombreTipo
};

export const useEmpresaCRUD = { 
    getAllEmpresa, getEmpresa, createEmpresa, updateEmpresa, removeEmpresa, removeAllEmpresa, findByNombreEmpresa
};  

export const useDepartamentoCRUD = {
  getAllDepartamento, getDepartamento, createDepartamento, updateDepartamento, removeDepartamento, removeAllDepartamento, findByNombreDepartamento
};

export const useEmpleadoDepCRUD = {
  getAllEmpleadoDep, getEmpleadoDep, createEmpleadoDep, updateEmpleadoDep
};

export const useEmpleadoCRUD={
  getAllEmpleado, getEmpleado, createEmpleado, updateEmpleado, removeEmpleado, removeAllEmpleado, findByNombreEmpleado
};