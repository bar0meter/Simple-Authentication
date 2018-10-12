const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const router = require("./router");

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

mongoose
  .connect("mongodb://localhost:27017/Autherntication_demo")
  .then(() => console.log("Connected to Database"))
  .catch(err => console.error("Error connecting to database : ", err));

const PORT = process.env.PORT || 8000;

app.listen(PORT, err => {
  console.log("Server running on PORT : ", PORT);
  if (err) console.error("Error : ", err);
});
