//Microservicio para crear CRUD de las personas
const conexion = require("./bdata");
const EXPRESSJS = require("express");
const vehicle = EXPRESSJS.Router();


//Desarrollo del CRUD

//Consultar todos

vehicle.get("/vehicle/listing", (req, res) => {
    conexion.query("SELECT * FROM vehiculo", (error, datos) => {
   
      try {
    res.status(200).send(datos);
      }
        catch (err) {
          res.status(404).send({
           codigo: "No es posible ingresar a la base de datos",
            id: error.code,
            mensaje: error.message
            
                })
        }

    });
  });



  
module.exports = vehicle;
