import React from 'react';
import ReactDOM from 'react-dom';
import BrowserDetection from 'react-browser-detection';
import App from './components/App';
import './styles/index.scss';

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
