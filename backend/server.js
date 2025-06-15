const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Authroute = require("./routes/Auth");
const Fileroute = require("./routes/Fileroute");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // keep this AFTER file upload routes, or fine for JSON routes

app.use("/api/auth", Authroute);
app.use("/api/files", Fileroute); // your multer-based file route

mongoose.connect(process.env.MON_URI)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    console.error("mongodb error", err);
  });

app.get("/", (req, res) => {
  res.send("server is running");
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
