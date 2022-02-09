import { ActionType } from "../utils/constant";

export type movieRegister = {
  name?: string | FormDataEntryValue | null;
  content?: string | FormDataEntryValue | null;
  releasedYear?: number | FormDataEntryValue | null;
  originalLanguage?: string | FormDataEntryValue | null;
};
export type user = {
    id: number;
    name: string;
    surname: string;
    email: string;
    picture: string;
  }
export type comment = {
  id: number;
  comment: string;
  user: user;
};

export type movie = movieRegister & {
  id: number;
  comments: Array<comment>;
  likes: Array<user>
  isPublished?: boolean;
  createDate?: string;
};

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

export type Action = MY_MOVIE_LIST_Action | DISCOVER_MOVIE_LIST_Action;

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
      console.log("action.data.ownMovieList", action.data);
      return {
        ...state,
        ownList: action.data,
      };
    case ActionType.DISCOVER_MOVIE_LIST:
      console.log(
        "action.data.DISCOVER_MOVIE_LIST",
        action.data.discoverMovieList
      );
      return {
        ...state,
        ownList: action.data.discoverMovieList,
      };
    default:
      return state;
  }
};

export default movieReducer;
