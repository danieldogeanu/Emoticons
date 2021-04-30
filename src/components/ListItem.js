import React from 'react';
import CopyButton from './CopyButton';
import Emoticon from '../elements/Emoticon';
import Name from '../elements/Name';
import Copy from '../elements/Copy';
import CopyHint from '../elements/CopyHint';
import '../styles/components/ListItem.scss';

function ListItem(props) {
	const {data, type, style} = props;
	const {char, name} = data;

	switch (type) {
		case 'desktop':
			return (
				<li className="DesktopListItem" data-testid="DesktopListItem" style={style}>
					<Emoticon char={char} name={name} />
					<Name name={name} />
					<Copy>
						<CopyButton data={char} />
					</Copy>
				</li>
			);
		case 'mobile':
			return (
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
		default:
			return false;
	}
}

export default ListItem;
