import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import ConexionDB from "./ConexionDB";


//
import apiPerfilRuta from "../ruta/PerfilRuta";
import apiUsuarioRuta from "../ruta/UsuarioRuta"
import seguridad from "../middleware/Seguridad";
class Servidor{
    //definimos una variable para configurar todo lo que usamos en la api
    public app: express.Application;
    //Creamos el constructor
    constructor(){
    //primer paso del constructor
    //habilitar proyecto para usar variables de ambiente
    dotenv.config({path:"variables.env"});
    //Conectarse a mongo
    ConexionDB();
    this.app = express();
    this.iniciarconfig(); //Cargar información
    this.iniciarRutas(); //Cargar Rutas
    };

    //Creamos metodo iniciar configuracion 
    public iniciarconfig(){
        //tu aplicacion que es express va a tener variables de entorno
        //definimos la variable para configuracion de todo lo que usamos en el api
        this.app.set("PORT",process.env.PORT);
        //Bloquear y permitir acceso del Backend
        this.app.use(cors());
        //Permite que los mensajes salgan en la consola de desarrollo
        this.app.use(morgan("dev"));
        //Permite subir archivos de hasta 50MB
        this.app.use(express.json({limit:"50MB"}));
        //Sirve para recibir parametros o consultas
        this.app.use(express.urlencoded({extended:true}));
    };

    //Creamos metodo iniciarRutas
    public iniciarRutas(){
        //Le vamos a agregar el parametro seguridad.analizarToken
        this.app.use("/api/perfil",seguridad.analizarToken, apiPerfilRuta);
        //
        this.app.use("/api/Usuario",apiUsuarioRuta);
    };
//Otro metodo puede ser el mas importante
//Metodo para iniciar el servidor:
    public iniciarServidor(){
        this.app.listen(this.app.get("PORT"), ()=>{
            console.log("Backend listo en el puerto",this.app.get("PORT"));
        });
    };
    //Sirve para cualquier backend en node

};

export default Servidor;//Esta clase permite usar la clase de forma global
