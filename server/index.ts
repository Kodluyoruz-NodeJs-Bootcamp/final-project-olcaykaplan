import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {createConnection} from "typeorm";
import api from "./routes"
import "dotenv/config";
import "./controllers/auth/passportGoogle.auth"
import "./controllers/auth/passportFacebook.auth"

createConnection().then(connection => {
    const app = express();
    app.use(express.json());
    app.use(cors({credentials: true, origin: '*'}))
    app.use(cookieParser());
    
    app.use("/api",api)

    const PORT: Number = Number(process.env.PORT) || 5000;
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

}).catch(error => {
    console.log("Error:",error)
})
