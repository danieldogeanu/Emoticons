import React, { Component } from 'react';
import Icon from './Icon';
import { animateCSS } from '../animate';
import '../styles/components/ShortcutsScreen.scss';

class ShortcutsClose extends Component {
	handleClick = () => {
		animateCSS(this.ShortcutsScreen, 'fadeOut');
		this.ShortcutsButton.classList.remove('hide');
		setTimeout(() => {
			this.ShortcutsScreen.classList.remove('show');
			this.ShortcutsScreen.classList.remove('animated', 'fadeIn', 'fadeOut');
		}, 290);
	}

	componentDidMount() {
		this.ShortcutsScreen = document.querySelector('.ShortcutsScreen');
		this.ShortcutsButton = document.querySelector('.ShortcutsButton');
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
	handleKeyUp = (e) => {
		if (e.keyCode === 27) { // ESC
			if (this.ShortcutsScreenCL.contains('show')) this.ShortcutsScreenCL.remove('show');
			if (this.ShortcutsButtonCL.contains('hide')) this.ShortcutsButtonCL.remove('hide');
		}
		if (e.keyCode === 75 && !this.SearchBarInputCL.contains('focused')) { // K
			(!this.ShortcutsScreenCL.contains('show')) ? this.ShortcutsScreenCL.add('show') : this.ShortcutsScreenCL.remove('show');
			(!this.ShortcutsButtonCL.contains('hide')) ? this.ShortcutsButtonCL.add('hide') : this.ShortcutsButtonCL.remove('hide');
		}
	}

	componentDidMount() {
		this.ShortcutsScreenCL = document.querySelector('.ShortcutsScreen').classList;
		this.ShortcutsButtonCL = document.querySelector('.ShortcutsButton').classList;
		this.SearchBarInputCL = document.querySelector('.SearchBar input[type="text"]').classList;
		window.addEventListener('keyup', this.handleKeyUp);
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.handleKeyUp);
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
