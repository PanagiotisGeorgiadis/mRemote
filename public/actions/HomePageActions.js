import APIManager from "../utils/APIManager";

import { hideLoadingImage } from "./SharedActions";

export const GET_SERVER_INFO_SUCCESS = "GET/SERVER_INFO/SUCCESS";
export const GET_SERVER_INFO_FAILED = "GET/SERVER_INFO/FAILED";

export const getServerInfo = (url = "serverInfo") => {
	return (dispatch) => {
		APIManager.get(url)
			.then((response) => {
				dispatch(fetchOperationSuccess(response, GET_SERVER_INFO_SUCCESS));
				dispatch(hideLoadingImage());
			})
			.catch((errorResponse) => {
				dispatch(hideLoadingImage());
				// Refactor this bit here in order to use the InformationMessage stuff.
				//dispatch(showErrorMessage(errorResponse));
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