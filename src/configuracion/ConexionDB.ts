import { connect } from "mongoose";

const ConexionDB = () => {
  const URL = String(process.env.DB_MONGO);
  connect(URL)
    .then(()=>{
        console.log("Estas conectado a mongoDB", process.env.DB_MONGO);
    })
    .catch((miError) => {
      console.log("No encuentro a mongo", miError);
    });
};

export default ConexionDB;
