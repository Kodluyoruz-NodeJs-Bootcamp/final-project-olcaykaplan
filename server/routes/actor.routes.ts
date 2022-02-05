import express from "express";
import {
  AddActor,
  UpdateActor,
  DeleteActor,
  GetAllActors,
  ChangePublishValueForActor,
  
  AddCommentForActor,
  UpdateComment,
  DeleteComment,
  GetAllCommentsOfActor,
  
  AddLikeForActor,
  GetAllLikesOfActor,
  DeleteLike,
} from "../controllers/actor.controller";

const router = express.Router();


// CONMMENT
router.post("/actor/comment", AddCommentForActor);
router.put("/actor/comment/:id", UpdateComment);
router.delete("/actor/comment", DeleteComment);
router.get("/actor/comments", GetAllCommentsOfActor);

//LIKE
router.post("/actor/like", AddLikeForActor);
router.delete("/actor/like", DeleteLike);
router.get("/actor/likes", GetAllLikesOfActor);

//Actor
router.post("/actor/publish", ChangePublishValueForActor)

router.post("/actor", AddActor);
router.delete("/actor/:id", DeleteActor);
router.put("/actor/:id", UpdateActor);
router.get("/actors", GetAllActors);

export = router;
