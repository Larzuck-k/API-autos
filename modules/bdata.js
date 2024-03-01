//modulo que gestiona la conexión con la base de datos

const mysql = require("mysql2");

//Cadena de conexión

const conexion = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'bd_autos'
  });

  conexion.connect((error)=>{

    if(error){
        console.log(error)
        //throw "Error en la conexión en la base de datos"
    }else{
        console.log("Conexión con éxito")
    }

  })

  module.exports = conexion