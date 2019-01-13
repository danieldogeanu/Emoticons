import React from 'react';
import ReactDOM from 'react-dom';
import BrowserDetection from 'react-browser-detection';
import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const browserHandler = {
	ie: () => false,
	default: (browser) => {
		if (browser !== 'ie') {
			let html = document.querySelector('html').classList;
			let browserupgrade = document.querySelector('.browserupgrade');
			if (html.contains('ie')) {
				html.remove('ie');
				html.add(browser);
				browserupgrade.remove();
			}
			return <App />;
		}
	},
};

ReactDOM.render(
	<BrowserDetection>{browserHandler}</BrowserDetection>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
