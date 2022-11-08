//importamos el router express

import { Router } from "express";
import perfilControlador from "../controlador/perfilControlador";

class PerfilRuta {

    public rutaAPI: Router;

    constructor() {
        this.rutaAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaAPI.post('/crear', perfilControlador.crear);
        this.rutaAPI.get('/todos', perfilControlador.consulta);
        this.rutaAPI.get('/uno/:codigo', perfilControlador.consultaUno);
        this.rutaAPI.delete('/eliminar/:codigo', perfilControlador.eliminar);
        this.rutaAPI.put('/actualizar/:codigo', perfilControlador.actualizar);
    }

};

const perfilRuta = new PerfilRuta();
export default perfilRuta.rutaAPI;


