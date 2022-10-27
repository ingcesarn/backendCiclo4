"use strict";
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
const UsuarioEsquema_1 = __importDefault(require("../esquema/UsuarioEsquema"));
class UsuarioDao {
    //Creamos una promesa o metodo que saca los usuarios de la BD
    static consultarUsuarios(res) {
        return __awaiter(this, void 0, void 0, function* () {
            //en esta linea se hace una consulta
            const datos = yield UsuarioEsquema_1.default.find().sort({ _id: -1 });
            //Se entrega la consulta al cliente
            res.status(200).json(datos);
            //200 quiere decir que todo nos fue bien
        });
    }
    static crearUsuario(correo, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //en esta line se hace una consulta
            const existe = yield UsuarioEsquema_1.default.findOne(correo);
            if (existe) {
                res.status(400).json({ respuesta: "El correo ya existe socio" });
            }
            else {
                const objUsuario = new UsuarioEsquema_1.default(parametros);
                objUsuario.save((miError, MiObjeto) => {
                    if (miError) {
                        res.status(400).json({ respuesta: "No se puede crear socio paila " });
                    }
                    else {
                        res.status(200).json({
                            respuesta: "Usuario creado exitosamente!",
                            codigo: MiObjeto._id,
                        });
                    }
                });
            }
        });
    }
    static eliminarUsuario(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //en esta line se hace una consulta
            //const existe = await PerfilEsquema.findById(identificador);
            const existe = yield UsuarioEsquema_1.default.findById(identificador).exec();
            if (existe) {
                UsuarioEsquema_1.default.findByIdAndDelete(identificador, (miError, MiObjeto) => {
                    if (miError) {
                        res
                            .status(400)
                            .json({ respuesta: "No se puede Eliminar el usuario " });
                    }
                    else {
                        res
                            .status(200)
                            .json({
                            respuesta: "Breve ya se Elimino todo bien ",
                            eliminado: MiObjeto,
                        });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "Paila el perfil no existe yuca " });
            }
        });
    }
    static actualizarUsuario(identificador, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //en esta line se hace una consulta
            //const existe = await PerfilEsquema.findById(identificador);
            const existe = yield UsuarioEsquema_1.default.findById(identificador).exec();
            if (existe) {
                UsuarioEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: parametros }, (miError, MiObjeto) => {
                    if (miError) {
                        res
                            .status(400)
                            .json({ respuesta: "No se puede Actualizar el Usuario" });
                    }
                    else {
                        res
                            .status(200)
                            .json({
                            respuesta: "Usuario se actualizo correctamente ",
                            antes: MiObjeto,
                            despues: parametros
                        });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "Paila el perfil no existe" });
            }
        });
    }
}
exports.default = UsuarioDao;
