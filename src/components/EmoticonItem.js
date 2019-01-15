import React, { Component } from 'react';
import './EmoticonItem.scss';

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
			dataCopy={props.emoticon}>
			Copy
		</button>
	);
}

class EmoticonItem extends Component {
	render() {
		return (
			<tr className="EmoticonItem">
				<td><Emoticon emoticon="😷" /></td>
				<td>Face Medical Mask</td>
				<td><CopyBtn emoticon="😷" /></td>
			</tr>
		);
	}
}

export default EmoticonItem;