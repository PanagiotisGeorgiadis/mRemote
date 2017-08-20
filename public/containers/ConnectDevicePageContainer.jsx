import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { showLoadingImage } from "../actions/SharedActions";
import { initSocketConnection, updateHostInternetAccess, getConnectedDevices, updateConnectedDevices } from "../actions/SocketActions";
import { showSuccessInformationMessage, showDangerInformationMessage, hideInformationMessage, updateInformationMessageText } from "../actions/InformationMessageActions";

import { getServerInfo } from "../actions/ConnectDevicePageActions";

import LoadingImage from "../components/Generic/LoadingImage";
import InformationMessage from "../components/Generic/InformationMessage";
import QRSectionContainer from "../components/ConnectDevicePage/QRSectionContainer";

class ConnectDevicePageContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			socketInitialised: false,
			informationMessageTimeout: null,
		};
	}

	clearPreviousTimer() {
		if(this.state.informationMessageTimeout)
			clearTimeout(this.state.informationMessageTimeout);
	}

	closeMessageHandler() {
		this.clearPreviousTimer();
		this.state.hideInformationMessage();
	}

	closeMessageHandlerTimed() {
		this.clearPreviousTimer();
		this.state.informationMessageTimeout = setTimeout(() => {
			this.state.hideInformationMessage();
		}, 5000);
	}

	initialiseSocketEvents(socket) {

		socket.on("Host/Internet/Access", (internetAccess) => {
			this.state.updateHostInternetAccess(internetAccess);
		});

		socket.on("Device/Connection/Success", () => {
			// console.log("%c Device Connected!", "font-size: 16px; color: green;");
			this.state.updateInformationMessageText("Device Connected!");
			this.state.showSuccessInformationMessage();
			this.state.getConnectedDevices();

			this.closeMessageHandlerTimed();
		});

		socket.on("Device/Connection/Failure", () => {
			// console.log("%c Device Disconnected!", "font-size: 16px; color: red;");
			this.state.updateInformationMessageText("Device Disconnected!");
			this.state.showDangerInformationMessage();
			this.state.getConnectedDevices();

			this.closeMessageHandlerTimed();
		});

		socket.on("Host/Connected_Devices", (connectedDevices) => {
			this.state.updateConnectedDevices(connectedDevices);
		});

		this.setState({
			socketInitialised: true
		});
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.socket && !this.state.socketInitialised) {
			this.initialiseSocketEvents(nextProps.socket);
		}

		if(nextProps.internetAccess && !this.state.internetAccess) { // Refresh information after network disconnect.
			nextProps.showLoadingImage();
			nextProps.getServerInfo();
		}

		this.setState({
			...nextProps
		});
	}

	componentWillMount() {
		this.props.initSocketConnection();
		this.props.showLoadingImage();
		this.props.getServerInfo();
		this.props.getConnectedDevices();
		this.setState({
			...this.props
		});
	}

	componentWillUnmount() {
		this.state.hideInformationMessage();
		this.clearPreviousTimer();
	}

	render() {
		let contents = [];

		contents.push(<InformationMessage key = {0} messageText = { this.state.informationMessageText } messageContainerClassName = { this.state.messageContainerClassName } windowContainerStyles = { this.state.windowContainerStyles } closeMessageHandler = { this.closeMessageHandler.bind(this) } />);

		if(this.state.loadingImageVisible) {
			contents.push(<LoadingImage key = {1} />);
		} else if (this.state.QRCodeImageSource) {
			contents.push(<QRSectionContainer key = {1} QRCodeImageSource = { this.state.QRCodeImageSource } toggleButtonText = { "Show Ip Address" } />);
		}

        if(!this.state.internetAccess && this.state.socketInitialised) {
        	// Create the No internet access page.
			contents = <div>{"No Internet Access"}</div>;
        }

		return (
			<div className = { "content_container" } >
				{ contents }
			</div>
		);
	}
}

const mapStateToProps = ({ConnectDevicePageReducer, SocketReducer, SharedReducer, InformationMessageReducer}) => {
	return {
		...ConnectDevicePageReducer,
		...SocketReducer,
		...SharedReducer,
		...InformationMessageReducer,
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		showLoadingImage,
		getServerInfo,
		initSocketConnection,
		updateHostInternetAccess,
		showSuccessInformationMessage,
		showDangerInformationMessage,
		hideInformationMessage,
		updateInformationMessageText,
		getConnectedDevices,
		updateConnectedDevices
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectDevicePageContainer);
