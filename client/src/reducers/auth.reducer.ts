import { ActionType } from "../utils/constant";

type IUser = {
  id: number,
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
interface LOGOUT_Action {
  type: ActionType.LOGOUT,   
}
type IDEFAULT_STATE = {isAuthenticated: boolean, user: IUser, errorMessage: string}
let DEFAULT_STATE: IDEFAULT_STATE= {
  isAuthenticated: false,
  user: {
    id: 0,
    name: "",
    surname: "",
    email: "",
    picture: ""
  },
  errorMessage: "",
};
export type Action = AUTH_Action | LOGOUT_Action
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
    case ActionType.LOGOUT:
      localStorage.clear()
      localStorage.setItem(
        "userInfo", JSON.stringify({isAuthenticated:false})
      );
      window.location.replace('/')
      return DEFAULT_STATE;  
    default:
      return state;
  }
};


export default authReducer;