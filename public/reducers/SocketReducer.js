import { INIT_SOCKET, TERMINATE_SOCKET, UPDATE_HOST_INTERNET_ACCESS,
			GET_CONNECTED_DEVICES, UPDATE_CONNECTED_DEVICES } from "../actions/SocketActions";

export default (state = null, action) => {

	var updatedState = Object.assign({}, state);

	switch(action.type) {

		case INIT_SOCKET:
			if(!updatedState.socket) {
				updatedState.socket = (updatedState.socket) || io();
				updatedState.socket.emit("Host/Connection");
			}
			break;

		case TERMINATE_SOCKET:
			// console.log("ASDASDASDASDASDSADASSDDAS");
			if(updatedState.socket) {
				updatedState.socket.emit("Host/Disconnect");
			}
			break;

		case UPDATE_HOST_INTERNET_ACCESS:
			updatedState.internetAccess = action.payload.internetAccess;
			break;

		case GET_CONNECTED_DEVICES:
			updatedState.socket.emit("Get/Connected_Devices");
			break;

		case UPDATE_CONNECTED_DEVICES:
			updatedState.connectedDevices = action.payload.connectedDevices;
			break;
	}

	return updatedState;
};
