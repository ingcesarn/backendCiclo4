
//este archivo sirve para blpquear el acceso a quien no tenga token
//o si lo tiene dejar ingresar
//si es chimbo lo mandan a la poli
//token
import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";


class Seguridad {
    //Request=recibe informacion    
    //Response= envia informacion     NextFunc= continua el codigo
    public analizarToken(req: Request, res: Response, next: NextFunction) {
        //la linea 13 verifica si tienes el Token 
        if (req.headers.authorization) {

        } else {
            res.status(401).json({respuesta:"No posee un ID"});
        }

    };

}


const seguridad = new Seguridad();
export default seguridad;
