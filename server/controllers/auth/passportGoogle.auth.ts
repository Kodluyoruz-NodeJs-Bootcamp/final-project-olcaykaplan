//const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Request, Response } from "express";

import passport from "passport";
import "dotenv/config";
import { User } from "../../entities/user.entity";
export interface IUser {
  id?: number;
  name: string;
  surname: string;
  email: string;
  googleId: string;
  source: string;
  picture: string;
}
type user = {
  id?:number;
}

// when api/auth/google route get request passport trigger below google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      console.log("profile", profile);
      const defaultUser:IUser = {
        name: profile.name.givenName,
        surname: profile.name.familyName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
        source: "google",
      };
      // check this google id is already exist
      let user = await findUserByGoogleId(profile.id);
      if (!user) {
        // if user id does not exist, create new
        await CreateUser(defaultUser);
        user = await findUserByGoogleId(profile.id);
      }
      console.log("user created or exist: ", user);
      done(null, user);
    }
  )
);

// passport.serializeUser((user:user, done) => {
 
//   done(null, user.id);  
// });

// passport.deserializeUser((id: number, done) => {
//   done(null, id);
// });

const findUserByGoogleId = async (googleId: string) => {
  const user = await User.findOne({ googleId });
  return user;
};

export const CreateUser = async (userData: any) => {
  try {
    console.log("req.body: ", userData);
    const user = await User.save({
      ...userData,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

/*
trendyol warning for same email address when you force login with a same email address account on facebook and gmail
 Bu e-posta adresi ile kayıtlı bir hesabın var. Şifre yenilemek için Şifremi Unuttum’a tıklayabilirsin.
 */
