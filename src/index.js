import React from 'react';
import ReactDOM from 'react-dom';
import BrowserDetection from 'react-browser-detection';
import App from './components/App';
import './styles/index.scss';

const browserHandler = {
	ie: () => false,
	default: (browser) => <App browser={browser} />,
};

// TODO: Make sure build command works properly.
// TODO: Make sure coverage works properly.

ReactDOM.render(
	<BrowserDetection>{browserHandler}</BrowserDetection>,
	document.getElementById('root')
);
