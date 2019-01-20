import React, { Component } from 'react';
import EmoticonRow from './EmoticonRow';
import './EmoticonsTable.scss';

function InvisibleRow() {
	return <tr className="invisible-row"><td colSpan="3"></td></tr>;
}

class EmoticonsTable extends Component {
	render() {
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
			<table className="EmoticonsTable">
				<thead>
					<tr>
						<th>Face</th>
						<th>Emoticon Name</th>
						<th>Get</th>
					</tr>
				</thead>
				<tbody>
					<InvisibleRow />
					{rows}
				</tbody>
			</table>
		);
	}
}

export default EmoticonsTable;