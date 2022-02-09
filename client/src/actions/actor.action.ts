import * as api from "../api";
import { ActionType } from "../utils/constant";
import { Dispatch } from "redux";
import { Action, actor } from "../reducers/actor.reducer";

export const addNewActor =
  (actorData: actor) => async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await api.addNewActor(actorData);
      console.log("addNewActor || data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

export const fetchOwnActorList = () => async (dispatch: Dispatch<Action>) => {
  try {
    const data = await api.fetchOwnActorList();
    console.log("fetchOwnActorList || data", data);
  } catch (error) {
    console.log("error", error);
  }
};

export const fetchDiscoverActorList =
  () => async (dispatch: Dispatch<Action>) => {
    try {
      const data = await api.fetchDiscoverActorList();
      console.log("fetchDiscoverActorList || data", data);
    } catch (error) {}
  };
