import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { showLoadingImage, hideLoadingImage, toggleLoadingImage,
		 getServerInfo, } from "../actions/ConnectDevicePageActions";

import LoadingImage from "../components/Generic/LoadingImage";
import QRSectionContainer from "../components/ConnectDevicePage/QRSectionContainer";

class ConnectDevicePageContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			...nextProps
		});
	}

	componentWillMount() {
		this.props.showLoadingImage();
		this.props.getServerInfo();
		this.setState({
			...this.props
		});
	}

	render() {
		let contents = [];
		if(this.state.loadingImageVisible)
			contents.push(<LoadingImage key = { 0 } />);

        if(this.state.QRCodeImageSource)
            contents.push(<QRSectionContainer key = { 1 } QRCodeImageSource = { this.state.QRCodeImageSource } toggleButtonText = { "Show Ip Address" } />);

		return(
			<div className = { "content_container" } >
			   { contents }
			</div>
		);
	}
}

const mapStateToProps = ({ConnectDevicePageReducer}) => {
	return {
		...ConnectDevicePageReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		showLoadingImage,
		hideLoadingImage,
		getServerInfo
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectDevicePageContainer);
