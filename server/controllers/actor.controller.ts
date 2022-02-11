import { Request, Response } from "express";
import { Not } from "typeorm";
import { ActorComment } from "../entities/actorComments.entity";
import { ActorLikes } from "../entities/actorLikes.entity";
import { Actor } from "../entities/actors.entity";
import { User } from "../entities/user.entity";
import { IUser } from "./auth/passportGoogle.auth";

export const AddActor = async (req: Request, res: Response) => {
  try {
    const {id} = req["user"] as IUser
    const body = req.body;
    const user = await User.findOne(id);
    const actor = await Actor.save({
      ...body,
      user,
    });
    res.status(201).send(actor);
  } catch (error) {
    console.log("AddActor | error",error)
  }
};

export const UpdateActor = async (req: Request, res: Response) => {
  try {
    const actorId = req.params.postId;
    const body = req.body;
    const update = await Actor.update(actorId, {
      ...body,
    });
    res.status(202).send(update);
  } catch (error) {}
};

// Delete actor by params actor id
export const DeleteActor = async (req: Request, res: Response) => {
  try {
    const actorId = req.params.postId;
    await Actor.delete(actorId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteActor | error: ", error);
  }
};

export const GetAllActors = async (req: Request, res: Response) => {
  try {
    const {id} = req["user"] as IUser
    const actors = await Actor.find({order:{createDate:"DESC"}, where:{id: Not(id)}});
    res.status(200).send(actors);
  } catch (error) {
    console.log("GetAllActors | error", error);
  }
};
export const GetOwnActorList = async (req: Request, res: Response) => {
  try {
    const {id} = req["user"] as IUser
    const actorList = await Actor.find({relations:["user"], where:{user :{id:id}}, order:{createDate:"DESC"}});
    let ownActorList = await Promise.all(actorList.map(async(actor) => {
      const comments = await GetAllCommentsOfActor(actor.id)
      const likes = await GetAllLikesOfActor(actor.id)
      const {password, facebookId, googleId, source, ...user} = actor.user
      return {...actor, comments, likes, user}
    }));
    res.status(200).send(ownActorList);
  } catch (error) {
    console.log("GetAllActors | error", error);
  }
};

// Not used for now
export const GetAllActorsByFilter = async (req: Request, res: Response) => {
  try {
    const filter = req.body.filter;
    let isPublished = filter === "published"; // true or false
    const actors = await Actor.find({ where: { isPublished } });
    res.status(200).send(actors);
  } catch (error) {
    console.log("GetAllActorsByFilter | error", error);
  }
};

// publish actor or hide according to body information 
export const ChangePublishValueForActor = async (req: Request, res: Response) => {
  try {
    const {actorId, isPublished} = req.body;
    await Actor.update(Number(actorId), { isPublished });
    res.status(202).send("success");
  } catch (error) {}
};

// COMMENT START

// Add new Comment for Actor
export const AddCommentForActor = async (req: Request, res: Response) => {
  try {
    const {id} = req["user"] as IUser

    const { actorId, ...body } = req.body;
    const user = await User.findOne(id);
    const actor = await Actor.findOne(actorId);
    const addedComment = await ActorComment.save({
      ...body,
      user,
      actor,
    });
    res.status(201).send(addedComment);
  } catch (error) {}
};

// Delete Comment by Comment ID
export const DeleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId;
    await ActorComment.delete(commentId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteComment | error: ", error);
  }
};

export const GetAllCommentsOfActor = async (actorId:number) => {
  try {
    const comments = await ActorComment.find({
      relations: ["user"],
      where: { actor: { id: actorId } },
    });
    const resComments = comments.map(comment => {
      const {password, googleId, facebookId, source, ...user} = comment.user
      return {id: comment.id, comment: comment.comment, user}
    })
    return resComments;
  } catch (error) {}
};
// COMMENT END

// LIKE START
export const AddLikeForActor = async (req: Request, res: Response) => {
  try {
    const {id} = req["user"] as IUser
    const actorId = req.params.actorId
    const user = await User.findOne(id);
    const actor = await Actor.findOne(actorId);
    const body:any = {user, actor}
    const savedLike = await ActorLikes.save({
      ...body,
      user,
      actor,
    });
    const {password, googleId, facebookId, source, ...userData} = savedLike.user
    const like = {id:savedLike.id, actorId:savedLike.actor.id, user:userData}
    res.status(201).send(like);
  } catch (error) {}
};

// Delete Like by Like ID
export const DeleteLike = async (req: Request, res: Response) => {
  try {
    const likeId = req.params.likeId;
    await ActorLikes.delete(likeId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteComment | error: ", error);
  }
};


export const GetAllLikesOfActor = async (actorId:number) => {
  try {
    const likes = await ActorLikes.find({
      relations: ["actor", "user"],
      where: { actor: { id: actorId } },
    });
    const resLikes = likes.map(like => {
      const {password, googleId, facebookId, source, ...user} = like.user
      return {id:like.id, actorId:like.actor.id, user}
    })
    return resLikes
  } catch (error) {}
};

// LIKE END
