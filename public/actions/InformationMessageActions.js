export const SHOW_SUCCESS_INFORMATION_MESSAGE = "SHOW/SUCCESS_INFORMATION_MESSAGE";
export const SHOW_DANGER_INFORMATION_MESSAGE = "SHOW/DANGER_INFORMATION_MESSAGE";
export const SHOW_WARNING_INFORMATION_MESSAGE = "SHOW/WARNING_INFORMATION_MESSAGE";

export const HIDE_INFORMATION_MESSAGE = "HIDE/FAILURE_INFORMATION_MESSAGE";

export const UPDATE_INFORMATION_MESSAGE_TEXT = "UPDATE/INFORMATION_MESSAGE_TEXT";

export const showSuccessInformationMessage = () => ({
	type: SHOW_SUCCESS_INFORMATION_MESSAGE,
	payload: {}
});

export const showDangerInformationMessage = () => ({
	type: SHOW_DANGER_INFORMATION_MESSAGE,
	payload: {}
});

export const showWarningInformationMessage = () => ({
	type: SHOW_WARNING_INFORMATION_MESSAGE,
	payload: {}
});

export const hideInformationMessage = () => ({
	type: HIDE_INFORMATION_MESSAGE,
	payload: {}
});

export const updateInformationMessageText = (messageText) => ({
	type: UPDATE_INFORMATION_MESSAGE_TEXT,
	payload: {
		messageText
	}
});