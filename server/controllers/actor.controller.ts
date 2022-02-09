import { Request, Response } from "express";
import { ActorComment } from "../entities/actorComments.entity";
import { ActorLikes } from "../entities/actorLikes.entity";
import { Actor } from "../entities/actors.entity";
import { User } from "../entities/user.entity";
import { IUser } from "./auth/passportGoogle.auth";

export const AddActor = async (req: Request, res: Response) => {
  try {
    console.log("add Actor")
    const {id} = req["user"] as IUser
    const body = req.body;
    console.log("userId",id)
    console.log("body",body)
    const user = await User.findOne(id);
    console.log("user")
    const actor = await Actor.save({
      ...body,
      user,
    });
    res.send(actor);
    console.log("actor",actor)
  } catch (error) {
    console.log("AddActor | error",error)
  }
};

export const UpdateActor = async (req: Request, res: Response) => {
  try {
    const actorId = req.params.id;
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
    const actorId = req.params.id;
    await Actor.delete(actorId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteActor | error: ", error);
  }
};

export const GetAllActors = async (req: Request, res: Response) => {
  try {
    const actors = await Actor.find();
    res.status(200).send(actors);
  } catch (error) {
    console.log("GetAllActors | error", error);
  }
};
export const GetOwnActorList = async (req: Request, res: Response) => {
  try {
    const {id} = req["user"] as IUser
    const ownActorList = await Actor.find({relations:["comments","likes"], where:{user :{id}}});
    res.status(200).send(ownActorList);
  } catch (error) {
    console.log("GetAllActors | error", error);
  }
};

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
    const { userId, actorId, ...body } = req.body;
    const user = await User.findOne(userId);
    const actor = await Actor.findOne(actorId);
    const comment = await ActorComment.save({
      ...body,
      user,
      actor,
    });
    res.status(201).send(comment);
  } catch (error) {}
};

export const UpdateComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;
    const comment = req.body.comment;
    const update = await ActorComment.update(commentId, { comment });

    res.status(202).send(update);
  } catch (error) {}
};

// Delete Comment by Comment ID
export const DeleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.body.commentId;
    await ActorComment.delete(commentId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteComment | error: ", error);
  }
};

export const GetAllCommentsOfActor = async (req: Request, res: Response) => {
  try {
    const actorId = req.body.actorId;
    const comments = await ActorComment.find({
      relations: ["actor", "user"],
      where: { actor: { id: actorId } },
    });
    res.status(200).send(comments);
  } catch (error) {}
};

// COMMENT END

// LIKE START
export const AddLikeForActor = async (req: Request, res: Response) => {
  try {
    const { userId, actorId, ...body } = req.body;
    const user = await User.findOne(userId);
    const actor = await Actor.findOne(actorId);
    const likes = await ActorLikes.save({
      ...body,
      user,
      actor,
    });
    res.status(201).send(likes);
  } catch (error) {}
};

// Delete Like by Like ID
export const DeleteLike = async (req: Request, res: Response) => {
  try {
    const likeId = req.body.likeId;
    console.log("commentId", likeId);
    await ActorComment.delete(likeId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteComment | error: ", error);
  }
};

export const GetAllLikesOfActor = async (req: Request, res: Response) => {
  try {
    const actorId = req.body.actorId;
    const comments = await ActorComment.find({
      relations: ["actor", "user"],
      where: { actor: { id: actorId } },
    });
    res.status(200).send(comments);
  } catch (error) {}
};

// LIKE END
