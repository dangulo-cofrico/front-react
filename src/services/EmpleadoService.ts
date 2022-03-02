import http from "../http-common";
import IEmpleadoData from "../types/Empleado";

const getAll = () => {
  return http.get<Array<IEmpleadoData>>("/empleados");
};

const get = (id: any) => {
  return http.get<IEmpleadoData>(`/empleados/${id}`);
};

const create = (data: any) => {
  return http.post<IEmpleadoData>("/empleados", data);
};

const update = (data: any) => {
  return http.patch<IEmpleadoData>(`/empleados`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/empleados/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/empleados`);
};

const findByNombre = (nombre: string) => {
  return http.get<Array<IEmpleadoData>>(`/empleados/nombre/${nombre}`);
};

const EmpleadoService = {
  getAll, get, create, update, remove, removeAll, findByNombre
};

export default EmpleadoService;