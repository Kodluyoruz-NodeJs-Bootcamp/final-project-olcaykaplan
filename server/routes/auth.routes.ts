import express from "express"
import {Logout, AuthenticatedUser} from "../controllers/auth.controller"
import {isUserAuthenticated} from "../middleware/checkAuth"
import passport from "passport";
import {sign} from "jsonwebtoken";
import {IUser} from '../controllers/auth/passportGoogle.auth';
import "dotenv/config"
const CLIENT_URL = "http://localhost/3000"
const router = express.Router();
const TWO_HOURS = 1000 * 60 * 60 * 2;

router.get('/logout', Logout)
router.get('/user-auth', isUserAuthenticated, AuthenticatedUser)

// Google
router.get("/google", passport.authenticate("google", {session:false, scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "http://localhost:3000/login",
    //failureRedirect: "http://localhost:3000/login",
    failureMessage: "error"
  }),(req, res) => {
    console.log()
     const user = req.user as IUser
    const token = sign({user}, process.env.JWT_SECRET as string, {
      expiresIn: TWO_HOURS,
    });
    res.cookie('jwt', token, {httpOnly: true, maxAge:TWO_HOURS})
    res.redirect("http://localhost:3000/login");
  }
);

// FACEBOOK
router.get("/facebook", passport.authenticate("facebook", { scope: ["profile", "email"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);



export = router;