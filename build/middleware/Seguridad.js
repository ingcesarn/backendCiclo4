"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//este archivo sirve para blpquear el acceso a quien no tenga token
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Seguridad {
    //Request=recibe informacion
    //Response= envia informacion     NextFunc= continua el codigo
    analizarToken(req, res, next) {
        var _a;
        //la linea 13 verifica si tienes el Token
        if (req.headers.authorization) {
            try {
                const miLlavecita = String(process.env.SECRETA);
                //Ahora vamos a recibir el token
                //El split es un corte que se realiza en la cadena de string de acuerdo al 
                //parametro que se le indique para este caso es el espacio:
                const tokenRecibido = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const infoUsuario = jsonwebtoken_1.default.verify(tokenRecibido, miLlavecita);
                req.body.datosUarios = infoUsuario;
                next();
            }
            catch (error) {
                res.status(401).json({ respuesta: "El token no es correcto.." });
            }
        }
        else {
            res.status(401).json({ respuesta: "No posee un Token" });
        }
    }
}
const seguridad = new Seguridad();
exports.default = seguridad;
