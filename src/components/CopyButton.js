import React, { Component } from 'react';
import Clipboard from 'react-clipboard.js';
import './CopyButton.scss';

class CopyButton extends Component {
	render() {
		return (
			<Clipboard
				data-clipboard-text={this.props.emoticon}
				className="CopyButton">
				Copy
			</Clipboard>
		);
	}
}

export default CopyButton;