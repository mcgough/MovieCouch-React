import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, useRouterHistory} from 'react-router-dom';
import { createHashHistory } from 'history';
import App from './App.jsx';

const history = createHashHistory();

ReactDOM.render (
	<Router history={history}>
		<Route path="/" component={App}/>
	</Router>,
	document.getElementById('root')
)
// ReactDOM.render(<App />, document.getElementById('root'));