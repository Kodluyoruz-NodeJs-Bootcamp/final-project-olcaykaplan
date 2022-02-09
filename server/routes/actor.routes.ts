import express from "express";
import {
  AddActor,
  UpdateActor,
  DeleteActor,
  GetAllActors,
  GetOwnActorList,
  ChangePublishValueForActor,
  
  AddCommentForActor,
  UpdateComment,
  DeleteComment,
  GetAllCommentsOfActor,
  
  AddLikeForActor,
  GetAllLikesOfActor,
  DeleteLike,
} from "../controllers/actor.controller";
import checkAuth from '../middleware/checkAuth'; 
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
router.get("/actor/discover", GetAllActors);
router.get("/own-actor-list",checkAuth, GetOwnActorList);

router.post("/actor", checkAuth, AddActor);
router.delete("/actor/:id", DeleteActor);
router.put("/actor/:id", UpdateActor);



export = router;
