import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { showLoadingImage, hideLoadingImage, toggleLoadingImage } from "../actions/LandingPageActions";

// import Header from "../components/Generic/Header";

class LandingPageContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div style = {{backgroundColor: "black", height: "100vh", width: "100vw"}}>
                <h2>{"RANDOM TEXT HERE"}</h2>
            </div>
        );
    }
}

const mapStateToProps = ({LandingPageReducer}) => {

    return {
        ...LandingPageReducer
    }
};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContainer);
