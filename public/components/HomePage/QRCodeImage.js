import React from "react";

const QRCodeImage = ({QRCodeImageSource}) => {
	return (
		<img className = "QR_code_image" alt = "If there is no image shown please click the button below." src = { QRCodeImageSource } />
	);
};

export default QRCodeImage;