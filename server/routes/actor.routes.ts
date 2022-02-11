import express from "express";
import {
  AddActor,
  UpdateActor,
  DeleteActor,
  GetAllActors,
  GetOwnActorList,
  ChangePublishValueForActor,
  
  AddCommentForActor,
  DeleteComment,
  
  AddLikeForActor,
  DeleteLike,
} from "../controllers/actor.controller";
import {isUserAuthenticated, doesUserHasAuthorityForComment, doesUserHasAuthorityForPost} from '../middleware/checkAuth'; 
const router = express.Router();

// CONMMENT
router.post("/actor/comment",isUserAuthenticated, AddCommentForActor);
router.delete("/actor/comment/:commentId/:postType", isUserAuthenticated, doesUserHasAuthorityForComment, DeleteComment)

//LIKE
router.post("/actor/like/:actorId",isUserAuthenticated, AddLikeForActor);
router.delete("/actor/like/:likeId",isUserAuthenticated,  DeleteLike)



//Actor
router.post("/actor/publish",isUserAuthenticated, ChangePublishValueForActor)
router.get("/actor/discover",isUserAuthenticated, GetAllActors);
router.get("/own-actor-list",isUserAuthenticated, GetOwnActorList )

router.post("/actor",isUserAuthenticated, AddActor);
router.delete("/actor/:postId/:postType", isUserAuthenticated, doesUserHasAuthorityForPost, DeleteActor);
//???? doesUserHasAuthorityForPost
router.put("/actor/:postId/:postType",isUserAuthenticated, doesUserHasAuthorityForPost, UpdateActor);




export = router;
