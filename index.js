import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routes/routes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("DB Connected"))
    .catch((err)=>console.log(err));

const corsoptions = {
    //to allow requests from client
    origin: [
        "http://localhost:5173",
        "https://joy-junction-blue.vercel.app/",
    ],
};

app.get('/', (req, res)=>{
    res.status(200).send("Server is up and running!");
});

app.use(cors(corsoptions));
app.use(express.json());
app.use("/api", uploadRoutes);


app.listen(PORT, ()=>{
    console.log("Server connected");
});