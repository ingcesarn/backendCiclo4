import { Response } from "express";
import UsuarioEsquema from "../esquema/UsuarioEsquema";
//se importan las librerias para el cifrado de clave

//import Cifrado from "bcryptjs";
import jwt from "jsonwebtoken";


class UsuarioDao {
  //Creamos una promesa o metodo que saca los usuarios de la BD
  protected static async consultarUsuarios(res: Response): Promise<any> {
    //en esta linea se hace una consulta
    const datos = await UsuarioEsquema.find().sort({ _id: -1 });
    //Se entrega la consulta al cliente
    res.status(200).json(datos);
    //200 quiere decir que todo nos fue bien
  }

  protected static async crearUsuario(correo:any,
    parametros: any,
    res: Response
  ): Promise<any> {
    //en esta line se hace una consulta
    const existe = await UsuarioEsquema.findOne(correo);
    if (existe) {
      res.status(400).json({ respuesta: "El correo ya existe socio" });
    } else {
      const objUsuario = new UsuarioEsquema(parametros);
      objUsuario.save((miError, MiObjeto) => {
        if (miError) {
          res.status(400).json({ respuesta: "No se puede crear socio paila " });
        } else {
          res.status(200).json({
            respuesta: "Usuario creado exitosamente!",
            codigo: MiObjeto._id,
          });
        }
      });
    }
  }

  protected static async eliminarUsuario(
    identificador: any,
    res: Response
  ): Promise<any> {
    //en esta line se hace una consulta
    //const existe = await PerfilEsquema.findById(identificador);
    const existe = await UsuarioEsquema.findById(identificador).exec();
    if (existe) {
      UsuarioEsquema.findByIdAndDelete(
        identificador,
        (miError: any, MiObjeto: any) => {
          if (miError) {
            res
              .status(400)
              .json({ respuesta: "No se puede Eliminar el usuario " });
          } else {
            res
              .status(200)
              .json({
                respuesta: "Breve ya se Elimino todo bien ",
                eliminado: MiObjeto,
              });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "Paila el perfil no existe yuca " });
    }
  }


  protected static async actualizarUsuario(
    identificador: any,parametros:any,
    res: Response
  ): Promise<any> {
    //en esta line se hace una consulta
    //const existe = await PerfilEsquema.findById(identificador);
    const existe = await UsuarioEsquema.findById(identificador).exec();
    if (existe) {
      UsuarioEsquema.findByIdAndUpdate(
        {_id:identificador},
        {$set:parametros},
        (miError: any, MiObjeto: any) => {
          if (miError) {
            res
              .status(400)
              .json({ respuesta: "No se puede Actualizar el Usuario" });
          } else {
            res
              .status(200)
              .json({
                respuesta: "Usuario se actualizo correctamente ",
                antes: MiObjeto,
                despues:parametros
              });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "Paila el perfil no existe" });
    }
  }

}

export default UsuarioDao;
