import React, { Component, Suspense, lazy } from 'react';
import Reactdom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from '../store';

const App  = lazy(() => import('./app.jsx'));
const Login  = lazy(() => import('./login.jsx'));
const Artist  = lazy(() => import('./artist.jsx'));
const Album  = lazy(() => import('./album.jsx'));

Reactdom.render(
	<Provider store={Store}>
		<BrowserRouter>
			<Suspense fallback={<div></div>}>
	        	<Switch>
		            <Route path="/" exact={true} component={App} />
		            <Route path="/login" exact={true} component={Login} />
		            <Route path="/albums/:key" exact={true} component={Artist} />
		            <Route path="/album/:key" exact={true} component={Album} />
	        	</Switch>
	        </Suspense>
	    </BrowserRouter>
    </Provider>
, document.getElementById("app"));