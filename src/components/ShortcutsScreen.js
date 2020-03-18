import React, { Component } from 'react';
import ShortcutsClose from './ShortcutsClose';
import { shortcuts } from '../details.json';
import '../styles/components/ShortcutsScreen.scss';

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
		return (
			<div className="ShortcutsScreen">
				<div className="shortcutsList">
					<span className="shortcutsTitle">Keyboard Shortcuts</span>
					<ul>
						{shortcuts.map((shortcut) => (
							<li key={shortcut.key}>
								<kbd>{shortcut.key}</kbd>
								{shortcut.description}
							</li>
						))}
					</ul>
					<ShortcutsClose />
				</div>
			</div>
		);
	}
}

export default ShortcutsScreen;
