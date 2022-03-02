import http from "../http-common";
import IDepartamentoData from "../types/Departamento";

const getAll = () => {
  return http.get<Array<IDepartamentoData>>("/departamentos");
};

const get = (id: any) => {
  return http.get<IDepartamentoData>(`/departamentos/${id}`);
};

const create = (data: IDepartamentoData) => {
  return http.post<IDepartamentoData>("/departamentos", data);
};

const update = (data: IDepartamentoData) => {
  return http.patch<IDepartamentoData>(`/departamentos`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/departamentos/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/departamentos`);
};

const findByNombre = (nombre: string) => {
  return http.get<Array<IDepartamentoData>>(`/departamentos/nombre/${nombre}`);
};

const DepartamentoService = {
  getAll, get, create, update, remove, removeAll, findByNombre
};

export default DepartamentoService;