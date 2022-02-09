import { ActionType } from "../utils/constant";

export type actor = {
  name?: string | FormDataEntryValue | null;
  surname?: string | FormDataEntryValue | null;
  dateOfBirth?: string | FormDataEntryValue | null;
  gender?: string | FormDataEntryValue | null;
  isPublished?: boolean;
  createDate?: string;
};

interface MY_ACTOR_LIST_Action {
  type: ActionType.MY_ACTOR_LIST;
  data: {
    ownActorList: Array<actor>;
  };
}
interface DISCOVER_ACTOR_LIST_Action {
  type: ActionType.DISCOVER_ACTOR_LIST;
  data: {
    discoverActorList: Array<actor>;
  };
}

export type Action = MY_ACTOR_LIST_Action | DISCOVER_ACTOR_LIST_Action

type IDEFAULT_STATE = {
  ownList: Array<actor>;
  discoverList: Array<actor>;
};
const DEFAULT_STATE: IDEFAULT_STATE = {
  ownList: [],
  discoverList: [],
};

const actorReducer = (state = DEFAULT_STATE, action:Action) => {
  switch (action.type) {
    case ActionType.MY_ACTOR_LIST:
      return {
        ...state,
        ownList: action.data.ownActorList,
      };
    case ActionType.DISCOVER_ACTOR_LIST:
      return {
        ...state,
        ownList: action.data.discoverActorList,
      };
    default:
      return state;
  }
};

export default actorReducer;
