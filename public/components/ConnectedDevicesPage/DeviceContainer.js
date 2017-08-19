import React, { Component } from "react";

const DeviceContainer = ({onContextMenuHandler, onDragOverHandler, onDropHandler, onDragStartHandler, deviceHeader, deviceInfo}) => {
	let {key, className = "device_container pending", name, model, systemName, systemVersion} = deviceInfo;
	return (
		<div className = { className } onContextMenu = { event => onContextMenuHandler(event, key) } onDragOver = { onDragOverHandler} onDrop = { event => onDropHandler(key) } >
			<h3>{ deviceHeader }</h3>
			<div className = "device_inner_container" draggable = "true" onDragStart = { event => onDragStartHandler(key) }>
				<h3> { name } </h3>
			</div>
		</div>
	);
}

export default DeviceContainer;