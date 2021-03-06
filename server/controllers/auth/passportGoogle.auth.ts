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
  googleId?: string;
  facebookId?: string;
  source: string;
  picture: string;
}
type user = {
  id?: number;
};

// when api/auth/google route get request passport trigger below google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "https://movies-api-final.herokuapp.com/api/auth/google/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      const defaultUser: IUser = {
        name: profile.name.givenName,
        surname: profile.name.familyName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
        source: "google",
      };
      const currentUser = await User.findOne({ email: defaultUser.email });
      console.log("currentUser",currentUser)
      if (currentUser) {
        if(currentUser?.source !== defaultUser.source){
        // This email already registered by different login option
        done(null, false, {
          message: "You have an account registered with this email address.",
        });}
        console.log("user  exist: ", currentUser);
        done(null, currentUser);
      } else {
        // check this google id is already exist
        let user = await findUserByGoogleId(profile.id);
        if (!user) {
          // if user id does not exist, create new
          await CreateUser(defaultUser);
          user = await findUserByGoogleId(profile.id);
        }
        console.log("user created : ", user);
        done(null, user);
      }
    }
  )
);

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
 Bu e-posta adresi ile kay??tl?? bir hesab??n var. ??ifre yenilemek i??in ??ifremi Unuttum???a t??klayabilirsin.
 */
