import { TOGGLE_MAIN_MENU } from "../actions/MainMenuActions";

export default (state = null, action) => {

    var updatedState = Object.assign({}, state);

    switch(action.type) {

        case TOGGLE_MAIN_MENU:
            // updatedState.menuContainerDisplayValue = action.payload.menuContainerDisplayValue;
            updatedState.menuContainerDisplayValue = ( action.payload.displayValue === "flex" ) ? "none" : "flex";
            break;
    }

    return updatedState;
};
