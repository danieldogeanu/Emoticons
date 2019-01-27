import React, { Component } from 'react';
import { animateCSS } from '../animate';
import Icon from './Icon';
import './ShortcutsButton.scss';

class ShortcutsButton extends Component {	
	handleClick() {
		const shortcutsScreen = document.querySelector('.ShortcutsScreen');
		const shortcutsButton = document.querySelector('.ShortcutsButton');
		animateCSS(shortcutsScreen, 'fadeIn');
		shortcutsScreen.classList.add('show');
		shortcutsButton.classList.add('hide');
	}

	render() {
		const shortcutsButtonText = 'Keyboard Shortcuts';
		return (
			<button className="ShortcutsButton" 
				title={shortcutsButtonText}
				onClick={() => this.handleClick()}>
				<span className="show-for-screen-reader">
					{shortcutsButtonText}
				</span>
				<Icon name="keyboard" />
			</button>
		);
	}
}

export default ShortcutsButton;