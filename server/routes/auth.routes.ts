import express from "express"
import {Logout, Login, CreateUser} from "../controllers/auth.controller"
import passport from "passport";

const CLIENT_URL = "http://localhost/3000"
const router = express.Router();

router.post('/logout', Logout)
router.post('/signin', Login)
router.post('/signup', CreateUser)

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
export = router;