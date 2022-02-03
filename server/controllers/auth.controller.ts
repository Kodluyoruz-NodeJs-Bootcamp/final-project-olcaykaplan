import {Request, Response} from "express"
import { User } from "../entities/user.entity"

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

export const Login = async (req: Request, res: Response) => {

}

export const Logout = async () => {
    
}