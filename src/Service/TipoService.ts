import axios from "";

const url="http://localhost:8080/tipos"; 

export interface Tipo {
    id: number,
    nombre: string
}

class TipoService {
    getTipos() {
        return fetch(url).then(data => data.json());
    }
    postTipos(tipo: Tipo){
        return 
    }
}