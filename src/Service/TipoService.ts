import http from "../http-common"
import ITipoData from "../types/Tipo";

export interface Tipo {
    id: number,
    nombre: string
}
const getAll=()=>{
    return http.get<Array<ITipoData>>("/tipos");
}

const get=(id: number)=>{
    return http.get<ITipoData>(`/tipos/${id}`);
}
const create = (data: ITipoData) => {
    return http.post<ITipoData>("/tipos", data);
  };
  const update = (id: number, data: ITipoData) => {
    return http.patch<number>(`/tipos/${id}`, data);
  };
  const remove = (id: number) => {
    return http.delete<any>(`/tipos/${id}`);
  };

  const TipoService = {
    getAll,
    get,
    create,
    update,
    remove
  };
  export default TipoService;