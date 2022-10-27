import { Request, Response } from "express";

//Importamos PerfilDao.ts
import UsuarioDao from "../dao/UsuarioDao";

class UsuarioControlador extends UsuarioDao {
  //se crea un metodo publico
  public consulta (req: Request, res: Response) {
    UsuarioControlador.consultarUsuarios(res);
  };

  public crear (req:Request,res:Response){
    const elCorreo = {correoUsuario:req.body.correoUsuario};
    UsuarioControlador.crearUsuario(elCorreo,req.body,res);
};

public eliminar(req:Request,res:Response){
  UsuarioControlador.eliminarUsuario(req.params.codiguito,res);
};

public actualizar(req:Request,res:Response){
  UsuarioControlador.actualizarUsuario(req.params.codiguito,req.body,res);
};

}

//Aqui se exporta la clase a una variable tipo objeto y reutiliza la variable
const usuarioControlador = new UsuarioControlador();
export default usuarioControlador;
