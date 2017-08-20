import React, { Component } from "react";

import DeviceContainer from "./DeviceContainer";
import DeviceStatusMenu from "./DeviceStatusMenu";

// Device info from react-native-device-info:
// Device Name 		=> Used
// Device Model 	=> Used
// System Name 		=> Used
// System Version 	=> Used
// Device Unique ID => Maybe
export default class ConnectedDevicesList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			scrollPosition: 0,
		}
	}

	componentDidUpdate() {
		this.connectedDevicesListContainer.scrollTop = this.state.scrollPosition;
	}

	componentDidMount() {
		this.connectedDevicesListContainer.scrollTop = this.state.scrollPosition;
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			...nextProps
		});
	}

	componentWillMount() {
		this.setState({
			...this.props
		});
	}

	render() {
		let { connectedDevices = [], onContextMenuHandler = null, onDragOverHandler = null, onDragStartHandler = null, onDropHandler = null,  statusMenuStyles = {}, statusMenuOnClickHandler = null, onScrollHandler = null } = this.state;
		let devices = connectedDevices.map((device, iterator) => {
			device.key = iterator;
			return (
				<DeviceContainer key = { iterator } deviceContainerClassName = { device.containerClassName } deviceHeader = { "Player " + (iterator + 1) } deviceInfo = { device } onContextMenuHandler = { onContextMenuHandler } onDragOverHandler = { onDragOverHandler } onDragStartHandler = { onDragStartHandler } onDropHandler = { onDropHandler } />
				);
		});

		return (
			<div ref = { list_container => this.connectedDevicesListContainer = list_container } className = "connected_devices_container" onScroll = { onScrollHandler }>
				{ devices }
				<DeviceStatusMenu key = { 10000 } updateStatusHandler = { statusMenuOnClickHandler } statusMenuStyles = { statusMenuStyles } />
			</div>
		);
	}
}