import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

export default class mRemoteHost extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    componentWillMount() {

    }

    render() {
        return(
            <Router>
				<div>
                    { "Hello from the mRemoteHost App!" }
				</div>
			</Router>
        );
    }
}

var reactRoot = document.getElementById("react-root");
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(<Provider store = { store } >
					<mRemoteHost />
				</Provider>,
				reactRoot);
