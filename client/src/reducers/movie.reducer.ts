import { ActionType } from "../utils/constant";
import { comment, movieLike, movie, user } from "../utils/types";

interface PUBLISH_MOVIE_Action {
  type: ActionType.PUBLISH_MOVIE;
  data: {
    movieId: number;
    isPublished: boolean;
  };
}
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
  | PUBLISH_MOVIE_Action
  | DELETE_MOVIE_Action
  | MY_MOVIE_LIST_Action
  | DISCOVER_MOVIE_LIST_Action
  | ADD_COMMENT_FOR_MOVIE_Action
  | REMOVE_MOVIE_COMMENT_Action
  | LIKE_MOVIE_Action
  | REMOVE_LIKE_MOVIE_Action;

type IDEFAULT_STATE = {
  ownMovieList: Array<movie>;
  discoverMovieList: Array<movie>;
};
const DEFAULT_STATE: IDEFAULT_STATE = {
  ownMovieList: [],
  discoverMovieList: [],
};

const movieReducer = (state = DEFAULT_STATE, action: Action) => {
  switch (action.type) {
    // LIST ACTIONS ------------
    //List own created movies
    case ActionType.MY_MOVIE_LIST:
      return {
        ...state,
        ownMovieList: action.data,
      };

    // List all created movies
    case ActionType.DISCOVER_MOVIE_LIST:
      return {
        ...state,
        discoverList: action.data.discoverMovieList,
      };

    case ActionType.PUBLISH_MOVIE:
      var { movieId, isPublished } = action.data;
      state.ownMovieList.map((movie) => {
        if (movie.id === movieId) movie.isPublished = isPublished;

        return movie;
      });
      return {
        ...state,
      };

    // DELTE MOVIE in state list directly on the page
    case ActionType.DELETE_MOVIE:
      var { movieId } = action.data;
      var updateOwnList = state.ownMovieList
        .filter((m) => m.id !== movieId)
        .map((m) => m);
      return {
        ...state,
        ownMovieList: updateOwnList,
      };

    // COMMENT ACTIONS ------------

    // ADD COMMENT in state list directly on the page
    case ActionType.ADD_COMMENT_FOR_MOVIE:
      var { movieId, ...data } = action.data;
      //var movie = state.discoverMovieList.find(movie => movie.id == action.data.movieId) || {comments:[]}
      var movie =
        state.ownMovieList.find((movie) => movie.id == movieId) ||
        ({} as movie);
      var comments = movie.comments;
      comments?.push(data);
      movie.comments = comments;

      var updateOwnList = state.ownMovieList.map((m) =>
        m.id === movieId ? movie : m
      );
      return {
        ...state,
        ownMovieList: updateOwnList,
      };

    // DELETE COMMENT in state list directly on the page
    case ActionType.REMOVE_MOVIE_COMMENT:
      var { movieId, commentId } = action.data;
      //var movie = state.discoverMovieList.find(movie => movie.id == action.data.movieId) || {comments:[]}
      var movie =
        state.ownMovieList.find((movie) => movie.id == movieId) ||
        ({} as movie);
      var commentIndex = movie.comments.findIndex(
        (comment) => comment.id === commentId
      );
      movie.comments.splice(commentIndex, 1);
      var updateOwnList = state.ownMovieList.map((m) =>
        m.id === movieId ? movie : m
      );
      return {
        ...state,
        ownMovieList: updateOwnList,
      };

    // LIKE ACTIONS ------------

    // ADD LIKE MOVIE in state list directly on the page
    case ActionType.LIKE_MOVIE:
      var { id, movieId, user } = action.data;
      //var movie = state.discoverMovieList.find(movie => movie.id == action.data.movieId) || {comments:[]}
      var movie =
        state.ownMovieList.find((movie) => movie.id == movieId) ||
        ({} as movie);
      var likes = movie.likes;
      var dataLike: movieLike = { id, movieId, user };
      likes?.push(dataLike);
      movie.likes = likes;

      var updateOwnList = state.ownMovieList.map((m) =>
        m.id === movieId ? movie : m
      );
      return {
        ...state,
        ownMovieList: updateOwnList,
      };

    //REMOVE LIKE MOVIE in state list directly on the page
    case ActionType.REMOVE_LIKE_MOVIE:
      var { movieId, likeId } = action.data;
      //var movie = state.discoverMovieList.find(movie => movie.id == action.data.movieId) || {comments:[]}
      var movie =
        state.ownMovieList.find((movie) => movie.id == movieId) ||
        ({} as movie);
      var likeIndex = movie.likes.findIndex((like) => like.id === likeId);
      movie.likes.splice(likeIndex, 1);
      var updateOwnList = state.ownMovieList.map((m) =>
        m.id === movieId ? movie : m
      );
      return {
        ...state,
        ownMovieList: updateOwnList,
      };
    default:
      return state;
  }
};

export default movieReducer;
