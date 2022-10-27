import { model, Schema, Types } from "mongoose";
import UsuarioEntidad from "../entidad/UsuarioEntidad";

//Aqui se colocan los nombres de las columnas de la tabla o coleccion.
//En esta linea amarramos el perfil_esquema con el perfil_entidad.

const UsuarioEsquema = new Schema<UsuarioEntidad>(
  {
    nombreUsuario: { type: String, required: true, trim: true },
    estadoUsuario: {type: Number, enum:[1,2,3], default:1},
    correoUsuario:{type:String, unique:true, required:true, lowercase:true},
    claveUsuario:{type:String, required:true},
    fechaCreacionUsuario:{type: Date, default: Date.now()},
    codPerfil: {type:Types.ObjectId, ref:"Perfil", required: true}
  },
  { versionKey: false }
);

export default model("Usuario", UsuarioEsquema, "Usuario");
