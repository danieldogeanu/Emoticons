import React from 'react';
import CopyButton from './CopyButton';
import Emoticon from '../elements/Emoticon';
import '../styles/components/ListItem.scss';

function Name(props) {
	return (
		<span className="Name">
			{props.name}
		</span>
	);
}

function Copy(props) {
	const hint = 'Copy the emoticon and paste it where you need it.';
	return (
		<span className="Copy" title={hint}>
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

export function MobileListItem(props) {
	const {char, name} = props.data;
	return (
		<li className="MobileListItem">
			<CopyButton data={char} className="mobileCard ripple">
				<Name name={name} />
				<div className="bottomBar">
					<Emoticon char={char} name={name} />
					<CopyHint text="Tap to Copy" />
				</div>
			</CopyButton>
		</li>
	);
}
