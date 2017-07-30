export const SHOW_LOADING_IMAGE = "SHOW/LOADING/IMAGE";
export const HIDE_LOADING_IMAGE = "HIDE/LOADING/IMAGE";
export const TOGGLE_LOADING_IMAGE = "TOGGLE/LOADING/IMAGE";

export const toggleLoadingImage = (loadingImageVisible) => ({
    type: TOGGLE_LOADING_IMAGE,
    payload: {
        loadingImageVisible: !loadingImageVisible
    }
});

export const showLoadingImage = () => ({
    type: SHOW_LOADING_IMAGE,
    payload: {}
});

export const hideLoadingImage = () => ({
    type: HIDE_LOADING_IMAGE,
    payload: {}
});
