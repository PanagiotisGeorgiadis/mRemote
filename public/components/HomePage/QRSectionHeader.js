import React from "react";

const QRSectionHeader = () => {
	return (
		<h3 className = "QR_section_header">
			{ "Open the" }
			<span className = "mRemote_span">
				{ " mRemote " }
			</span>
			{ "app and scan the QR Code" }
		</h3>
	);
};

export default QRSectionHeader;