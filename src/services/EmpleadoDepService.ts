import http from "../http-common";
import IEmpleadoDepData from "../types/EmpleadoDep";

const getAll = () => {
  return http.get<Array<IEmpleadoDepData>>("/departamentos");
};

const get = (id: any) => {
  return http.get<IEmpleadoDepData>(`/departamentos/${id}`);
};

const create = (data: IEmpleadoDepData) => {
  return http.post<IEmpleadoDepData>("/departamentos", data);
};

const update = (data: IEmpleadoDepData) => {
  return http.patch<IEmpleadoDepData>(`/departamentos`, data);
};

const EmpleadoDepService = {
  getAll, get, create, update
};

export default EmpleadoDepService;