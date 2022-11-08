"use strict";
//importamos el router express
//Archivo: src\ruta\PerfilRuta.ts
//Contiene los endPoints que llaman los controladores
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioControlador_1 = __importDefault(require("../controlador/usuarioControlador"));
"../controlador/UsuarioControlador";
class UsuarioRuta {
    constructor() {
        this.rutaAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaAPI.get('/todos', usuarioControlador_1.default.consulta);
        this.rutaAPI.get('/todos/:codPerfil', usuarioControlador_1.default.consultPerfil);
        this.rutaAPI.get('/cantxperfil/:codPerfil', usuarioControlador_1.default.cantidadEnPerfil);
        this.rutaAPI.post('/crear', usuarioControlador_1.default.crear);
        this.rutaAPI.post('/iniciar', usuarioControlador_1.default.iniciar);
        this.rutaAPI.delete('/eliminar/:codUsuario', usuarioControlador_1.default.eliminar);
        this.rutaAPI.put('/actualizar/:codUsuario', usuarioControlador_1.default.actualizar);
    }
}
;
const usuarioRuta = new UsuarioRuta();
exports.default = usuarioRuta.rutaAPI;
