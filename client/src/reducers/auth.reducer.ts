import { ActionType } from "../utils/constant";

type IUser = {
  id: string,
  name: string,
  surname: string,
  email: string
  picture: string,
}
interface AUTH_Action {
  type: ActionType.AUTH, 
  data : {
    user: IUser
  }
}
type IDEFAULT_STATE = {isAuthenticated: boolean, user: IUser, errorMessage: string}
let DEFAULT_STATE: IDEFAULT_STATE= {
  isAuthenticated: false,
  user: {
    id: "",
    name: "",
    surname: "",
    email: "",
    picture: ""
  },
  errorMessage: "",
};
export type Action = AUTH_Action 
const authReducer = (state = DEFAULT_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.AUTH:
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: action.data.user ? action.data.user.name : null,
          surname: action.data.user ? action.data.user.surname : null,
          isAuthenticated: action.data.user && true,
        })
      );
      return {
        ...state,
        isAuthenticated: action.data.user && true,
        user: action.data.user,
      };  
    default:
      return state;
  }
};


export default authReducer;