import express from "express";
import {
  AddMovie,
  UpdateMovie,
  DeleteMovie,
  GetAllMovies,
  GetOwnMovieList,
  ChangePublishValueForMovie,

  AddCommentForMovie,
  UpdateComment,
  DeleteComment,
  GetAllCommentsOfMovieRQ,
  
  AddLikeForMovie,
  GetAllLikesOfMovieRQ,
  DeleteLike
} from "../controllers/movie.controller";
import checkAuth from '../middleware/checkAuth'; 

const router = express.Router();

// CONMMENT
router.post("/movie/comment",checkAuth, AddCommentForMovie);
router.put("/movie/comment/:id", UpdateComment);
router.delete("/movie/comment", DeleteComment)
router.get("/movie/comments", GetAllCommentsOfMovieRQ);

//LIKE
router.post("/movie/like", AddLikeForMovie);
router.delete("/movie/like", DeleteLike)
router.get("/movie/likes", GetAllLikesOfMovieRQ);



//Movie
router.post("/movie/publish", ChangePublishValueForMovie)
router.get("/movie/discover", GetAllMovies);
router.get("/own-movie-list",checkAuth, GetOwnMovieList )

router.post("/movie",checkAuth, AddMovie);
router.delete("/movie/:id", DeleteMovie);
router.put("/movie/:id", UpdateMovie);




export = router;
