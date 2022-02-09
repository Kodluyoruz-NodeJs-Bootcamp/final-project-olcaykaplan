import {Request, Response} from "express"
import { User } from "../entities/user.entity"
import { IUser } from "./auth/passportGoogle.auth"

export const CreateUser = async (req: Request, res: Response) => {
   try {
    console.log("req.body: ",req.body)
    const user = await User.save({
        ...req.body
    })

    res.send({user})
   } catch (error) {
       console.log("error: ",error)
   }
}

export const AuthenticatedUser = async (req: Request, res: Response) => {
    const {name, surname, email, picture} = req["user"] as IUser    
    res.send({user: {name, surname, email, picture }});
}

export const Logout = async () => {
    
}