import React from 'react';
import CopyButton from './CopyButton';
import Emoticon from '../elements/Emoticon';
import Name from '../elements/Name';
import Copy from '../elements/Copy';
import CopyHint from '../elements/CopyHint';
import '../styles/components/ListItem.scss';

export function DesktopListItem(props) {
	const {char, name} = props.data;
	return (
		<li className="DesktopListItem">
			<Emoticon char={char} name={name} />
			<Name name={name} />
			<Copy>
				<CopyButton data={char} />
			</Copy>
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
