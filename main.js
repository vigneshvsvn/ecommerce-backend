const express = require("express");
require("dotenv").config();
const productRouter = require("./router/ProductRouter")
const orderRouter = require("./router/OrderRouter");
const authRouter = require("./router/authRouter");
const cors=require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/auth", authRouter);

const dbConnection = require("./config/dbConnection.config");
dbConnection();
app.listen(process.env.port, () => {
    console.log(`${process.env.port} server running successfully`)
})