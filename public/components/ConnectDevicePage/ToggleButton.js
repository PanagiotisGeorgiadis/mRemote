import React from "react";

const ToggleButton = ({toggleButtonText = "Toggle"}) => {
	return (
		<button className = "toggle_QR_button"> 
			{ toggleButtonText }
		</button>
	);
};

export default ToggleButton;