import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { showLoadingImage, hideLoadingImage } from "../actions/SharedActions";
import { initSocketConnection, updateHostInternetAccess, getConnectedDevices, updateConnectedDevices } from "../actions/SocketActions";

import { updateDeviceStatus, updateConnectedDevicesStyles, showDeviceStatusMenu, setSelectedDeviceContainer, setMovingElementSourceKey, setMovingElementDestKey, switchDevices, addConnectedDevice, removeConnectedDevice } from "../actions/ConnectedDevicesPageActions";
import { hideMainMenu } from "../actions/MainMenuActions";

import LoadingImage from "../components/Generic/LoadingImage";
import ConnectedDevicesList from "../components/ConnectedDevicesPage/ConnectedDevicesList";

class ConnectedDevicesPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			listContainerScrollPosition: 0
		};
	}

	initialiseSocketEvents(socket) {

		socket.on("Host/Internet/Access", (internetAccess) => {
			this.state.updateHostInternetAccess(internetAccess);
		});

		socket.on("Device/Connection/Success", (deviceInfo) => {
			this.state.addConnectedDevice(deviceInfo);
		});

		socket.on("Device/Connection/Failure", (deviceInfo) => {
			this.state.removeConnectedDevice(deviceInfo);
		});

		socket.on("Host/Connected_Devices", (connectedDevices) => {
			this.state.updateConnectedDevices(connectedDevices);
			this.state.hideLoadingImage();
		});

		this.setState({
			socketInitialised: true
		});
	}

	onScrollHandler(event) {
		if(event.target.scrollTop !== this.state.listContainerScrollPosition) {
			this.setState({
				listContainerScrollPosition: event.target.scrollTop
			});
		}
	}

	onContextMenuHandler(event, keyValue) {
		event.preventDefault();
		this.state.hideMainMenu();
		this.state.setSelectedDeviceContainer(keyValue);
		this.state.showDeviceStatusMenu(event.nativeEvent.pageX, event.nativeEvent.pageY);
	}

	onDropHandler(keyValue) {
		event.preventDefault();
		this.state.setMovingElementDestKey(keyValue);
		this.state.switchDevices();
	}

	onDragOverHandler(event) {
		event.preventDefault();
		// let targetElement = this.getSelectedDeviceContainer(event.target);
		// if(targetElement !== this.state.sourceMovingElement)
		// 	targetElement.className = "device_container droptarget";
	}

	onDragStartHandler(keyValue) {
		this.state.setMovingElementSourceKey(keyValue);
	}

	statusMenuOnClickHandler(status) {
		this.state.updateDeviceStatus(status);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.socket && !this.state.socketInitialised) {
			this.initialiseSocketEvents(nextProps.socket);
		}

		if(nextProps.connectedDevices && nextProps.connectedDevices.length)
			this.state.updateConnectedDevicesStyles(nextProps.connectedDevices);

		this.setState({
			...nextProps
		});
	}

	componentWillMount() {
		this.props.initSocketConnection();
		this.props.showLoadingImage();
		this.props.getConnectedDevices();

		this.setState({
			...this.props
		});
	}

	render() {
		// console.log(this.state);
		let contents = []

		if(this.state.loadingImageVisible) {
			contents.push(<LoadingImage key = {0} />);
		}

		if(this.state.connectedDevicesDrawable && this.state.connectedDevicesDrawable.length) {
			contents.push(<ConnectedDevicesList key = {Date.now()} connectedDevices = { this.state.connectedDevicesDrawable } onContextMenuHandler = { this.onContextMenuHandler.bind(this) } statusMenuOnClickHandler = { this.statusMenuOnClickHandler.bind(this) } statusMenuStyles = { this.state.deviceStatusMenuStyles } onDragOverHandler = { this.onDragOverHandler.bind(this) } onDragStartHandler = { this.onDragStartHandler.bind(this) } onDropHandler = { this.onDropHandler.bind(this) } onScrollHandler = { this.onScrollHandler.bind(this) } scrollPosition = { this.state.listContainerScrollPosition } />
			);
		}

		return (
			<div className = { "content_container" } >
				{ contents }
			</div>
		);
	}
}

const mapStateToProps = ({ConnectedDevicesPageReducer, SocketReducer, SharedReducer}) => {
	return {
		...ConnectedDevicesPageReducer,
		...SocketReducer,
		...SharedReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		showLoadingImage,
		hideLoadingImage,
		initSocketConnection,
		updateHostInternetAccess,
		getConnectedDevices,
		updateConnectedDevices,
		setSelectedDeviceContainer,
		showDeviceStatusMenu,
		updateDeviceStatus,
		updateConnectedDevicesStyles,
		setMovingElementSourceKey,
		setMovingElementDestKey,
		switchDevices,
		addConnectedDevice,
		removeConnectedDevice,
		hideMainMenu
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedDevicesPage);