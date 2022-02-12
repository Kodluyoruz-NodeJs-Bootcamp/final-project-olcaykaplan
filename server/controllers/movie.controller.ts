import { Request, Response } from "express";
import { Not } from "typeorm";
import { MovieComment } from "../entities/movieComments.entity";
import { MovieLikes } from "../entities/movieLikes.entity";
import { Movie } from "../entities/movies.entity";
import { User } from "../entities/user.entity";
import { IUser } from "./auth/passportGoogle.auth";

export const AddMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req["user"] as IUser;
    const body = req.body;
    const user = await User.findOne(id);
    const movie = await Movie.save({
      ...body,
      user,
    });
    res.status(201).send(movie);
  } catch (error) {}
};

export const UpdateMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.postId;
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
    const movieId = req.params.postId;
    await Movie.delete(movieId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteMovie | error: ", error);
  }
};

export const GetAllMovies = async (req: Request, res: Response) => {
  try {
    const { id } = req["user"] as IUser;
    const movies = await Movie.find({
      relations: ["user"],
      order: { createDate: "DESC" },
      where: { user: { id: Not(id) }, isPublished:true },
    });

    const discoverMovieList = await GetAllCommentsAndLikesOfActor(movies)

    res.status(200).send(discoverMovieList);
  } catch (error) {
    console.log("GetAllMovies | error", error);
  }
};
export const GetOwnMovieList = async (req: Request, res: Response) => {
  try {
    const { id } = req["user"] as IUser;
    const movieList = await Movie.find({
      relations: ["user"],
      where: { user: { id: id } },
      order: { createDate: "DESC" },
    });

    let ownMovieList = await GetAllCommentsAndLikesOfActor(movieList)

    res.status(200).send(ownMovieList);
  } catch (error) {
    console.log("GetAllMovies | error", error);
  }
};

// Not used for now
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
export const ChangePublishValueForMovie = async (
  req: Request,
  res: Response
) => {
  try {
    const { movieId, isPublished } = req.body;
    await Movie.update(Number(movieId), { isPublished });
    res.status(202).send("success");
  } catch (error) {}
};

// COMMENT START

// Add new Comment for Movie
export const AddCommentForMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req["user"] as IUser;
    console.log("req.body", req.body);
    const { movieId, ...body } = req.body;
    const user = await User.findOne(id);
    const movie = await Movie.findOne(movieId);
    const addedComment = await MovieComment.save({
      ...body,
      user,
      movie,
    });
    console.log(addedComment);
    res.status(201).send(addedComment);
  } catch (error) {}
};

// Delete Comment by Comment ID
export const DeleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId;
    await MovieComment.delete(commentId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteComment | error: ", error);
  }
};

const GetAllCommentsOfMovie = async (movieId: number) => {
  try {
    const comments = await MovieComment.find({
      relations: ["user"],
      where: { movie: { id: movieId } },
    });
    const resComments = comments.map((comment) => {
      const { password, googleId, facebookId, source, ...user } = comment.user;
      return { id: comment.id, comment: comment.comment, user };
    });
    return resComments;
  } catch (error) {}
};
// COMMENT END

// LIKE START
export const AddLikeForMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req["user"] as IUser;
    const movieId = req.params.movieId;
    const user = await User.findOne(id);
    const movie = await Movie.findOne(Number(movieId));
    const body: any = { user, movie };
    const savedLike = await MovieLikes.save({
      ...body,
    });
    const { password, googleId, facebookId, source, ...userData } =
      savedLike.user;
    const like = {
      id: savedLike.id,
      movieId: savedLike.movie.id,
      user: userData,
    };
    res.status(201).send(like);
  } catch (error) {}
};

// Delete Like by Like ID
export const DeleteLike = async (req: Request, res: Response) => {
  try {
    const likeId = req.params.likeId;
    await MovieLikes.delete(likeId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteComment | error: ", error);
  }
};

const GetAllLikesOfMovie = async (movieId: number) => {
  try {
    const likes = await MovieLikes.find({
      relations: ["movie", "user"],
      where: { movie: { id: movieId } },
    });
    console.log("likes", likes);
    const resLikes = likes.map((like) => {
      const { password, googleId, facebookId, source, ...user } = like.user;
      return { id: like.id, movieId: like.movie.id, user };
    });
    return resLikes;
  } catch (error) {}
};

// LIKE END
const GetAllCommentsAndLikesOfActor = async (movieList: Array<Movie>) => {
  const allCommentsAndLikes = await Promise.all(
    movieList.map(async (movie) => {
      const comments = await GetAllCommentsOfMovie(movie.id);
      const likes = await GetAllLikesOfMovie(movie.id);
      const { password, facebookId, googleId, source, ...user } = movie.user;
      return { ...movie, comments, likes, user };
    })
  );
  return allCommentsAndLikes;
};
