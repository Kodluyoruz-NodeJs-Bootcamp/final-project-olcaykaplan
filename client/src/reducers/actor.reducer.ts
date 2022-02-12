import { ActionType } from "../utils/constant";
import { actor, comment, actorLike, user } from "../utils/types";

interface PUBLISH_ACTOR_Action {
  type: ActionType.PUBLISH_ACTOR;
  data: {
    actorId: number;
    isPublished: boolean;
  };
}
interface MY_ACTOR_LIST_Action {
  type: ActionType.MY_ACTOR_LIST;
  data: Array<actor>;
}

interface DISCOVER_ACTOR_LIST_Action {
  type: ActionType.DISCOVER_ACTOR_LIST;
  data: Array<actor>;
}

interface DELETE_ACTOR_Action {
  type: ActionType.DELETE_ACTOR;
  data: {
    actorId: number;
  };
}
interface ADD_COMMENT_FOR_ACTOR_Action {
  type: ActionType.ADD_COMMENT_FOR_ACTOR;
  data: comment & {
    actorId: number;
    isDiscover: boolean;
  };
}

interface REMOVE_ACTOR_COMMENT_Action {
  type: ActionType.REMOVE_ACTOR_COMMENT;
  data: {
    actorId: number;
    commentId: number;
    isDiscover: boolean;
  };
}
interface LIKE_ACTOR_Action {
  type: ActionType.LIKE_ACTOR;
  data: {
    data: {
      id: number;
      actorId: number;
      user: user;
    };
    isDiscover: boolean;
  };
}
interface REMOVE_LIKE_ACTOR_Action {
  type: ActionType.REMOVE_LIKE_ACTOR;
  data: {
    likeId: number;
    actorId: number;
    isDiscover: boolean;
  };
}

export type Action =
  | PUBLISH_ACTOR_Action
  | DELETE_ACTOR_Action
  | MY_ACTOR_LIST_Action
  | DISCOVER_ACTOR_LIST_Action
  | ADD_COMMENT_FOR_ACTOR_Action
  | REMOVE_ACTOR_COMMENT_Action
  | LIKE_ACTOR_Action
  | REMOVE_LIKE_ACTOR_Action;

type IDEFAULT_STATE = {
  ownActorList: Array<actor>;
  discoverActorList: Array<actor>;
};
const DEFAULT_STATE: IDEFAULT_STATE = {
  ownActorList: [],
  discoverActorList: [],
};

const actorReducer = (state = DEFAULT_STATE, action: Action) => {
  switch (action.type) {
    //List own created actor
    case ActionType.MY_ACTOR_LIST:
      return {
        ...state,
        ownActorList: action.data,
      };

    // List all created actor
    case ActionType.DISCOVER_ACTOR_LIST:
      console.log("actor List: ", action.data);
      return {
        ...state,
        discoverActorList: action.data,
      };

    case ActionType.PUBLISH_ACTOR:
      var { actorId, isPublished } = action.data;
      state.ownActorList.map((actor) => {
        if (actor.id === actorId) actor.isPublished = isPublished;

        return actor;
      });
      return {
        ...state,
      };

    // ######################

    // DELTE ACTOR in state list directly on the page
    case ActionType.DELETE_ACTOR:
      var { actorId } = action.data;
      var updateOwnList = state.ownActorList
        .filter((m) => m.id !== actorId)
        .map((m) => m);
      return {
        ...state,
        ownActorList: updateOwnList,
      };

    // COMMENT ACTIONS ------------

    // ADD COMMENT in state list directly on the page
    case ActionType.ADD_COMMENT_FOR_ACTOR:
      var { actorId, isDiscover, ...data } = action.data;
      var list = isDiscover ? state.discoverActorList : state.ownActorList;
      var actor = list.find((actor) => actor.id === actorId) || ({} as actor);
      var comments = actor.comments;
      comments?.push(data);
      actor.comments = comments;

      var updateList = list.map((a) => (a.id === actorId ? actor : a));
      return {
        ...state,
      };

    // DELETE COMMENT in state list directly on the page
    case ActionType.REMOVE_ACTOR_COMMENT:
      var { actorId, commentId, isDiscover } = action.data;
      var list = isDiscover ? state.discoverActorList : state.ownActorList;
      var actor = list.find((actor) => actor.id == actorId) || ({} as actor);
      var commentIndex = actor.comments.findIndex(
        (comment) => comment.id === commentId
      );
      actor.comments.splice(commentIndex, 1);
      var updateOwnList = list.map((m) => (m.id === actorId ? actor : m));
      return {
        ...state,
      };

    // LIKE ACTIONS ------------

    // ADD LIKE ACTOR in state list directly on the page
    case ActionType.LIKE_ACTOR:
      var { id, actorId, user } = action.data.data;
      var isDiscover = action.data.isDiscover;
      var list = isDiscover ? state.discoverActorList : state.ownActorList;

      var actor =
        list.find((actor) => actor.id == actorId) ||
        ({} as actor);
      var likes = actor.likes;
      var dataLike: actorLike = { id, actorId, user };
      likes?.push(dataLike);
      actor.likes = likes;

      var updateOwnList = list.map((m) =>
        m.id === actorId ? actor : m
      );
      return {
        ...state
      };

    //REMOVE LIKE ACTOR in state list directly on the page
    case ActionType.REMOVE_LIKE_ACTOR:
      var { actorId, likeId, isDiscover} = action.data;
      var list = isDiscover ? state.discoverActorList : state.ownActorList;

      var actor =
        list.find((actor) => actor.id == actorId) ||
        ({} as actor);
      var likeIndex = actor.likes.findIndex((like) => like.id === likeId);
      actor.likes.splice(likeIndex, 1);
      console.log("actor.comments", actor.likes);
      var updateOwnList = list.map((m) =>
        m.id === actorId ? actor : m
      );
      return {
        ...state        
      };

    default:
      return state;
  }
};

export default actorReducer;
