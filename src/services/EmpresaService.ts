import http from "../http-common";
import IEmpresaData from "../types/Empresa";

const getAll = () => {
  return http.get<Array<IEmpresaData>>("/empresas");
};

const get = (id: any) => {
  return http.get<IEmpresaData>(`/empresas/${id}`);
};

const create = (data: any) => {
  return http.post<IEmpresaData>("/empresas", data);
};

const update = (data: IEmpresaData) => {
  return http.patch<IEmpresaData>(`/empresas`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/empresas/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/empresas`);
};

const findByNombre = (nombre: string) => {
  return http.get<Array<IEmpresaData>>(`/empresas/nombre/${nombre}`);
};

const EmpresaService = { 
  getAll, get, create, update, remove, removeAll, findByNombre
};

export default EmpresaService;