import {	SHOW_SUCCESS_INFORMATION_MESSAGE, SHOW_DANGER_INFORMATION_MESSAGE, SHOW_WARNING_INFORMATION_MESSAGE,
			HIDE_INFORMATION_MESSAGE,
			UPDATE_INFORMATION_MESSAGE_TEXT
		} from "../actions/InformationMessageActions";


export default (state = null, action) => {

	var updatedState = Object.assign({}, state);

	switch(action.type) {

		case SHOW_SUCCESS_INFORMATION_MESSAGE:
			updatedState.windowContainerStyles = { top: "4.05em" };
			updatedState.messageContainerClassName = "message_container successful_message";
			break;
		case SHOW_DANGER_INFORMATION_MESSAGE:
			updatedState.windowContainerStyles = { top: "4.05em" };
			updatedState.messageContainerClassName = "message_container failed_message";
			break;
		case SHOW_WARNING_INFORMATION_MESSAGE:
			updatedState.windowContainerStyles = { top: "4.05em" };
			updatedState.messageContainerClassName = "message_container warning_message";
			break;
		case HIDE_INFORMATION_MESSAGE:
			updatedState.windowContainerStyles = {top: "0"};
			break;
		case UPDATE_INFORMATION_MESSAGE_TEXT:
			updatedState.informationMessageText = action.payload.messageText;
			break;
	}

	return updatedState;
};