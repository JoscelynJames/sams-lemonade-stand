import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;

// this js was being loaded before document was ready.. After looking
// into it for a couple hours I could not find any good solution. When
// I logged document.getElementById('root') right here it was coming up null..
// strangely the application works fine (as it should because in the build directory the static js
// was loaded AFTER the <div> with id of root.) It was only erroring out when testing.
// when I wrapped the ReactDOM.render so that it waits for document to be ready,
// testing worked as well.
document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</ BrowserRouter>
		</Provider>
		, document.getElementById('root')
	);
});

registerServiceWorker();