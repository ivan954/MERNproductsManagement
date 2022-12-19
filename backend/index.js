import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import Router from "./routes/productRoutes.js";
import dotenv from "dotenv";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("api is running...");
// });

app.use("/api/products", Router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server runing in port " + PORT));
