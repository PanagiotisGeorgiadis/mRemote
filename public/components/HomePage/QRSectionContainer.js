import React from "react";

import QRSectionHeader from "./QRSectionHeader";
import QRCodeImage from "./QRCodeImage";
import ToggleButton from "./ToggleButton";

const QRSectionContainer = ({QRCodeImageSource, toggleButtonText}) => {
	return (
		<div className = "QR_section_container">
			<QRSectionHeader />
			<QRCodeImage QRCodeImageSource = { QRCodeImageSource }/>
			<ToggleButton toggleButtonText = { toggleButtonText } />
		</div>
	);
};

export default QRSectionContainer;