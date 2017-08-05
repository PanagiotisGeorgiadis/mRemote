import React from "react";
import { Link } from "react-router-dom";

const MenuContainerOption = ({menuOptionText = "", menuOptionUrl = "/"}) => {
	return (
		<Link to = { menuOptionUrl }>
			<div className = "menu_option">
				{ menuOptionText }
			</div>
		</Link>
	);
}

export default MenuContainerOption;