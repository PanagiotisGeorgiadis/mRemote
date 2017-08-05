import React from "react";

const Header = ({headerClassName = "header_title"}) => {
	return (
		<h2 className = { headerClassName } >
			{ "Welcome to the " }
			<span className = 'mRemote_span'>
				mRemote
			</span>
			{ " control panel" }
		</h2>
	);
}

export default Header;
