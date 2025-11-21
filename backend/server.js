import express from "express";
import trainRoute from "./routes/trainRoute.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use("/api", trainRoute);

app.listen(5000, () => {
  console.log("Server running on 5000");
});
