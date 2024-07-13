// const express = require("express");
// require("dotenv").config();
// const app = express();
// const router = require("./routes/router");
// const cors = require("cors");

// const port = 4000;

// app.listen(port, ()=>{
//     console.log("hello");
// })
// app.use(cors());
// app.use(router);
// app.use(express.json());// to get the data in json form

// app.get('/',(req,res)=>{
//     res.send("hello server")
// })
const express = require("express");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/routers");

const app = express();
dotenv.config();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, 
  optionSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());
app.use("/email", emailRoutes);
app.get("/", (req, res) => {
  res.send("Hello");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(` port ${PORT}`);
});