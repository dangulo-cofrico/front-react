import http from "../http-common";
import ITipoData from "../types/Tipo";

const getAll = () => {
  return http.get<Array<ITipoData>>("/tipos");
};

const get = (id: any) => {
  return http.get<ITipoData>(`/tipos/${id}`);
};

const create = (data: ITipoData) => {
  return http.post<ITipoData>("/tipos", data);
};

const update = (data: ITipoData) => {
  return http.patch<ITipoData>(`/tipos`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/tipos/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/tipos`);
};

const findByNombre = (nombre: string) => {
  return http.get<Array<ITipoData>>(`/tipos/nombre/${nombre}`);
};

const TipoService = {
  getAll, get, create, update, remove, removeAll, findByNombre
};

export default TipoService;