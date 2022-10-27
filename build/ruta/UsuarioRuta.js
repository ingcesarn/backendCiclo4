"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importamos el router express
const express_1 = require("express");
const usuarioControlador_1 = __importDefault(require("../controlador/usuarioControlador"));
class UsuarioRuta {
    //inicializamos la variable rutaApi
    constructor() {
        this.rutaApi = (0, express_1.Router)();
        this.configurarRutas(); //Cuando se llama a un metodo se debe usar (); al final
    }
    ;
    configurarRutas() {
        //Creamos un metodo o endpoint de tipo get
        this.rutaApi.get("/listado", usuarioControlador_1.default.consulta);
        //Creamos un metodo o endpoint de tipo post
        this.rutaApi.post("/crear", usuarioControlador_1.default.crear);
        //Creamos un metodo o endpoint de tipo delete
        this.rutaApi.delete("/eliminar/:codiguito", usuarioControlador_1.default.eliminar);
        //Creamos un metodo o endpoint de tipo put
        this.rutaApi.put("/actualizar/:codiguito", usuarioControlador_1.default.actualizar);
    }
    ;
}
const usuarioRuta = new UsuarioRuta();
//aqui exportamos una propiedad de tipo Router para tener acceso a todos los enpoint
exports.default = usuarioRuta.rutaApi;
