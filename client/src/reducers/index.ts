import {combineReducers} from "redux" 
import auth from "./auth.reducer";
import actor from "./actor.reducer";
import movie from "./movie.reducer";

const reducers = combineReducers({auth, actor, movie})

export default reducers;

export type RootState = ReturnType<typeof reducers>