import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/";
import initialState from "./mRemoteState";

import Header from "./components/Generic/Header";

import LandingPageContainer from "./containers/LandingPageContainer.jsx";

export default class MRemoteHost extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Router>
				<div className = "mRemoteContainer">
					<Header />
					<Route exact path = "/" component = { LandingPageContainer } />
					<Route exact path = "/devices/" component = { LandingPageContainer } />
					<Route exact path = "/devices/:id" component = { LandingPageContainer } />
					<Route exact path = "/processes" component = { LandingPageContainer } />
					<Route exact path = "/uploads" component = { LandingPageContainer } />
					<Route exact path = "/tutorial" component = { LandingPageContainer } />
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
