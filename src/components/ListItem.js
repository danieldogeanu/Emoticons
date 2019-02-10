import React from 'react';
import CopyButton from './CopyButton';
import '../styles/components/ListItem.scss';

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

function Copy(props) {
	return (
		<span className="Copy">
			<CopyButton data={props.data} />
		</span>
	);
}

function CopyHint(props) {
	return (
		<span className="CopyHint">
			{props.text}
		</span>
	);
}

export function DesktopListItem(props) {
	const {char, name} = props.data;
	return (
		<li className="DesktopListItem">
			<Emoticon char={char} name={name} />
			<Name name={name} />
			<Copy data={char} />
		</li>
	);
}