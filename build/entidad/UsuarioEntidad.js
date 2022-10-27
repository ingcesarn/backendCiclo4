"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuarioEntidad {
    //nomu=nombre usuario   coru=correo_usuario
    //fecu=FechaCreacionUsuario    estu=estado usuario
    //clau=calve usuario    codp=Codigo_del_Perfil_asignado a usuario
    constructor(nomu, estu, coru, clau, fecu, codp) {
        this.nombreUsuario = nomu;
        this.estadoUsuario = estu;
        this.correoUsuario = coru;
        this.claveUsuario = clau;
        this.fechaCreacionUsuario = fecu;
        this.codPerfil = codp;
    }
}
exports.default = UsuarioEntidad;
