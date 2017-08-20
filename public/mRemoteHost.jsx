import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { createStore, applyMiddleware, bindActionCreators } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/";
import initialState from "./mRemoteState";

import MainMenuContainer from "./containers/MainMenuContainer.jsx";
import Footer from "./components/Generic/Footer";

import HomePage from "./containers/HomePage.jsx";
import ConnectedDevicesPage from "./containers/ConnectedDevicesPage.jsx";

import { hideMainMenu } from "./actions/MainMenuActions";
import { hideDeviceStatusMenu } from "./actions/ConnectedDevicesPageActions";
import { terminateSocketConnection } from "./actions/SocketActions";

class mRemoteHost extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	onClickHandler(event) {
		this.state.hideMainMenu();
		this.state.hideDeviceStatusMenu();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			...nextProps
		});
	}

	componentWillMount() {
		window.addEventListener("unload", () => {
			this.state.terminateSocketConnection();
		});
		this.setState({
			...this.props
		});
	}

	render() {
		return (
			<Router>
				<div className = "mRemoteContainer" onClick = { this.onClickHandler.bind(this) }>
					<MainMenuContainer />
					<Route exact path = "/" component = { HomePage } />
					<Route exact path = "/connected_devices" component = { ConnectedDevicesPage } />
					<Route exact path = "/devices/:id" component = { HomePage } />
					<Route exact path = "/processes" component = { HomePage } />
					<Route exact path = "/uploads" component = { HomePage } />
					<Route exact path = "/tutorial" component = { HomePage } />
					<Route exact path = "/settings" component = { HomePage } />
					<Route exact path = "/systemInfo" component = { HomePage } />
					<Footer />
				</div>
			</Router>
		);
	}
}

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		hideMainMenu,
		hideDeviceStatusMenu,
		terminateSocketConnection
	}, dispatch);
};

const MRemoteHostApp = connect(mapStateToProps, mapDispatchToProps)(mRemoteHost);
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
export default MRemoteHostApp;

var reactRoot = document.getElementById("react-root");
ReactDOM.render(<Provider store = { store } >
					<MRemoteHostApp />
				</Provider>,
				reactRoot);
