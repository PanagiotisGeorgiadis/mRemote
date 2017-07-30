import { SHOW_LOADING_IMAGE, HIDE_LOADING_IMAGE, TOGGLE_LOADING_IMAGE } from "../actions/LandingPageActions";

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
    }

    return updatedState;
};
