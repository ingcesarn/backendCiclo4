import { Response } from "express";
import PerfilEsquema from "../esquema/PerfilEsquema";

class PerfilDao {
  //Creamos una promesa o metodo que saca los perfiles de la BD
  protected static async consultarPerfiles(res: Response): Promise<any> {
    //en esta linea se hace una consulta
    const datos = await PerfilEsquema.find().sort({ _id: -1 });
    //Se entrega la consulta al cliente
    res.status(200).json(datos);
    //200 quiere decir que todo nos fue bien
  }

  protected static async crearPerfiles(
    parametros: any,
    res: Response
  ): Promise<any> {
    //en esta line se hace una consulta
    const existe = await PerfilEsquema.findOne(parametros);
    if (existe) {
      res.status(400).json({ respuesta: "El perfil ya existe socio" });
    } else {
      const objPerfil = new PerfilEsquema(parametros);
      objPerfil.save((miError, MiObjeto) => {
        if (miError) {
          res.status(400).json({ respuesta: "No se puede cerar socio paila " });
        } else {
          res.status(200).json({
            respuesta: "Breve ya se creo todo bien ",
            codigo: MiObjeto._id,
          });
        }
      });
    }
  }

  protected static async eliminarPerfil(
    identificador: any,
    res: Response
  ): Promise<any> {
    //en esta line se hace una consulta
    //const existe = await PerfilEsquema.findById(identificador);
    const existe = await PerfilEsquema.findById(identificador).exec();
    if (existe) {
      PerfilEsquema.findByIdAndDelete(
        identificador,
        (miError: any, MiObjeto: any) => {
          if (miError) {
            res
              .status(400)
              .json({ respuesta: "No se puede Eliminar socio paila " });
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


  protected static async actualizarPerfil(
    identificador: any,parametros:any,
    res: Response
  ): Promise<any> {
    //en esta line se hace una consulta
    //const existe = await PerfilEsquema.findById(identificador);
    const existe = await PerfilEsquema.findById(identificador).exec();
    if (existe) {
      PerfilEsquema.findByIdAndUpdate(
        {_id:identificador},
        {$set:parametros},
        (miError: any, MiObjeto: any) => {
          if (miError) {
            res
              .status(400)
              .json({ respuesta: "No se puede Actualizar socio paila " });
          } else {
            res
              .status(200)
              .json({
                respuesta: "Breve ya se Actualizo todo bien ",
                antes: MiObjeto,
                despues:parametros
              });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "Paila el perfil no existe yuca " });
    }
  }

}

export default PerfilDao;
