import { SHOW_LOADING_IMAGE, HIDE_LOADING_IMAGE, TOGGLE_LOADING_IMAGE,
         SHOW_ERROR_MESSAGE, HIDE_ERROR_MESSAGE,
         GET_SERVER_INFO_SUCCESS, GET_SERVER_INFO_FAILED } from "../actions/ConnectDevicePageActions";

export default (state = null, action) => {

    var updatedState = Object.assign({}, state);

    switch(action.type) {

        case SHOW_LOADING_IMAGE:
            updatedState.loadingImageVisible = true;
            break;

        case HIDE_LOADING_IMAGE:
            updatedState.loadingImageVisible = false;
            break;

        case TOGGLE_LOADING_IMAGE:
            updatedState.loadingImageVisible = action.payload.loadingImageVisible;
            break;

        case SHOW_ERROR_MESSAGE:
            updatedState.errorMessageVisible = true;
            updatedState.errorMessage = action.payload.errorMessage;
            break;

        case HIDE_ERROR_MESSAGE:
            updatedState.errorMessageVisible = false;
            updatedState.errorMessage = null;
            break;

        case GET_SERVER_INFO_SUCCESS:
            updatedState.QRCodeImageSource = action.payload.response.QRCodeImageSource;
            updatedState.serverIpAddress = action.payload.response.serverIpAddress;
            break;

        case GET_SERVER_INFO_FAILED:
            console.error(action.payload.response);
            updatedState.errorMessageVisible = true;
            updatedState.errorMessage = "Failed to fetch server info";
            break;

    }

    return updatedState;
};
