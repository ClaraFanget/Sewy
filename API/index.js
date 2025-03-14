const express = require("express");
const mongoose = require("mongoose");
const Utilisateur = require("./Models/utilisateur.model.js");
const utilisateurRoute = require("./Routes/utilisateurs.route.js");
const app = express();
//middleware
app.use(express.urlencoded({ extended: true })); //permet de remplir la BDD avec form et pas seulement JSON

app.use(express.json());

//routes
app.use("/api/utilisateurs", utilisateurRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API test");
});

mongoose
  .connect(
    "mongodb+srv://cfanget:LEzCm7AnSXWr6xMU@sewy.5bsji.mongodb.net/Sewy?retryWrites=true&w=majority&appName=Sewy"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => console.log("Sever Started"));
  })
  .catch(() => {
    console.log("Connection failed!");
  });
