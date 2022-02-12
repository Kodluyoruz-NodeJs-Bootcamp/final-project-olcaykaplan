import { Strategy as FacebookStrategy } from "passport-facebook";

import passport from "passport";

import "dotenv/config";
import { IUser, CreateUser } from "./passportGoogle.auth";
import { User } from "../../entities/user.entity";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done) => {
      const defaultUser: IUser = {
        name: profile.name.givenName,
        surname: profile.name.familyName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        facebookId: profile.id,
        source: "facebook",
      };
      const currentUser = await User.findOne({ email: defaultUser.email });
      if (currentUser?.source !== defaultUser.source) {
        // This email already registered by different login option
        done(null, false, {
          message: "You have an account registered with this email address.",
        });
      } else {
        // check this facebook id is already exist
        let user = await findUserByFacebookId(profile.id);
        if (!user) {
          // if user id does not exist, create new
          await CreateUser(defaultUser);
          user = await findUserByFacebookId(profile.id);
        }
        console.log("user created or exist: ", user);
        done(null, user);
      }
    }
  )
);
const findUserByFacebookId = async (facebookId: string) => {
  const user = await User.findOne({ facebookId });
  return user;
};
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
