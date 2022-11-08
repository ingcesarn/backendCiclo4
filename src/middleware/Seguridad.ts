//este archivo sirve para blpquear el acceso a quien no tenga token
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class Seguridad {
  //Request=recibe informacion
  //Response= envia informacion     NextFunc= continua el codigo
  public analizarToken(req: Request, res: Response, next: NextFunction) {
    //la linea 13 verifica si tienes el Token
    if (req.headers.authorization) {
      try {
        const miLlavecita = String(process.env.SECRETA);

        //Ahora vamos a recibir el token
        //El split es un corte que se realiza en la cadena de string de acuerdo al 
        //parametro que se le indique para este caso es el espacio:
        const tokenRecibido = req.headers.authorization?.split(" ")[1] as string;
        const infoUsuario = jwt.verify(tokenRecibido, miLlavecita);
        req.body.datosUarios = infoUsuario;
        next();
      } catch (error) {
        res.status(401).json({ respuesta: "El token no es correcto.." });
      }
    } else {
      res.status(401).json({ respuesta: "No posee un Token" });
    }
  }
}
const seguridad = new Seguridad();
export default seguridad;
