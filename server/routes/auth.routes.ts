import express from "express"
import {Logout, Login, CreateUser} from "../controllers/auth.controller"
const router = express.Router();

router.post('/logout', Logout)
router.post('/signin', Login)
router.post('/signup', CreateUser)


export = router;