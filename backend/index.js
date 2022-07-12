const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const DatabaseConncetion = require("./config/DatabaseConnection");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

dotenv.config();
DatabaseConncetion();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.json("Hello world.");
});

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening at port http://localhost:${process.env.PORT}`
  );
});
