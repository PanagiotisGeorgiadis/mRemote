import { combineReducers } from "redux";

import SocketReducer from "./SocketReducer";
import SharedReducer from "./SharedReducer";
import MainMenuReducer from "./MainMenuReducer";
import ConnectDevicePageReducer from "./ConnectDevicePageReducer";
import InformationMessageReducer from "./InformationMessageReducer";
import ConnectedDevicesPageReducer from "./ConnectedDevicesPageReducer";

const rootReducer = combineReducers({
	SocketReducer,
	SharedReducer,
	MainMenuReducer,
	ConnectDevicePageReducer,
	InformationMessageReducer,
	ConnectedDevicesPageReducer,
});


export default rootReducer;
