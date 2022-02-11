import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { IUser } from "../controllers/auth/passportGoogle.auth";
import { ActorComment } from "../entities/actorComments.entity";
import { Actor } from "../entities/actors.entity";
import { MovieComment } from "../entities/movieComments.entity";
import { Movie } from "../entities/movies.entity";
export const isUserAuthenticated = async (req: Request, res: Response, next: NextFunction ) => {
  const token = req.cookies.jwt;
  const data: any = token ? await verify(token, process.env.JWT_SECRET as string) : false;
  if (data) {
    req["user"] = data.user;
    next();
  } else {
    console.log("ELSE DÜŞTÜ");
    res.status(401).send({ error: true, message: "You must login first!" });
  }
};

export const doesUserHasAuthorityForComment = async (req: Request, res: Response, next: NextFunction ) => {
  const { id } = req["user"] as IUser;
  const {commentId, postType} = req.params;
  let comment = []
   if(postType === "movie"){
      comment = await MovieComment.find({
      where: { id: commentId, user: { id } },
      });
   }else {
      comment = await ActorComment.find({
      where: { id: commentId, user: { id } },
      });
   }

  if (comment.length > 0) {
    next();
  } else {
    res.status(401).send("This comment is not belongs to you!");
  }
};

export const doesUserHasAuthorityForPost = async ( req: Request,res: Response, next: NextFunction ) => {
  const { id } = req["user"] as IUser;
  const {postId, postType} = req.params;
  console.log("commentType", postType);
  let post = []
  console.log("postId:",postId)
  if(postType === "movie"){
     post = await Movie.find({
      where: { id: postId, user: { id } },
    });
  } else{
     post = await Actor.find({
      where: { id: postId, user: { id } },
    });
  }
  console.log("post:",post)
  if (post.length > 0) {
    next();
  } else {
    console.log("catch error ");
    res.status(401).send("This comment is not belongs to you!");
  }
};
