import React, { Component } from 'react';
import Icon from './Icon';
import './ShortcutsButton.scss';

class ShortcutsButton extends Component {
	render() {
		const shortcutsButtonText = 'Keyboard Shortcuts';
		return (
			<button className="ShortcutsButton" title={shortcutsButtonText}>
				<span className="show-for-screen-reader">{shortcutsButtonText}</span>
				<Icon name="keyboard" />
			</button>
		);
	}
}

export default ShortcutsButton;