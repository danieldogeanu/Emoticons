import React, { Component } from 'react';
import Clipboard from 'react-clipboard.js';
import './EmoticonRow.scss';

function Emoticon(props) {
	return (
		<span 
			className="Emoticon" 
			role="img" 
			aria-label="Face Medical Mask">
			{props.emoticon}
		</span>
	);
}

function CopyBtn(props) {
	return (
		<Clipboard
			data-clipboard-text={props.emoticon}
			className="CopyBtn">
			Copy
		</Clipboard>
	);
}

class EmoticonRow extends Component {
	render() {
		const char = this.props.emoticon.char;
		const name = this.props.emoticon.name;
		return (
			<tr className="EmoticonRow">
				<td><Emoticon emoticon={char} /></td>
				<td>{name}</td>
				<td><CopyBtn emoticon={char} /></td>
			</tr>
		);
	}
}

export default EmoticonRow;