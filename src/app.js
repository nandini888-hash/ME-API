import express from "express"

import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}))
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



import profileRouter from './routes/profile.routes.js'
// import queryRouter from "./routes/query.routes.js";
// routes declaration
app.use("/api/v1/profile", profileRouter )
// app.use("/api/v1",  queryRouter)

export {app}