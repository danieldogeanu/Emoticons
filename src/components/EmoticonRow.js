import React, { Component } from 'react';
import CopyButton from './CopyButton';
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

class EmoticonRow extends Component {
	render() {
		const char = this.props.emoticon.char;
		const name = this.props.emoticon.name;
		return (
			<tr className="EmoticonRow">
				<td><Emoticon emoticon={char} /></td>
				<td>{name}</td>
				<td><CopyButton emoticon={char} /></td>
			</tr>
		);
	}
}

export default EmoticonRow;