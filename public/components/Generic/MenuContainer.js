import React from "react";

import MenuContainerOption from "./MenuContainerOption";

const MenuContainer = ({menuContainerDisplayValue = "none", menuOptions = []}) => {

	let MenuOptions = menuOptions.map(({text, url}, iterator) => {
		return <MenuContainerOption key = { iterator } menuOptionText = { text } menuOptionUrl = { url } />
	});
	return (
		<div className = "menu_container" style = {{ display: menuContainerDisplayValue }}>
			{ MenuOptions }
		</div>
	);
}

export default MenuContainer;