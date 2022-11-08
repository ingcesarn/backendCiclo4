"use strict";
// Archivo src\dao\UsuarioDao.ts
// Contiene los ejemplos más comunes al consumir servicios utilizando mongoose
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PerfilEsquema_1 = __importDefault(require("../esquema/PerfilEsquema"));
const UsuarioEsquema_1 = __importDefault(require("../esquema/UsuarioEsquema"));
class UsuarioDAO {
    // Iniciar sesión
    // ************************************************************************************
    static iniciarSesion(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const miCorreo = parametros.correoUsuario;
            const miClave = parametros.claveUsuario;
            UsuarioEsquema_1.default.findOne({ correoUsuario: miCorreo }).populate({ path: "codPerfil", select: "nombrePerfil" })
                .exec((miError, objeto) => {
                if (objeto) {
                    const claveCorrecta = bcryptjs_1.default.compareSync(miClave, objeto.claveUsuario);
                    if (claveCorrecta) {
                        const datosVisibles = {
                            codUsuario: objeto._id,
                            correo: miCorreo,
                            perfil: objeto.codPerfil.nombrePerfil
                        };
                        const llavePrivada = String(process.env.SECRETA);
                        const miToken = jsonwebtoken_1.default.sign(datosVisibles, llavePrivada, { expiresIn: 86400 });
                        res.status(200).json({ tokenMintic: miToken });
                    }
                    else {
                        res.status(400).json({ respuesta: "Credenciales incorrectas" });
                    }
                }
                else {
                    res.status(400).json({ respuesta: "Credenciales incorrectas" });
                }
            });
        });
    }
    // ************************************************************************************
    // Cantidad de usuarios x perfil dado
    // ************************************************************************************
    static cantidadUsuariosEnPerfil(identificadorPerfil, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(identificadorPerfil)) {
                const llave = { _id: identificadorPerfil };
                const cantidad = yield UsuarioEsquema_1.default.countDocuments({ codPerfil: llave });
                res.status(200).json({ respuesta: cantidad });
            }
            else {
                res.status(400).json({ respuesta: "Identificador incorrecto" });
            }
        });
    }
    // ************************************************************************************
    // Obtener todos los usuarios con el perfil completo
    // ************************************************************************************
    static obtenerUsuarios(res) {
        return __awaiter(this, void 0, void 0, function* () {
            UsuarioEsquema_1.default.find().sort({ _id: -1 }).populate("codPerfil")
                .exec((miError, objeto) => {
                if (miError) {
                    console.log(miError);
                    res.status(400).json({ respuesta: "Error en la consulta" });
                    //process.exit(-1);
                }
                else {
                    res.status(200).json(objeto);
                }
            });
        });
    }
    // ************************************************************************************
    // Obtener todos los usuarios con un perfil dado y con datos específicos
    // ************************************************************************************
    static obtenerUsuariosPerfil(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(identificador)) {
                const llave = { _id: identificador };
                UsuarioEsquema_1.default.find({ codPerfil: llave }).sort({ _id: -1 })
                    .populate({ path: "codPerfil", select: "nombrePerfil" })
                    .exec((miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: "Error en la consulta" });
                    }
                    else {
                        res.status(200).json(objeto);
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "Identificador incorrecto" });
            }
        });
    }
    // ************************************************************************************
    // Creación de un usuario con un perfil indicado por referencia
    // ************************************************************************************
    static crearUsuario(correo, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validación existencia perfil
            // **************************************
            const nombrePerfilPorDefecto = String(process.env.PERFIL_USUARIO_EXTERNO);
            const jsonPerfil = { nombrePerfil: nombrePerfilPorDefecto };
            const existePerfil = yield PerfilEsquema_1.default.findOne(jsonPerfil).exec();
            if (existePerfil) {
                parametros.codPerfil = existePerfil._id;
            }
            else {
                const objPerfil = new PerfilEsquema_1.default(jsonPerfil);
                objPerfil.save();
                parametros.codPerfil = objPerfil._id;
            }
            // **************************************
            const existe = yield UsuarioEsquema_1.default.findOne(correo).exec();
            if (existe) {
                res.status(400).json({ respuesta: "El correo ya existe" });
            }
            else {
                parametros.claveUsuario = bcryptjs_1.default.hashSync(parametros.claveUsuario, 8);
                const objUsuario = new UsuarioEsquema_1.default(parametros);
                objUsuario.save((miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: 'Error al crear el usuario' });
                    }
                    else {
                        const datosVisibles = {
                            codUsuario: objeto._id,
                            correo: parametros.correoUsuario,
                            perfil: nombrePerfilPorDefecto
                        };
                        const llavePrivada = String(process.env.SECRETA);
                        const miToken = jsonwebtoken_1.default.sign(datosVisibles, llavePrivada, { expiresIn: 86400 });
                        res.status(200).json({ tokenMintic: miToken });
                    }
                });
            }
        });
    }
    // ************************************************************************************
    // Eliminar usuario por identificador
    // ************************************************************************************
    static eliminarUsuario(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield UsuarioEsquema_1.default.findById(identificador).exec();
            if (existe) {
                UsuarioEsquema_1.default.findByIdAndDelete(identificador, (miError, objeto) => {
                    // UsuarioEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                    if (miError) {
                        res.status(400).json({ respuesta: "Error al eliminar el Perfil" });
                    }
                    else {
                        res.status(200).json({ eliminado: objeto });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "El usuario NO existe" });
            }
        });
    }
    // ************************************************************************************
    // actualizar usuario por identificador
    // ************************************************************************************
    static actualizarUsuario(identificador, jsonExterno, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield UsuarioEsquema_1.default.findById(identificador).exec();
            if (existe) {
                UsuarioEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: jsonExterno }, (miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: 'Error al actualizar el usuario, puede que el correo esté repetido' });
                    }
                    else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "El usuario NO existe" });
            }
        });
    }
}
exports.default = UsuarioDAO;
