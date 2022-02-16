import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TipoService } from '../Service/TipoService';

const url="http://localhost:8080/tipos";

const TablaTipo = () => {

    const [tipos, setTipos] = useState([]);
    const tipoService = new TipoService();
    const [loading, setLoading] = useState(true);

    const trataDatos = (data: any) => {
        setTipos(data)
    }

    const cascaDatos = () => {
        return { hasError: true };
    }


    useEffect(() => {
        tipoService.getTipos().then(trataDatos, cascaDatos);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card" style={{ height: 'calc(100vh - 145px)' }}>
                <DataTable value={tipos} scrollable scrollHeight="flex">
                    <Column field="nombre" header="Nombre"></Column>
                </DataTable>
            </div>
        </div>
    );

}
export default TablaTipo;