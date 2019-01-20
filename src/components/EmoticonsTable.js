import React, { Component } from 'react';
import EmoticonRow from './EmoticonRow';
import './EmoticonsTable.scss';

class EmoticonsTable extends Component {
	render() {
		const filterText = this.props.filterText;
		const rows = [];

		this.props.emoticons.forEach(emoticon => {
			if (emoticon.name.indexOf(filterText) === -1) return;
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
					<tr className="invisible-row"><td colSpan="3"></td></tr>
					{rows}
				</tbody>
			</table>
		);
	}
}

export default EmoticonsTable;