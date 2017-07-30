const defaultApplicationState = {
	loadingImageVisible: true,
    errorMessageVisible: false,
	errorMessage: null,
}

const initialState = {
	LandingPageReducer: {
		...defaultApplicationState,
	},
};

export default initialState;
