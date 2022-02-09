import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken';
import { IUser } from '../controllers/auth/passportGoogle.auth';
const isUserAuthenticated = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.jwt;
    const data: any = token ?  await verify(token, 'secret') : false
   if (data) {
     req["user"]= data.user;
     next();
   } else {
     console.log("ELSE DÜŞTÜ")
     res.status(401).send("You must login first!");
   }
 };
 export default isUserAuthenticated
 
