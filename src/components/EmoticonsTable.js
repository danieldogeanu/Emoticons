import React, { Component } from 'react';
import EmoticonRow from './EmoticonRow';
import './EmoticonsTable.scss';

class EmoticonsTable extends Component {
	render() {
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
					{this.props.emoticons.map((emoticon) => {
						return <EmoticonRow key={emoticon.no} emoticon={emoticon} />
					})}
				</tbody>
			</table>
		);
	}
}

export default EmoticonsTable;