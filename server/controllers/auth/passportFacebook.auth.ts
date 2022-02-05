import { Strategy as FacebookStrategy} from "passport-facebook"

import passport from "passport"

import "dotenv/config"

passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        callbackURL: "http://localhost:5000/api/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
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
  
  