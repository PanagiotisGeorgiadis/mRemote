import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Header from "../components/Generic/Header";
import MenuContainer from "../components/Generic/MenuContainer";
import MenuTriggerButton from "../components/Generic/MenuTriggerButton";

import { toggleMainMenu } from "../actions/MainMenuActions";

class MainMenuContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			menuContainerDisplayValue: "none",
			menuOptions: [
				{ 
					text: "Connect Device",
					url: "/"
				},
				{
					text: "Manage Connected Devices",
					url: "/devices"
				},
				{
					text: "Show Processes",
					url: "/processes"
				},
				{
					text: "Show Uploads",
					url: "/uploads"
				},
				{
					text: "Show Tutorial",
					url: "/tutorial"
				}
			]
		};
	}

	componentWillReceiveProps(nextProps) {

		this.setState({
			...nextProps
		});
	}

	componentWillMount() {

		this.setState({
			...this.props
		});
	}

	toggleMenuTriggerButton(event) {
		event.stopPropagation();
		// event.nativeEvent.stopImmediatePropagation();
		this.state.toggleMainMenu(this.state.menuContainerDisplayValue);
	}

	render() {
		console.log("Render function called!!!");
		return(
			<div className = "header_container">
				<Header />
				<MenuTriggerButton onClickHandler = { this.toggleMenuTriggerButton.bind(this) } />
				<MenuContainer menuContainerDisplayValue = { this.state.menuContainerDisplayValue } menuOptions = { this.state.menuOptions } />
			</div>
		);
	}
}

const mapStateToProps = ({MainMenuReducer}) => {
	return {
		...MainMenuReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		toggleMainMenu,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuContainer);