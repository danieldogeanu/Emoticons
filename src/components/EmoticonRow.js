import React, { Component } from 'react';
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
		<button 
			className="CopyBtn"
			datacopy={props.emoticon}>
			Copy
		</button>
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