import { PerfilEntidad } from "./PerfilEntidad";
class UsuarioEntidad {
  public nombreUsuario: string;
  public estadoUsuario: number;
  public correoUsuario: string;
  public claveUsuario: string;
  public fechaCreacionUsuario: Date;
  public codPerfil: PerfilEntidad;

  //nomu=nombre usuario   coru=correo_usuario
  //fecu=FechaCreacionUsuario    estu=estado usuario
  //clau=calve usuario    codp=Codigo_del_Perfil_asignado a usuario
  constructor(
    nomu: string,estu: number,coru: string,
    clau: string,fecu: Date,codp: PerfilEntidad) {
    this.nombreUsuario = nomu;
    this.estadoUsuario = estu;
    this.correoUsuario = coru;
    this.claveUsuario = clau;
    this.fechaCreacionUsuario = fecu;
    this.codPerfil = codp;
  }
}

export default UsuarioEntidad;
