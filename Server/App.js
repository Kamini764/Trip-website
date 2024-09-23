const express = require("express");
const mongoose=require("../Server/Database/Database")
const cors = require("cors");
const router = require("../Server/Router/Router");
const app = express();
const port = 8000;


app.use(cors());
app.use(express.json()); // Corrected


app.use("/api", router); // Register router

app.listen(port, () => {
  console.log("Server is running on port", port);
});
