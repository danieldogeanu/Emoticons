import React, { Component } from 'react';
import CopyButton from './CopyButton';
import './EmoticonRow.scss';

function Emoticon(props) {
	return (
		<span role="img" 
			className="Emoticon" 
			aria-label={props.name}>
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
				<td><Emoticon emoticon={char} name={name} /></td>
				<td>{name}</td>
				<td><CopyButton emoticon={char} /></td>
			</tr>
		);
	}
}

export default EmoticonRow;