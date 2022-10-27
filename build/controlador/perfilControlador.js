"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importamos PerfilDao.ts
const PerfilDao_1 = __importDefault(require("../dao/PerfilDao"));
class PerfilControlador extends PerfilDao_1.default {
    //se crea un metodo publico
    consulta(req, res) {
        PerfilControlador.consultarPerfiles(res);
    }
    ;
    crear(req, res) {
        PerfilControlador.crearPerfiles(req.body, res);
    }
    ;
    eliminar(req, res) {
        PerfilControlador.eliminarPerfil(req.params.codiguito, res);
    }
    ;
    actualizar(req, res) {
        PerfilControlador.actualizarPerfil(req.params.codiguito, req.body, res);
    }
    ;
}
//Aqui se exporta la clase a una variable tipo objeto y reutiliza la variable
const perfilControlador = new PerfilControlador();
exports.default = perfilControlador;
