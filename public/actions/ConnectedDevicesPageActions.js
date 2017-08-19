export const STATUS_DENIED = "STATUS/DENY";
export const STATUS_APPROVED = "STATUS/APPROVE";
export const STATUS_PENDING = "STATUS/PENDING";

export const UPDATE_STATUS = "UPDATE/STATUS";
export const UPDATE_CONNECTED_DEVICES_STYLES = "UPDATE/CONNECTED_DEVICES/STYLES";
export const SET_SELECTED_DEVICE = "SET/SELECTED_DEVICE";
export const SHOW_DEVICE_STATUS_MENU = "SHOW/DEVICE_STATUS_MENU";
export const HIDE_DEVICE_STATUS_MENU = "HIDE/DEVICE_STATUS_MENU";

export const SET_MOVING_ELEMENT_SOURCE = "SET/MOVING_ELEMENT/SOURCE";
export const SET_MOVING_ELEMENT_DESTINATION = "SET/MOVING_ELEMENT/DESTINATION";
export const SWITCH_DEVICES = "SWITCH/DEVICES";

export const ADD_CONNECTED_DEVICE = "ADD/CONNECTED_DEVICE";
export const REMOVE_CONNECTED_DEVICE = "REMOVE/CONNECTED_DEVICE";

export const addConnectedDevice = (deviceInfo) => ({
	type: ADD_CONNECTED_DEVICE,
	payload: {
		deviceInfo
	}
});

export const removeConnectedDevice = (deviceInfo) => ({
	type: REMOVE_CONNECTED_DEVICE,
	payload: {
		deviceInfo
	}
});

export const updateDeviceStatus = (status) => ({
	type: UPDATE_STATUS,
	payload: {
		status
	}
});

export const updateConnectedDevicesStyles = (connectedDevicesDrawable) => ({
	type: UPDATE_CONNECTED_DEVICES_STYLES,
	payload: {
		connectedDevicesDrawable
	}
});

export const setSelectedDeviceContainer = (key) => ({
	type: SET_SELECTED_DEVICE,
	payload: {
		key
	}
});

export const showDeviceStatusMenu = (pageX, pageY) => ({
	type: SHOW_DEVICE_STATUS_MENU,
	payload: {
		pageX,
		pageY
	}
});

export const hideDeviceStatusMenu = () => ({
	type: HIDE_DEVICE_STATUS_MENU,
	payload: {}
});

export const setMovingElementSourceKey = (sourceMovingElementKey) => ({
	type: SET_MOVING_ELEMENT_SOURCE,
	payload: {
		sourceMovingElementKey
	}
});

export const setMovingElementDestKey = (destMovingElementKey) => ({
	type: SET_MOVING_ELEMENT_DESTINATION,
	payload: {
		destMovingElementKey
	}
});

export const switchDevices = () => ({
	type: SWITCH_DEVICES,
	payload: {}
});
