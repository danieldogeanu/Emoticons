import React from 'react';
import CopyButton from './CopyButton';
import './EmoticonRow.scss';

function Emoticon(props) {
	return (
		<span role="img" 
			className="Emoticon" 
			aria-label={props.name}>
			{props.char}
		</span>
	);
}

function Name(props) {
	return (
		<span className="Name">
			{props.name}
		</span>
	);
}

export function DesktopRow(props) {
	const char = props.emoticon.char;
	const name = props.emoticon.name;
	return (
		<tr className="EmoticonRow desktopRow">
			<td className="faceCell"><Emoticon char={char} name={name} /></td>
			<td className="nameCell"><Name name={name} /></td>
			<td className="copyCell"><CopyButton data={char} /></td>
		</tr>
	);
}

// TODO: Refactor this so that the CopyButton includes all elements instead of mobileCard.
export function MobileRow(props) {
	const char = props.emoticon.char;
	const name = props.emoticon.name;
	return (
		<tr className="EmoticonRow mobileRow">
			<td className="mobileCell" colSpan="3">
				<div className="mobileCard">
					<div className="nameCell"><Name name={name} /></div>
					<table className="innerTable">
						<td className="faceCell"><Emoticon char={char} name={name} /></td>
						<td className="copyCell"><CopyButton data={char} /></td>
					</table>				
				</div>
			</td>
		</tr>
	);
}