import React from 'react';
import CopyButton from './CopyButton';
import Emoticon from '../elements/Emoticon';
import Name from '../elements/Name';
import Copy from '../elements/Copy';
import CopyHint from '../elements/CopyHint';
import '../styles/components/ListItem.scss';

export const DesktopListItem = ({data: {char, name}, style}) => (
	<li className="DesktopListItem" data-testid="DesktopListItem" style={style}>
		<Emoticon char={char} name={name} />
		<Name name={name} />
		<Copy>
			<CopyButton data={char} />
		</Copy>
	</li>
);

export const MobileListItem = ({data: {char, name}, style}) => (
	<li className="MobileListItem" data-testid="MobileListItem" style={style}>
		<CopyButton data={char} className="mobileCard ripple">
			<Name name={name} />
			<div className="bottomBar">
				<Emoticon char={char} name={name} />
				<CopyHint text="Tap to Copy" />
			</div>
		</CopyButton>
	</li>
);
