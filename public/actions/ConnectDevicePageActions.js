import APIManager from "../utils/APIManager";

export const SHOW_LOADING_IMAGE = "SHOW/LOADING_IMAGE";
export const HIDE_LOADING_IMAGE = "HIDE/LOADING_IMAGE";
export const TOGGLE_LOADING_IMAGE = "TOGGLE/LOADING_IMAGE";

export const SHOW_ERROR_MESSAGE = "SHOW/ERROR_MESSAGE";
export const HIDE_ERROR_MESSAGE = "HIDE/ERROR_MESSAGE";

export const GET_SERVER_INFO_SUCCESS = "GET/SERVER_INFO/SUCCESS";
export const GET_SERVER_INFO_FAILED = "GET/SERVER_INFO/FAILED";

export const toggleLoadingImage = (loadingImageVisible) => ({
	type: TOGGLE_LOADING_IMAGE,
	payload: {
		loadingImageVisible: !loadingImageVisible
	}
});

export const showLoadingImage = () => ({
	type: SHOW_LOADING_IMAGE,
	payload: {}
});

export const hideLoadingImage = () => ({
	type: HIDE_LOADING_IMAGE,
	payload: {}
});

export const showErrorMessage = (errorResponse) => ({
	type: SHOW_ERROR_MESSAGE,
	payload: {
		message: errorResponse
	}
});

export const hideErrorMessage = (errorResponse) => ({
	type: HIDE_ERROR_MESSAGE,
	payload: {}
});

export const getServerInfo = (url = "serverInfo") => {
	return (dispatch) => {
		APIManager.get(url)
			.then((response) => {
				dispatch(fetchOperationSuccess(response, GET_SERVER_INFO_SUCCESS));
				dispatch(hideLoadingImage());
			})
			.catch((errorResponse) => {
				dispatch(hideLoadingImage());
				dispatch(showErrorMessage(errorResponse));
			});
	};
};

export const fetchOperationSuccess = (response, actionType) => ({
	type: actionType,
	payload: {
		response
	}
});

export const fetchOperationFailed = (response, actionType) => ({
	type: actionType,
	payload: {
		response
	}
});