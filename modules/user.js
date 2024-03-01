//Microservicio para crear CRUD de las personas
const conexion = require("./bdata");
const express = require("express");
const bcrypt = require("bcrypt");
const user = express.Router();


//Desarrollo del CRUD

//Consultar todos

user.get("/user/listing", (req, res) => {
    conexion.query("SELECT * FROM usuarios", (error, datos) => {
   
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




  user.post("/user/create", (req, res) => {
  const salt = 10;
    let frmdata = {
      
      name: req.query.name,
      lastname: req.query.lastname,
      position: req.query.position,
      email: req.query.email,
      password: bcrypt.hashSync(req.query.password +"",salt),
      photo: req.query.photo,
    };
  console.log(frmdata)
    conexion.query("INSERT INTO usuarios SET ?", frmdata, (error, data) => {
      try {
        res.status(200).send({
          status: "ok",
          mensaje: "Operación exitosa",
        });
      } catch (error) {
        console.log(error);
  
        res.status(404).send({
          status: "error",
          mensaje: "Error en la insercion",
          error: error.message,
        });
      }
    });
  });


  user.post("/user/login", (req, res) => {
      const salt = 10;
    //datos de la peticion (body)
    let email = req.query.email;
    let password =  bcrypt.hashSync(req.query.password +"",salt)  ;
  
    //validamos que la data esté completa
    if (!email || !password) {
      res.status(400).send({
        consulta: "error",
        mensaje: "faltan datos por enviar del formulario ! ",
      });
    }
    // buscar en la bd el usuario  y validar
   
   
   
   
    conexion.query(
      "SELECT name, lastname, email, password FROM usuarios WHERE email like '"+ email +"'",
    
      (error, consulta) => {
        let password
        let email
        let name
        let lastname
        consulta.forEach((value,key) => {
        
           password= value.password
           email= value.email
           name= value.name
          lastname= value.lastname
        })

        if (email == null) {
          res.status(400).send({
            status: "error",
            mensaje: "Usuario no existe en la BD",
          });
        }
   
       console.log(password)
       console.log( req.query.password)
       
        let pwd = bcrypt.compareSync( req.query.password,password);
  
        if (!pwd) {
          res.status(400).send({
            status: "error",
            mensaje: "Pwd Incorrecto !",
          });
        } else {
          res.status(200).send({
            consulta: "ok",
            mensaje: "Ingreso exitoso al sistema!",
            user: name + " " + lastname,
            email: email,
          });
        }
      }
    );
  });



  
module.exports = user;
