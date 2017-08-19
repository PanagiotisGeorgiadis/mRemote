import {
		 ADD_CONNECTED_DEVICE, REMOVE_CONNECTED_DEVICE,
		 STATUS_DENIED, STATUS_APPROVED, STATUS_PENDING,
		 UPDATE_CONNECTED_DEVICES_STYLES, UPDATE_STATUS, SET_SELECTED_DEVICE,
		 SHOW_DEVICE_STATUS_MENU, HIDE_DEVICE_STATUS_MENU,
		 SET_MOVING_ELEMENT_SOURCE, SET_MOVING_ELEMENT_DESTINATION, SWITCH_DEVICES } from "../actions/ConnectedDevicesPageActions";

export default (state = null, action) => {

	var updatedState = Object.assign({}, state);

	switch(action.type) {

		case ADD_CONNECTED_DEVICE:
			if(!updatedState.connectedDevicesDrawable)
				updatedState.connectedDevicesDrawable = [];

			updatedState.connectedDevicesDrawable.push(action.payload.deviceInfo);
			updatedState.numberOfConnectedDevices = updatedState.connectedDevicesDrawable.length;
			break;

		case REMOVE_CONNECTED_DEVICE:
			for(var i = 0; i < updatedState.connectedDevicesDrawable.length; i++) {
				if(updatedState.connectedDevicesDrawable[i].socketId === action.payload.deviceInfo.socketId)
					updatedState.connectedDevicesDrawable.splice(i, 1);
			}
			updatedState.numberOfConnectedDevices = updatedState.connectedDevicesDrawable.length;
			break;

		case UPDATE_CONNECTED_DEVICES_STYLES:
			updatedState.connectedDevicesDrawable = action.payload.connectedDevicesDrawable;
			break;

		case SET_SELECTED_DEVICE:
			updatedState.selectedDeviceContainerKey = action.payload.key;
			break;

		case UPDATE_STATUS:
			var keyValue = updatedState.selectedDeviceContainerKey;

			if(action.payload.status === STATUS_APPROVED) {
				updatedState.connectedDevicesDrawable[keyValue].className = "device_container approved";
			} else if (action.payload.status === STATUS_DENIED) {
				updatedState.connectedDevicesDrawable[keyValue].className = "device_container denied";
			} else {
				updatedState.connectedDevicesDrawable[keyValue].className = "device_container pending";
			}

			break;

		case SHOW_DEVICE_STATUS_MENU:
			updatedState.deviceStatusMenuStyles = {
				display: "flex",
				left: action.payload.pageX + "px",
				top: action.payload.pageY + "px"
			}
			break;

		case HIDE_DEVICE_STATUS_MENU:
			updatedState.deviceStatusMenuStyles = {
				display: "none",
				left: 0,
				top: 0
			}
			break;

		case SET_MOVING_ELEMENT_SOURCE:
			updatedState.sourceMovingElementKey = action.payload.sourceMovingElementKey;
			break;

		case SET_MOVING_ELEMENT_DESTINATION:
			updatedState.destMovingElementKey = action.payload.destMovingElementKey;
			break;

		case SWITCH_DEVICES:
			let { sourceMovingElementKey, destMovingElementKey} = updatedState;
			let tempValue = Object.assign({}, updatedState.connectedDevicesDrawable[destMovingElementKey]);

			updatedState.connectedDevicesDrawable[destMovingElementKey] = Object.assign({}, updatedState.connectedDevicesDrawable[sourceMovingElementKey]);
			updatedState.connectedDevicesDrawable[sourceMovingElementKey] = Object.assign({}, tempValue);
			updatedState.sourceMovingElementKey = -1;
			updatedState.destMovingElementKey = -1;
			break;
	}

	return updatedState;
};
