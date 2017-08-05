import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/";
import initialState from "./mRemoteState";

import MainMenuContainer from "./containers/MainMenuContainer.jsx";
import Footer from "./components/Generic/Footer";

import ConnectDevicePageContainer from "./containers/ConnectDevicePageContainer.jsx";

import { hideMainMenu } from "./actions/MainMenuActions";

class MRemoteHost extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	onClickHandler(event) {
		console.log("Implement the hideMainMenu action");
	}

	render() {
		return (
			<Router>
				<div className = "mRemoteContainer" onClick = { this.onClickHandler.bind(this) }>
					<MainMenuContainer />
					<Route exact path = "/" component = { ConnectDevicePageContainer } />
					<Route exact path = "/devices/" component = { ConnectDevicePageContainer } />
					<Route exact path = "/devices/:id" component = { ConnectDevicePageContainer } />
					<Route exact path = "/processes" component = { ConnectDevicePageContainer } />
					<Route exact path = "/uploads" component = { ConnectDevicePageContainer } />
					<Route exact path = "/tutorial" component = { ConnectDevicePageContainer } />
					<Footer />
				</div>
			</Router>
		);
	}
}

var reactRoot = document.getElementById("react-root");
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(<Provider store = { store } >
					<MRemoteHost />
				</Provider>,
				reactRoot);
