const defaultMainMenuState = {
	menuContainerDisplayValue: "none"
}

const defaultApplicationState = {
	loadingImageVisible: true,
}

const defaultSocketState = {
	internetAccess: true,
}

const initialState = {
	MainMenuReducer: {
		...defaultMainMenuState
	},
	HomePageReducer: {
		...defaultApplicationState,
	},
	SocketReducer: {
		...defaultSocketState,
	}
};

export default initialState;
