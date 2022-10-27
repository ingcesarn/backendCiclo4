"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importamos PerfilDao.ts
const UsuarioDao_1 = __importDefault(require("../dao/UsuarioDao"));
class UsuarioControlador extends UsuarioDao_1.default {
    //se crea un metodo publico
    consulta(req, res) {
        UsuarioControlador.consultarUsuarios(res);
    }
    ;
    crear(req, res) {
        const elCorreo = { correoUsuario: req.body.correoUsuario };
        UsuarioControlador.crearUsuario(elCorreo, req.body, res);
    }
    ;
    eliminar(req, res) {
        UsuarioControlador.eliminarUsuario(req.params.codiguito, res);
    }
    ;
    actualizar(req, res) {
        UsuarioControlador.actualizarUsuario(req.params.codiguito, req.body, res);
    }
    ;
}
//Aqui se exporta la clase a una variable tipo objeto y reutiliza la variable
const usuarioControlador = new UsuarioControlador();
exports.default = usuarioControlador;