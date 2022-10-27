export class PerfilEntidad {
  
  public nombrePerfil: string;
  public estadoPerfil: number;

//nomp=nombre perfil
//estp=estado perfil

  constructor(nomp: string, estp:number) {
  this.nombrePerfil = nomp;
  this.estadoPerfil = estp;
  }
}

export default PerfilEntidad;
