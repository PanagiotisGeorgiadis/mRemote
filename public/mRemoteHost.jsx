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

import ConnectDevicePageContainer from "./containers/ConnectDevicePageContainer.jsx";

import { hideMainMenu } from "./actions/MainMenuActions";

class mRemoteHost extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	onClickHandler(event) {
		this.state.hideMainMenu();
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
					<Route exact path = "/settings" component = { ConnectDevicePageContainer } />
					<Route exact path = "/systemInfo" component = { ConnectDevicePageContainer } />
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
		hideMainMenu
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
