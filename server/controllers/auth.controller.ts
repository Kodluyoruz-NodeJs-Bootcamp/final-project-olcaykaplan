import {Request, Response} from "express"
import { User } from "../entities/user.entity"
import { IUser } from "./auth/passportGoogle.auth"


export const AuthenticatedUser = async (req: Request, res: Response) => {
    const {id, name, surname, email, picture} = req["user"] as IUser    
    res.send({user: {id, name, surname, email, picture }});
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 15 });
    res.status(200).send({ error: false });
}