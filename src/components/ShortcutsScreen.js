import React, { Component } from 'react';
import Icon from './Icon';
import { animateCSS } from '../animate';
import '../styles/components/ShortcutsScreen.scss';

class ShortcutsClose extends Component {	
	handleClick() {
		const shortcutsScreen = document.querySelector('.ShortcutsScreen');
		const shortcutsButton = document.querySelector('.ShortcutsButton');
		animateCSS(shortcutsScreen, 'fadeOut');
		shortcutsButton.classList.remove('hide');
		setTimeout(() => {
			shortcutsScreen.classList.remove('show');
			shortcutsScreen.classList.remove('animated', 'fadeIn', 'fadeOut');
		}, 290);
	}

	render() {
		const shortcutsCloseText = 'Close Shortcuts Screen';
		return (
			<button className="ShortcutsClose" 
				title={shortcutsCloseText}
				onClick={() => this.handleClick()}>
				<span className="show-for-screen-reader">
					{shortcutsCloseText}
				</span>
				<Icon name="close" />
			</button>
		);
	}
}

class ShortcutsScreen extends Component {
	constructor() {
		super();
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	componentDidMount() {
		window.addEventListener('keyup', this.handleKeyUp);
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.handleKeyUp);
	}

	handleKeyUp(e) {
		const shortcutsScreen = document.querySelector('.ShortcutsScreen').classList;
		const shortcutsButton = document.querySelector('.ShortcutsButton').classList;
		if (e.keyCode === 27) { // ESC
			if (shortcutsScreen.contains('show')) shortcutsScreen.remove('show');
			if (shortcutsButton.contains('hide')) shortcutsButton.remove('hide');
		}
		if (e.keyCode === 75) { // K
			if (!shortcutsScreen.contains('show')) shortcutsScreen.add('show');
			if (!shortcutsButton.contains('hide')) shortcutsButton.add('hide');
		}
	}

	render() {
		const shortcuts = [
			{ key: 's', description: 'Selects Search Input' },
			{ key: 'esc', description: 'Clears Search Input / Exits Menu' },
			{ key: 'k', description: 'Opens Keyboard Shortcuts Screen' },
			{ key: 't', description: 'Scrolls Back Up' },
		];
		return (
			<div className="ShortcutsScreen">
				<div className="shortcutsList">
					<span className="shortcutsTitle">Keyboard Shortcuts</span>
					<ul>
						{shortcuts.map(shortcut => {
							return <li key={shortcut.key}><kbd>{shortcut.key}</kbd> {shortcut.description}</li>;
						})}
					</ul>
					<ShortcutsClose />
				</div>
			</div>
		);
	}
}

export default ShortcutsScreen;