"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConexionDB = () => {
    const URL = String(process.env.DB_MONGO);
    (0, mongoose_1.connect)(URL)
        .then(() => {
        console.log("Estas conectado a mongoDB", process.env.DB_MONGO);
    })
        .catch((miError) => {
        console.log("No encuentro a mongo", miError);
    });
};
exports.default = ConexionDB;
