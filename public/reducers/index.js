import { combineReducers } from "redux";

import MainMenuReducer from "./MainMenuReducer";
import ConnectDevicePageReducer from "./ConnectDevicePageReducer";

const rootReducer = combineReducers({
	MainMenuReducer,
	ConnectDevicePageReducer,
});


export default rootReducer;
