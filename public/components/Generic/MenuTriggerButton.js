import React from "react";

const MenuTriggerButton = ({ onClickHandler = () => {} }) => {
	return (
		<div className = "menu_trigger_button_container">
			<a className = "menu_trigger_button" onClick = { onClickHandler }>
				<span className = "menu_item top_left"></span>
				<span className = "menu_item top_right"></span>
				<span className = "menu_item mid_left"></span>
				<span className = "menu_item mid_right"></span>
				<span className = "menu_item bottom_left"></span>
				<span className = "menu_item bottom_right"></span>
			</a>
		</div>
	);
};

export default MenuTriggerButton;