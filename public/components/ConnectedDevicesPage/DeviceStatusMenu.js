import React, { Component } from "react";

import { STATUS_DENIED, STATUS_APPROVED, STATUS_PENDING } from "../../actions/ConnectedDevicesPageActions";

const DeviceStatusMenu = ({updateStatusHandler = null, statusMenuStyles = {}}) => {

	return (
		<div className = "status_menu" style = { statusMenuStyles }>
			<div className = "status_option" onClick = {() => { updateStatusHandler(STATUS_APPROVED) }} >
				Approve
			</div>
			<div className = "status_option" onClick = {() => { updateStatusHandler(STATUS_PENDING) }}>
				Pending
			</div>
			<div className = "status_option" onClick = {() => { updateStatusHandler(STATUS_DENIED) }}>
				Deny
			</div>
		</div>
	);
};

export default DeviceStatusMenu;