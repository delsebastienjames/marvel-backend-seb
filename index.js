const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

// Importer les routes
const userRoutes = require("./routes/user"); // fichier routes user.js
app.use(userRoutes);

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
    );
    //console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(400).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started !!!");
});
