import React, { Component } from 'react';
import { animateCSS } from '../animate';
import Icon from '../elements/Icon';
import ScreenReaderText from '../elements/ScreenReaderText';
import '../styles/components/ShortcutsButton.scss';

class ShortcutsButton extends Component {
	handleClick = () => {
		animateCSS(this.ShortcutsScreen, 'fadeIn');
		this.ShortcutsScreen.classList.add('show');
		this.ShortcutsButton.classList.add('hide');
	}

	componentDidMount() {
		this.ShortcutsScreen = document.querySelector('.ShortcutsScreen');
		this.ShortcutsButton = document.querySelector('.ShortcutsButton');
	}

	render() {
		const shortcutsButtonText = 'Keyboard Shortcuts';
		return (
			<button className="ShortcutsButton"
				title={shortcutsButtonText}
				onClick={this.handleClick}>
				<ScreenReaderText text={shortcutsButtonText} />
				<Icon name="keyboard" />
			</button>
		);
	}
}

export default ShortcutsButton;
