import { Request, Response } from "express";
import { MovieComment } from "../entities/movieComments.entity";
import { MovieLikes } from "../entities/movieLikes.entity";
import { Movie } from "../entities/movies.entity";
import { User } from "../entities/user.entity";
import { IUser } from "./auth/passportGoogle.auth";

export const AddMovie = async (req: Request, res: Response) => {
  try {
    const {id} = req["user"] as IUser
    const body = req.body;
    const user = await User.findOne(id);
    console.log("user",user)
    const movie = await Movie.save({
      ...body,
      user,
    });
    res.status(201).send(movie);
  } catch (error) {}
};

export const UpdateMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    const body = req.body;
    console.log("movieId", movieId);
    const update = await Movie.update(movieId, {
      ...body,
    });
    res.status(202).send(update);
  } catch (error) {}
};

// Delete movie by params movie id
export const DeleteMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    await Movie.delete(movieId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteMovie | error: ", error);
  }
};

export const GetAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.status(200).send(movies);
  } catch (error) {
    console.log("GetAllMovies | error", error);
  }
};
export const GetOwnMovieList = async (req: Request, res: Response) => {
  try {
    console.log("GetOwnMovieList")
    const {id} = req["user"] as IUser
    console.log("id",id)
    const movieList = await Movie.find({relations:["user"], where:{user :{id:id}}});
 
    let ownMovieList = await Promise.all(movieList.map(async(movie) => {
      const comments = await GetAllCommentsOfMovie(movie.id)
      const likes = await GetAllLikesOfMovie(movie.id)
      return {...movie, comments, likes}
    }));
   
    res.status(200).send(ownMovieList);
  } catch (error) {
    console.log("GetAllMovies | error", error);
  }
};

export const GetAllMoviesByFilter = async (req: Request, res: Response) => {
  try {
    const filter = req.body.filter;
    let isPublished = filter === "published"; // true or false
    const actors = await Movie.find({ where: { isPublished } });
    res.status(200).send(actors);
  } catch (error) {
    console.log("GetAllMoviesByFilter | error", error);
  }
};

// publish movie or hide according to body information 
export const ChangePublishValueForMovie = async (req: Request, res: Response) => {
  try {
    const {movieId, isPublished} = req.body;
    console.log("movieId | isPublished", movieId, " | ",isPublished)
    await Movie.update(Number(movieId), { isPublished });
    res.status(202).send("success");
  } catch (error) {}
};


// COMMENT START

// Add new Comment for Movie
export const AddCommentForMovie = async (req: Request, res: Response) => {
  try {
    const { userId, movieId, ...body } = req.body;
    const user = await User.findOne(userId);
    const movie = await Movie.findOne(movieId);
    const comment = await MovieComment.save({
      ...body,
      user,
      movie,
    });
    res.status(201).send(comment);
  } catch (error) {}
};

export const UpdateComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;
    const comment = req.body.comment;
    const update = await MovieComment.update(commentId, { comment });

    res.status(202).send(update)
  } catch (error) {}
};

// Delete Comment by Comment ID
export const DeleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.body.commentId;
    console.log("commentId", commentId);
    await MovieComment.delete(commentId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteComment | error: ", error);
  }
};

export const GetAllCommentsOfMovie = async (movieId:number) => {
  try {
    const comments = await MovieComment.find({
      relations: ["user"],
      where: { movie: { id: movieId } },
    });
    const resComments = comments.map(comment => {
      const {password, googleId, facebookId, source, ...user} = comment.user
      return {id: comment.id, comment: comment.comment, user}
    })
    return resComments;
  } catch (error) {}
};
export const GetAllCommentsOfMovieRQ = async (req: Request, res: Response) => {
  try {
    const comments = await MovieComment.find({
      relations: ["user"],
      where: { movie: { id: req.body.movieId } },
    });
    const resComments = comments.map(comment => {
      const {password, googleId, facebookId, source, ...user} = comment.user
      return {id: comment.id, comment: comment.comment, user}
    })
    res.send(resComments);
  } catch (error) {}
};

// COMMENT END

// LIKE START
export const AddLikeForMovie = async (req: Request, res: Response) => {
  try {
    console.log("AddMovie: ", req.body);
    const { userId, movieId, ...body } = req.body;
    const user = await User.findOne(userId);
    const movie = await Movie.findOne(movieId);
    const likes = await MovieLikes.save({
      ...body,
      user,
      movie,
    });
    res.status(201).send(likes);
  } catch (error) {}
};

// Delete Like by Like ID
export const DeleteLike = async (req: Request, res: Response) => {
  try {
    const likeId = req.body.likeId;
    console.log("commentId", likeId);
    await MovieComment.delete(likeId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteComment | error: ", error);
  }
};

export const GetAllLikesOfMovie = async (movieId:number) => {
  try {
    const likes = await MovieLikes.find({
      relations: ["movie", "user"],
      where: { movie: { id: movieId } },
    });
    const resLikes = likes.map(like => {
      const {password, googleId, facebookId, source, ...user} = like.user
      return user
    })
    return resLikes
  } catch (error) {}
};
export const GetAllLikesOfMovieRQ = async (req: Request, res: Response) => {
  try {
    console.log("hello ")
    const likes = await MovieLikes.find({
      relations: [ "user"],
      where: { movie: { id: req.body.movieId } },
    });
    const resLikes = likes.map(like => {
      const {password, googleId, facebookId, source, ...user} = like.user
      return user
    })
    res.send(resLikes)
  } catch (error) {}
};

// LIKE END
