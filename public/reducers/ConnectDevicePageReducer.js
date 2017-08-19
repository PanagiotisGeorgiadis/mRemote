import { GET_SERVER_INFO_SUCCESS, GET_SERVER_INFO_FAILED } from "../actions/ConnectDevicePageActions";

export default (state = null, action) => {

    var updatedState = Object.assign({}, state);

    switch(action.type) {

        case GET_SERVER_INFO_SUCCESS:
            updatedState.QRCodeImageSource = action.payload.response.QRCodeImageSource;
            updatedState.serverIpAddress = action.payload.response.serverIpAddress;
            break;

        // Refactor this bit here in order to use the InformationMessage stuff.
        /*case GET_SERVER_INFO_FAILED:
            console.error(action.payload.response);
            updatedState.errorMessageVisible = true;
            updatedState.errorMessage = "Failed to fetch server info";
            break;*/

    }

    return updatedState;
};
