"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Seguridad {
    //Request=recibe informacion    
    //Response= envia informacion     NextFunc= continua el codigo
    analizarToken(req, res, next) {
        //la linea 13 verifica si tienes el Token 
        if (req.headers.authorization) {
        }
        else {
            res.status(401).json({ respuesta: "No posee un ID" });
        }
    }
    ;
}
const seguridad = new Seguridad();
exports.default = seguridad;
