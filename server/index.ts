import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import api from "./routes";
import "dotenv/config";
import "./controllers/auth/passportGoogle.auth";
import "./controllers/auth/passportFacebook.auth";
import passport from "passport";

createConnection()
  .then((connection) => {
    const app = express();
    app.use(express.json());
    app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://movies-final.netlify.app"] }));
    app.use(cookieParser());

    app.use("/api", api);
    app.use(require('express-session')({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());


    const PORT: Number = Number(process.env.PORT) || 5000;
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
    app.get("/", (req, res) => {
      res.send("Hello World")
    })
    
    
  })
  .catch((error) => {
    console.log("Error:", error);
  });
