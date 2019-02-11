import React, { Component } from 'react';
import { animateCSS } from '../animate';
import Icon from './Icon';
import '../styles/components/ShortcutsButton.scss';

class ShortcutsButton extends Component {
	componentDidMount() {
		this.ShortcutsScreen = document.querySelector('.ShortcutsScreen');
		this.ShortcutsButton = document.querySelector('.ShortcutsButton');
	}

	handleClick() {
		animateCSS(this.ShortcutsScreen, 'fadeIn');
		this.ShortcutsScreen.classList.add('show');
		this.ShortcutsButton.classList.add('hide');
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