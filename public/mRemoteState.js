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
	ConnectDevicePageReducer: {
		...defaultApplicationState,
	},
	SocketReducer: {
		...defaultSocketState,
	}
};

export default initialState;
