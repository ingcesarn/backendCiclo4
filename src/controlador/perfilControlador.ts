import { Request, Response } from "express";

//Importamos PerfilDao.ts
import PerfilDao from "../dao/PerfilDao";

class PerfilControlador extends PerfilDao {
  //se crea un metodo publico
  public consulta(req: Request, res: Response) {
    PerfilControlador.consultarPerfiles(res);
  };

  public crear (req:Request,res:Response){
    PerfilControlador.crearPerfiles(req.body,res);
};

public eliminar(req:Request,res:Response){
  PerfilControlador.eliminarPerfil(req.params.codiguito,res);
};

public actualizar(req:Request,res:Response){
  PerfilControlador.actualizarPerfil(req.params.codiguito,req.body,res);
};

}

//Aqui se exporta la clase a una variable tipo objeto y reutiliza la variable
const perfilControlador = new PerfilControlador();
export default perfilControlador;
