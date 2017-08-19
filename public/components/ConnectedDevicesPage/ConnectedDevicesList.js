import React, { Component } from "react";

import DeviceContainer from "./DeviceContainer";
import DeviceStatusMenu from "./DeviceStatusMenu";

// Device info from react-native-device-info:
// Device Name 		=> Used
// Device Model 	=> Used
// System Name 		=> Used
// System Version 	=> Used
// Device Unique ID => Maybe
const ConnectedDevicesList = ({connectedDevices = [], onContextMenuHandler = null, onDragOverHandler = null, onDragStartHandler = null, onDropHandler = null,  statusMenuStyles = {}, statusMenuOnClickHandler = null }) => {

	let devices = connectedDevices.map((device, iterator) => {
		device.key = iterator;
		return <DeviceContainer key = { iterator } deviceContainerClassName = { device.containerClassName } deviceHeader = { "Player " + (iterator + 1) } deviceInfo = { device } onContextMenuHandler = { onContextMenuHandler } onDragOverHandler = { onDragOverHandler } onDragStartHandler = { onDragStartHandler } onDropHandler = { onDropHandler } />
	});

	return (
		<div className = "connected_devices_container">
			{ devices }
			<DeviceStatusMenu key = { 10000 } updateStatusHandler = { statusMenuOnClickHandler } statusMenuStyles = { statusMenuStyles } />
		</div>
	);
}

export default ConnectedDevicesList;