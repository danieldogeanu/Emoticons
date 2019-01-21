import React, { Component } from 'react';
import EmoticonRow from './EmoticonRow';
import './EmoticonsTable.scss';

function InvisibleRow() {
	return <tr className="invisible-row"><td colSpan="3"></td></tr>;
}

class EmoticonsTable extends Component {
	render() {
		const ths = ['Face', 'Emoticon Name', 'Get'];
		const filterText = this.props.filterText;
		const rows = [];

		this.props.emoticons.forEach(emoticon => {
			if (emoticon.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;
			rows.push(
				<EmoticonRow 
					key={emoticon.no}
					emoticon={emoticon} />
			);
		});

		return (
			<div className="EmoticonsTable">
				<table>
					<thead>
						<tr>{ths.map((title, i) => <th key={i}>{title}</th>)}</tr>
					</thead>
					<tbody>
						<InvisibleRow />{rows}
					</tbody>
				</table>				
			</div>
		);
	}
}

export default EmoticonsTable;