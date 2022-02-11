import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { IUser } from "../controllers/auth/passportGoogle.auth";
import { MovieComment } from "../entities/movieComments.entity";
import { Movie } from "../entities/movies.entity";
export const isUserAuthenticated = async (req: Request, res: Response, next: NextFunction ) => {
  const token = req.cookies.jwt;
  const data: any = token ? await verify(token, "secret") : false;
  if (data) {
    req["user"] = data.user;
    next();
  } else {
    console.log("ELSE DÜŞTÜ");
    res.status(401).send({ error: true, message: "You must login first!" });
  }
};

export const doesUserHasAuthorityForRemoveComment = async (req: Request, res: Response, next: NextFunction ) => {
  const { id } = req["user"] as IUser;
  const commentId = req.params.commentId;
  const comment = await MovieComment.find({
    where: { id: commentId, user: { id } },
  });
  if (comment.length > 0) {
    next();
  } else {
    res.status(401).send("This comment is not belongs to you!");
  }
};

export const doesUserHasAuthorityForDeletePost = async ( req: Request,res: Response, next: NextFunction ) => {
  const { id } = req["user"] as IUser;
  const movieId = req.params.id;
  console.log("movieId", movieId);
  console.log("userId", id);
  const movie = await Movie.find({
    where: { id: movieId, user: { id } },
  });
  console.log("movie", movie);
  if (movie.length > 0) {
    console.log("is there an error?");
    next();
  } else {
    console.log("catch error ");
    res.status(401).send("This comment is not belongs to you!");
  }
};
