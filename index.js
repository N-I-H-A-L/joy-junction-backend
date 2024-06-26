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
        "https://joy-junction-blue.vercel.app",
        "https://joyjunctiongamezone.com",
    ],
    credentials: true,
};

app.use(cors(corsoptions));

app.get('/', (req, res)=>{
    res.status(200).send("Server is up and running!");
});


app.use((req, res, next) => {
    console.log("Request Origin:", req.headers.origin);
    next();
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());
app.use("/api", uploadRoutes);


app.listen(PORT, ()=>{
    console.log("Server connected");
});