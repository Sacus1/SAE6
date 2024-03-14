const express = require("express");
const cors = require("cors");
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
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
