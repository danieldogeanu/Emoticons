import React, { Component } from 'react';
import EmoticonItem from './EmoticonItem';
import './EmoticonsTable.scss';

import { emojis } from '../data';

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
					{emojis.map((emoticon) => {
						return <EmoticonItem key={emoticon.no} emoticon={emoticon} />
					})}
				</tbody>
			</table>
		);
	}
}

export default EmoticonsTable;