import express from "express";
import {
  AddMovie,
  UpdateMovie,
  DeleteMovie,
  GetAllMovies,
  GetOwnMovieList,
  ChangePublishValueForMovie,

  AddCommentForMovie,
  DeleteComment,
  
  AddLikeForMovie,
  DeleteLike
} from "../controllers/movie.controller";
import {isUserAuthenticated, doesUserHasAuthorityForComment, doesUserHasAuthorityForPost} from '../middleware/checkAuth'; 

const router = express.Router();

// CONMMENT
router.post("/movie/comment",isUserAuthenticated, AddCommentForMovie);
router.delete("/movie/comment/:commentId/:postType", isUserAuthenticated, doesUserHasAuthorityForComment, DeleteComment)

//LIKE
router.post("/movie/like/:movieId",isUserAuthenticated, AddLikeForMovie);
router.delete("/movie/like/:likeId",isUserAuthenticated,  DeleteLike)


//Movie
router.post("/movie/publish", isUserAuthenticated, ChangePublishValueForMovie)
router.get("/movie/discover", isUserAuthenticated, GetAllMovies);
router.get("/own-movie-list",isUserAuthenticated, GetOwnMovieList )

router.post("/movie",isUserAuthenticated, AddMovie);
router.delete("/movie/:postId/:postType", isUserAuthenticated, doesUserHasAuthorityForPost ,DeleteMovie);
//???? doesUserHasAuthorityForPost
router.put("/movie/:postId/:postType",isUserAuthenticated, doesUserHasAuthorityForPost, UpdateMovie);




export = router;
