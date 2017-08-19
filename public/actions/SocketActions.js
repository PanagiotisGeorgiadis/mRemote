export const INIT_SOCKET = "INITIALISE/SOCKET";
export const TERMINATE_SOCKET = "TERMINATE/SOCKET";

export const UPDATE_HOST_INTERNET_ACCESS = "UPDATE/HOST/INTERNET_ACCESS";

export const DEVICE_CONNECTED = "CONNECTED/DEVICE";
export const DEVICE_DISCONNECTED = "DISCONNECTED/DEVICE";

export const GET_CONNECTED_DEVICES = "GET/CONNECTED_DEVICES";
export const UPDATE_CONNECTED_DEVICES = "UPDATE/CONNECTED_DEVICES";

export const SEND_COMMAND = "SEND/COMMAND";

export const initSocketConnection = () => ({
	type: INIT_SOCKET,
	payload: {}
});

export const terminateSocketConnection = () => ({
	type: TERMINATE_SOCKET,
	payload: {}
});

export const updateHostInternetAccess = (data) => ({
	type: UPDATE_HOST_INTERNET_ACCESS,
	payload: {
		...data
	}
});

export const deviceConnected = () => ({
	type: DEVICE_CONNECTED,
	payload: {}
});

export const getConnectedDevices = () => ({
	type: GET_CONNECTED_DEVICES,
	payload: {}
});

export const updateConnectedDevices = (connectedDevices) => ({
	type: UPDATE_CONNECTED_DEVICES,
	payload: {
		connectedDevices
	}
});

export const sendCommand = (command) => ({
	type: SEND_COMMAND,
	payload: {
		command
	}
});
