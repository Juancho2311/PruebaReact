const express = require("express");
const app = express();
const port = 8080;
const morgan = require("morgan");
const { mysqlConn } = require("./database-MySQL");
const cors = require("cors");

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.use(require("./routes/routes"));

//Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});
