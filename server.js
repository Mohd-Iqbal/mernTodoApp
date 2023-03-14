import dotenv from"dotenv"
dotenv.config()
import express from "express"
const PORT = process.env.PORT
const db = process.env.DATABASE
import winston from "winston"
import morgan from "morgan"
import cookieParser from "cookie-parser"
// import cors from "cors"
import compression from "compression"
import helmet from "helmet"
import mongoose from "mongoose"
import path from "path"
import users from "./Routes/signUpRoutes.js"
import login from "./Routes/loginRoute.js"
import profile from "./Routes/profileRoute.js"
import todo from "./Routes/todoRoutes.js"
import logging from "./logging.js"
logging()
const app = express()
app.use(helmet())
app.use(cookieParser())
app.use(morgan("tiny"))
// app.options('*', (req, res) => {
//     res.set('Access-Control-Allow-Origin', 'https://iqbalplanyourday.netlify.app');
//     res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.set('Access-Control-Allow-Credentials', 'true');
//     res.status(204).end();
//   });

// app.use(cors({
//     // origin: "http://localhost:5173",
//     origin: "https://iqbalplanyourday.netlify.app",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials:true,
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     exposedHeaders: ['Access-Control-Allow-Private-Network'],
// }))

app.use(express.json())
app.use(compression())
app.use("/api/signup",users)
app.use("/api/login",login)
app.use("/api/profile",profile)
app.use("/api/todo",todo)

mongoose.set('strictQuery', true);
mongoose.connect(db)
.then(()=>{winston.info("Connected to mongodb")})


const __dirname = path.resolve()
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "//build")));
    app.get("*", (req,res) => {
        console.log(path.resolve(__dirname,"build", "index.html"))
     res.sendFile(path.resolve(__dirname,"build", "index.html"))
    }) 
}

app.listen(PORT,()=>{
    winston.info(`Server listening at ${PORT}`)
})