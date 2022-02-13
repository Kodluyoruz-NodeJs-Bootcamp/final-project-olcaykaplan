import express from "express"
import {Logout, AuthenticatedUser} from "../controllers/auth.controller"
import {isUserAuthenticated} from "../middleware/checkAuth"
import passport from "passport";
import {sign} from "jsonwebtoken";
import {IUser} from '../controllers/auth/passportGoogle.auth';
import "dotenv/config"
const CLIENT_URL_LOGIN = "https://movies-final.netlify.app/login"
const router = express.Router();
const TWO_HOURS = 1000 * 60 * 60 * 2;

router.get('/logout', Logout)
router.get('/user-auth', isUserAuthenticated, AuthenticatedUser)

// Google
router.get("/google", passport.authenticate("google", {session:false, scope: ["profile", "email"] }));

router.get("/google/callback", function(req, res, next) {
  passport.authenticate("google", function(err, user, info){
    if(err) { 
      console.log("err")
      return next(err)}
    if(!user) {
      console.log("info:",info)
      //res.status(200).send({msg:"buraya hata mesajı"})
      res.cookie('info', info.message)
      res.redirect(CLIENT_URL_LOGIN)
    }
    console.log("else")
    const token = sign({user}, process.env.JWT_SECRET as string, {
            expiresIn: TWO_HOURS,
          });
    res.cookie('info', "")
    res.cookie('jwt', token, {httpOnly: true, maxAge:TWO_HOURS})
    res.redirect(CLIENT_URL_LOGIN);
  })(req, res, next);
});
    


// FACEBOOK
router.get("/facebook", passport.authenticate("facebook", { scope: ["profile", "email"] }));

router.get(
  "/facebook/callback",function(req, res, next) {
    passport.authenticate("facebook", function(err, user, info){
      if(err) { 
        console.log("err")
        return next(err)}
      if(!user) {
        console.log("info:",info)
        //res.status(200).send({msg:"buraya hata mesajı"})
        res.cookie('info', info.message)
        res.redirect(CLIENT_URL_LOGIN)
      }
      console.log("else")
      const token = sign({user}, process.env.JWT_SECRET as string, {
              expiresIn: TWO_HOURS,
            });
      res.cookie('info', "")
      res.cookie('jwt', token, {httpOnly: true, maxAge:TWO_HOURS})
      res.redirect(CLIENT_URL_LOGIN);
    })(req, res, next);
  });
  


export = router;