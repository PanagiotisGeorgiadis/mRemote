import React from "react";

import MenuTriggerButton from "./MenuTriggerButton";
import MenuContainer from "./MenuContainer";

const Header = ({headerContainerClassName = "header_container", headerClassName = "header_title", headerText = "Welcome"}) => {

    return (
        <div className = { headerContainerClassName } >
            <h2 className = { headerClassName } >
            	{ "Welcome to the " }
            		<span className = 'mRemote_span'>mRemote</span>
            	{ " control panel" }
            </h2>
            <MenuTriggerButton />
            <MenuContainer />
        </div>
    );
}

export default Header;
