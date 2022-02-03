import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {createConnection} from "typeorm";
import "dotenv/config";

createConnection().then(connection => {
    const app = express();
    app.use(express.json());
    app.use(cors({credentials: true, origin: '*'}))
    app.use(cookieParser());

    const PORT: Number = Number(process.env.PORT) || 5000;
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
}).catch(error => {
    console.log("Error:",error)
})
