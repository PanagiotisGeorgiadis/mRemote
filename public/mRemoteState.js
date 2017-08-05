const defaultMainMenuState = {
	menuContainerDisplayValue: "none"
}

const defaultApplicationState = {
	loadingImageVisible: true,
    errorMessageVisible: false,
	errorMessage: null,
}

const initialState = {
	MainMenuReducer: {
		...defaultMainMenuState
	},
	ConnectDevicePageReducer: {
		...defaultApplicationState,
	},
};

export default initialState;
