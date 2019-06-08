import { combineReducers } from "redux";
import { projectsReducer } from "./components/projects/ducks";
import { snitchReducer} from "@faizaanceg/snitch";
export const reducer = combineReducers({
    projects: projectsReducer,
    modals: snitchReducer
});
