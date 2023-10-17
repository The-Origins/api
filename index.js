require("dotenv").config();
const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(methodOverride("_method"));
app.use(require("./routes"));

require("./config/database");

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port:${process.env.PORT}`)
);
