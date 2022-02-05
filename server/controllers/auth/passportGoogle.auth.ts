//const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Strategy as GoogleStrategy} from "passport-google-oauth20"

import passport from "passport"

import "dotenv/config"
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:5000/api/auth/google/callback",
      },
      function (accessToken:any, refreshToken:any, profile:any, done:any) {
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user:any, done) => {
    done(null, user);
  });
  
  // passport.use(
  //   new FacebookStrategy(
  //     {
  //       clientID: FACEBOOK_APP_ID,
  //       clientSecret: FACEBOOK_APP_SECRET,
  //       callbackURL: "http://localhost:5000/api/auth/google/callback",
  //     },
  //     function (accessToken, refreshToken, profile, done) {
  //       done(null, profile);
  //     }
  //   )
  // );