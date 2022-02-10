import express from "express"
import {Logout, CreateUser, AuthenticatedUser} from "../controllers/auth.controller"
import {isUserAuthenticated} from "../middleware/checkAuth"
import passport from "passport";
import {sign} from "jsonwebtoken";
import {IUser} from '../controllers/auth/passportGoogle.auth';
const CLIENT_URL = "http://localhost/3000"
const router = express.Router();
const TWO_HOURS = 1000 * 60 * 60 * 2;

router.post('/logout', Logout)
//router.post('/signin', Login)
router.post('/signup', CreateUser)
router.get('/user-auth', isUserAuthenticated, AuthenticatedUser)
router.get("/google", passport.authenticate("google", {session:false, scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "http://localhost:3000/login",
    // failureRedirect: "http://localhost:3000/login/failed",
  }),(req, res) => {
     const user = req.user as IUser
    const token = sign({user}, "secret", {
      expiresIn: TWO_HOURS,
    });
    res.cookie('jwt', token, {httpOnly: true, maxAge:TWO_HOURS})
    res.redirect("http://localhost:3000/login");
  }
);
router.get("/facebook", passport.authenticate("facebook", { scope: ["profile", "email"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);



export = router;