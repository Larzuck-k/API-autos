const express = require("express");
const nodemon = require("nodemon");
const cors = require("cors");


//Crea la api denominada app, llamando el método constructor de la libreria express
const app = express();
//Asigno el puerto para la api
const port = 2000
//Inyectamos cors al proyecto
app.use(cors());




app.use("/",require("./modules/vehicle"))



app.listen(port,()=>{
    console.log("API encendida en el puerto: "+ port)
})

