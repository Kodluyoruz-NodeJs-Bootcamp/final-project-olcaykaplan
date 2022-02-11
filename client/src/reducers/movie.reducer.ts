import { ActionType } from "../utils/constant";
import { comment, like, movie, user } from "../utils/types";

interface MY_MOVIE_LIST_Action {
  type: ActionType.MY_MOVIE_LIST;
  data: Array<movie>;
}
interface DISCOVER_MOVIE_LIST_Action {
  type: ActionType.DISCOVER_MOVIE_LIST;
  data: {
    discoverMovieList: Array<movie>;
  };
}

interface DELETE_MOVIE_Action {
  type: ActionType.DELETE_MOVIE;
  data: {
    movieId: number;
  };
}
interface ADD_COMMENT_FOR_MOVIE_Action {
  type: ActionType.ADD_COMMENT_FOR_MOVIE;
  data: comment & {
    movieId: number;
  };
}

interface REMOVE_MOVIE_COMMENT_Action {
  type: ActionType.REMOVE_MOVIE_COMMENT;
  data: {
    movieId: number;
    commentId: number;
  };
}
interface LIKE_MOVIE_Action {
  type: ActionType.LIKE_MOVIE;
  data: {
    id: number;
    movieId: number;
    user: user;
  };
}
interface REMOVE_LIKE_MOVIE_Action {
  type: ActionType.REMOVE_LIKE_MOVIE;
  data: {
    likeId: number;
    movieId: number;   
  };
}

export type Action =
  | DELETE_MOVIE_Action
  | MY_MOVIE_LIST_Action
  | DISCOVER_MOVIE_LIST_Action
  | ADD_COMMENT_FOR_MOVIE_Action
  | REMOVE_MOVIE_COMMENT_Action
  | LIKE_MOVIE_Action
  | REMOVE_LIKE_MOVIE_Action;

type IDEFAULT_STATE = {
  ownList: Array<movie>;
  discoverList: Array<movie>;
};
const DEFAULT_STATE: IDEFAULT_STATE = {
  ownList: [],
  discoverList: [],
};

const movieReducer = (state = DEFAULT_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.MY_MOVIE_LIST:
      return {
        ...state,
        ownList: action.data,
      };
    case ActionType.DISCOVER_MOVIE_LIST:
      return {
        ...state,
        discoverList: action.data.discoverMovieList,
      };
      case ActionType.DELETE_MOVIE:
        var {movieId} = action.data
        var updateOwnList = state.ownList.filter((m) => m.id !== movieId).map(m => m)
        return {
          ...state,
          ownList: updateOwnList
        };
    case ActionType.ADD_COMMENT_FOR_MOVIE:
      var { movieId, ...data } = action.data;

      //var movie = state.discoverList.find(movie => movie.id == action.data.movieId) || {comments:[]}
      var movie =
        state.ownList.find((movie) => movie.id == movieId) || ({} as movie);
      var comments = movie.comments;
      comments?.push(data);
      movie.comments = comments;

      var updateOwnList = state.ownList.map((m) =>
        m.id === movieId ? movie : m
      );
      console.log("updateOwnList", updateOwnList);
      return {
        ...state,
        ownList: updateOwnList,
      };
    case ActionType.REMOVE_MOVIE_COMMENT:
      var {  movieId, commentId } = action.data;
      console.log("commentId, movieId", commentId, movieId);
      //var movie = state.discoverList.find(movie => movie.id == action.data.movieId) || {comments:[]}
      var movie =
        state.ownList.find((movie) => movie.id == movieId) || ({} as movie);
      var commentIndex = movie.comments.findIndex(
        (comment) => comment.id === commentId
      );
      movie.comments.splice(commentIndex, 1);
      console.log("movie.comments", movie.comments);
      var updateOwnList = state.ownList.map((m) =>
        m.id === movieId ? movie : m
      );
      return {
        ...state,
        ownList: updateOwnList,
      };
    case ActionType.LIKE_MOVIE:
      var {  id, movieId, user } = action.data;
      //var movie = state.discoverList.find(movie => movie.id == action.data.movieId) || {comments:[]}
      var movie =
        state.ownList.find((movie) => movie.id == movieId) || ({} as movie);
      var likes = movie.likes;
      var dataLike:like = {id, movieId, user}
      likes?.push(dataLike);
      movie.likes = likes;

      var updateOwnList = state.ownList.map((m) =>
        m.id === movieId ? movie : m
      );
      return {
        ...state,
        ownList: updateOwnList,
      };
      case ActionType.REMOVE_LIKE_MOVIE:
      var { movieId, likeId } = action.data;
      //var movie = state.discoverList.find(movie => movie.id == action.data.movieId) || {comments:[]}
      var movie =
        state.ownList.find((movie) => movie.id == movieId) || ({} as movie);
      var likeIndex = movie.likes.findIndex(
        (like) => like.id === likeId
      );
      movie.likes.splice(likeIndex, 1);
      console.log("movie.comments", movie.likes);
      var updateOwnList = state.ownList.map((m) =>
        m.id === movieId ? movie : m
      );
      return {
        ...state,
        ownList: updateOwnList,
      };
    default:
      return state;
  }
};

export default movieReducer;
