export const SHOW_LOADING_IMAGE = "SHOW/LOADING_IMAGE";
export const HIDE_LOADING_IMAGE = "HIDE/LOADING_IMAGE";
export const TOGGLE_LOADING_IMAGE = "TOGGLE/LOADING_IMAGE";

export const showLoadingImage = () => ({
	type: SHOW_LOADING_IMAGE,
	payload: {}
});

export const hideLoadingImage = () => ({
	type: HIDE_LOADING_IMAGE,
	payload: {}
});

export const toggleLoadingImage = (loadingImageVisible) => ({
	type: TOGGLE_LOADING_IMAGE,
	payload: {
		loadingImageVisible: !loadingImageVisible
	}
});