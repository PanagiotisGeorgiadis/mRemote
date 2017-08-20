import { combineReducers } from "redux";

import SocketReducer from "./SocketReducer";
import SharedReducer from "./SharedReducer";
import MainMenuReducer from "./MainMenuReducer";
import HomePageReducer from "./HomePageReducer";
import InformationMessageReducer from "./InformationMessageReducer";
import ConnectedDevicesPageReducer from "./ConnectedDevicesPageReducer";

const rootReducer = combineReducers({
	SocketReducer,
	SharedReducer,
	MainMenuReducer,
	HomePageReducer,
	InformationMessageReducer,
	ConnectedDevicesPageReducer,
});


export default rootReducer;
