const express = require("express");
const cors = require("cors");
var fs = require("fs");
var https = require("https");
const corsOptions = {
  //origin: "https://localhost:5173/",
  origin: "*",
  method: ["POST", "GET", "PUT", "DELETE"],
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded

app.use(express.static("public"));

const validationRouter = require("./routes/validation");
const qrcodeRouter = require("./routes/qrcode");
app.use("/validation", validationRouter);
app.use("/qrcode", qrcodeRouter);
https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(3000, function () {
    console.log(
      "app listening on port 3000! Go to https://localhost:3000/"
    );
  });