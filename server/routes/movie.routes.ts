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
  GetAllCommentsOfMovieRQ,
  
  AddLikeForMovie,
  GetAllLikesOfMovieRQ,
  DeleteLike
} from "../controllers/movie.controller";
import {isUserAuthenticated, doesUserHasAuthorityForRemoveComment, doesUserHasAuthorityForDeletePost} from '../middleware/checkAuth'; 

const router = express.Router();

// CONMMENT
router.post("/movie/comment",isUserAuthenticated, AddCommentForMovie);
router.delete("/movie/comment/:commentId", isUserAuthenticated, doesUserHasAuthorityForRemoveComment, DeleteComment)
router.get("/movie/comments", GetAllCommentsOfMovieRQ);

//LIKE
router.post("/movie/like/:movieId",isUserAuthenticated, AddLikeForMovie);
router.delete("/movie/like/:likeId",isUserAuthenticated,  DeleteLike)
router.get("/movie/likes", GetAllLikesOfMovieRQ);



//Movie
router.post("/movie/publish", ChangePublishValueForMovie)
router.get("/movie/discover", GetAllMovies);
router.get("/own-movie-list",isUserAuthenticated, GetOwnMovieList )

router.post("/movie",isUserAuthenticated, AddMovie);
router.delete("/movie/:id", isUserAuthenticated, doesUserHasAuthorityForDeletePost ,DeleteMovie);
router.put("/movie/:id",isUserAuthenticated, UpdateMovie);




export = router;
