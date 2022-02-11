import * as api from "../api";
import { ActionType } from "../utils/constant";
import { Dispatch } from "redux"
import { Action } from "../reducers/auth.reducer";
import { Action as ActionMovie } from "../reducers/movie.reducer";

export const fetchUser = () => async (dispatch:Dispatch<Action>) => {
  try {
      const {data} = await api.fetchUser()
      dispatch({type: ActionType.AUTH, data})
  } catch (error) {
    console.log(error)
  }
};

export const logout = () => async (dispatch:Dispatch<Action>) => {
  try {
      const {data} = await api.logout()
      dispatch({type: ActionType.LOGOUT})
  } catch (error) {
    console.log(error)
  }
};

