import React, { Component } from "react";

const InformationMessage = ({messageText = "Hello", windowContainerStyles = {top: 0}, messageContainerClassName = "message_container", closeMessageHandler = null }) => {

	return (
		<div className = "message_window_container" style = { windowContainerStyles }>
			<div className = { messageContainerClassName }>
				<i className = "fa fa-times close_message_button" aria-hidden = "true" onClick = { closeMessageHandler }></i>
				<h3>
					{ messageText }
				</h3>
			</div>
		</div>
	)
}

export default InformationMessage;