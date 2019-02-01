import React, { Component } from 'react';
import { MobileRow, DesktopRow } from './EmoticonRow';
import './EmoticonsTable.scss';

function Label(props) {
	return (
		<th className={'Label ' + props.label.class}>
			<span>{props.label.name}</span>
		</th>
	);
}

function Labels() {
	const labels = [
		{ class: 'faceCell', name: 'Face' },
		{ class: 'nameCell', name: 'Emoticon Name' },
		{ class: 'copyCell', name: 'Get' },
	];
	return (
		<tr className="Labels">
			{labels.map((label) => {
				return <Label key={label.class} label={label} />
			})}
		</tr>
	);
}

function InvisibleRow() {
	return <tr className="InvisibleRow"><td colSpan="3"></td></tr>;
}

class EmoticonsTable extends Component {
	constructor(props) {
		super(props);
		this.state = {isMobile: (window.innerWidth < 481)}
		this.handleResize = this.handleResize.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	// TODO: Optimize this for better performance.
	handleResize() {
		setTimeout(() => {
			this.setState({isMobile: (window.innerWidth < 481)});
		}, 200);
	}

	render() {
		const filterText = this.props.filterText;
		const mobileRows = [];
		const desktopRows = [];

		this.props.emoticons.forEach(emoticon => {
			if (emoticon.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;
			mobileRows.push(<MobileRow key={emoticon.no} emoticon={emoticon} />);
			desktopRows.push(<DesktopRow key={emoticon.no} emoticon={emoticon} />);
		});

		return (
			<div className="EmoticonsTable">
				<table>
					<thead><Labels /></thead>
					<tbody>
						<InvisibleRow />
						{this.state.isMobile ? mobileRows : desktopRows}
					</tbody>
				</table>				
			</div>
		);
	}
}

export default EmoticonsTable;