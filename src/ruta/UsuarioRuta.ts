//importamos el router express
import { Router } from "express";
import usuarioControlador from "../controlador/usuarioControlador";

class UsuarioRuta {
    //definimos la variable tipo Router
  public rutaApi: Router;
  //inicializamos la variable rutaApi
  constructor() {
    this.rutaApi = Router();
    this.configurarRutas();//Cuando se llama a un metodo se debe usar (); al final
  };

   public configurarRutas(){
    //Creamos un metodo o endpoint de tipo get
    this.rutaApi.get("/listado",usuarioControlador.consulta);
     //Creamos un metodo o endpoint de tipo post
    this.rutaApi.post("/crear",usuarioControlador.crear);
    //Creamos un metodo o endpoint de tipo delete
    this.rutaApi.delete("/eliminar/:codiguito",usuarioControlador.eliminar);
    //Creamos un metodo o endpoint de tipo put
    this.rutaApi.put("/actualizar/:codiguito",usuarioControlador.actualizar);
  };
  
}

const usuarioRuta = new UsuarioRuta();
//aqui exportamos una propiedad de tipo Router para tener acceso a todos los enpoint
export default usuarioRuta.rutaApi;
