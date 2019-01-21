import React, { Component } from 'react';
import Icon from './Icon';
import './ShortcutsScreen.scss';

class ShortcutsClose extends Component {	
	handleClick() {
		const shortcutsScreen = document.querySelector('.ShortcutsScreen');
		const shortcutsButton = document.querySelector('.ShortcutsButton');
		shortcutsScreen.classList.remove('show');
		shortcutsButton.classList.remove('hide');
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