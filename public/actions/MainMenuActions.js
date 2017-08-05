export const TOGGLE_MAIN_MENU = "TOGGLE/MAIN_MENU";

export const toggleMainMenu = (menuContainerDisplayValue) => ({
    type: TOGGLE_MAIN_MENU,
    payload: {
        displayValue: menuContainerDisplayValue
    }
});

export const hideMainMenu = () => ({
	type: TOGGLE_MAIN_MENU,
	payload: {
		displayValue: "flex"
	}
});
