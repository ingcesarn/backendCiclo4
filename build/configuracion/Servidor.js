"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const ConexionDB_1 = __importDefault(require("./ConexionDB"));
//
const PerfilRuta_1 = __importDefault(require("../ruta/PerfilRuta"));
const UsuarioRuta_1 = __importDefault(require("../ruta/UsuarioRuta"));
const Seguridad_1 = __importDefault(require("../middleware/Seguridad"));
class Servidor {
    //Creamos el constructor
    constructor() {
        //primer paso del constructor
        //habilitar proyecto para usar variables de ambiente
        dotenv_1.default.config({ path: "variables.env" });
        //Conectarse a mongo
        (0, ConexionDB_1.default)();
        this.app = (0, express_1.default)();
        this.iniciarconfig(); //Cargar información
        this.iniciarRutas(); //Cargar Rutas
    }
    ;
    //Creamos metodo iniciar configuracion 
    iniciarconfig() {
        //tu aplicacion que es express va a tener variables de entorno
        //definimos la variable para configuracion de todo lo que usamos en el api
        this.app.set("PORT", process.env.PORT);
        //Bloquear y permitir acceso del Backend
        this.app.use((0, cors_1.default)());
        //Permite que los mensajes salgan en la consola de desarrollo
        this.app.use((0, morgan_1.default)("dev"));
        //Permite subir archivos de hasta 50MB
        this.app.use(express_1.default.json({ limit: "50MB" }));
        //Sirve para recibir parametros o consultas
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    ;
    //Creamos metodo iniciarRutas
    iniciarRutas() {
        //Le vamos a agregar el parametro seguridad.analizarToken
        this.app.use("/api/perfil", Seguridad_1.default.analizarToken, PerfilRuta_1.default);
        //
        this.app.use("/api/Usuario", UsuarioRuta_1.default);
    }
    ;
    //Otro metodo puede ser el mas importante
    //Metodo para iniciar el servidor:
    iniciarServidor() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Backend listo en el puerto", this.app.get("PORT"));
        });
    }
    ;
}
;
exports.default = Servidor; //Esta clase permite usar la clase de forma global
