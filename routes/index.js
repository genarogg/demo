var express = require("express");
const db = require("../database");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Datos del Estudiante",
    nombre: "Jesús",
    apellido: "Ramírez",
    cedula: "30.039.073",
    seccion: "1",
  });
});

router.post("/", function (req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let comment = req.body.comment;
  let date = new Date(); // @todo falta formatear la fecha
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress; // @todo falta formatear la ip

  const myIP = ip.split(",");

  /* axios.get(`http://ip-api.com/json/190.120.252.74?fields=country`).then((res) => { */ //esta linea es para
                                                                                          //probarlo en local
    axios.get(`http://ip-api.com/json/${myIP[0]}`).then((res) => {
    
    const pais = res.data.country;

    console.log({ name, email, comment, date, ip, pais });
  
    db.insert(name, email, comment, date, ip, pais);
  });

/*   res.redirect("/"); */
});

router.get("/contactos", function (req, res, next) {
  db.select(function (rows) {
    console.log(rows);
  });
  res.send("ok");
});

module.exports = router;
