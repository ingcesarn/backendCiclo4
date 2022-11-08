"use strict";
//importamos el router express
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perfilControlador_1 = __importDefault(require("../controlador/perfilControlador"));
class PerfilRuta {
    constructor() {
        this.rutaAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaAPI.post('/crear', perfilControlador_1.default.crear);
        this.rutaAPI.get('/todos', perfilControlador_1.default.consulta);
        this.rutaAPI.get('/uno/:codigo', perfilControlador_1.default.consultaUno);
        this.rutaAPI.delete('/eliminar/:codigo', perfilControlador_1.default.eliminar);
        this.rutaAPI.put('/actualizar/:codigo', perfilControlador_1.default.actualizar);
    }
}
;
const perfilRuta = new PerfilRuta();
exports.default = perfilRuta.rutaAPI;
