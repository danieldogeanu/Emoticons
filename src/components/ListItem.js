import React, { PureComponent } from 'react';
import CopyButton from './CopyButton';
import Emoticon from '../elements/Emoticon';
import Name from '../elements/Name';
import Copy from '../elements/Copy';
import CopyHint from '../elements/CopyHint';
import '../styles/components/ListItem.scss';

export class DesktopListItem extends PureComponent {
	render() {
		const {index, style, data} = this.props;
		const {char, name} = data[index];

		return (
			<li className="DesktopListItem" data-testid="DesktopListItem" style={style}>
				<Emoticon char={char} name={name} />
				<Name name={name} />
				<Copy>
					<CopyButton data={char} />
				</Copy>
			</li>
		);
	}
}

export class MobileListItem extends PureComponent {
	render() {
		const {index, style, data} = this.props;
		const {char, name} = data[index];

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
	}
}
