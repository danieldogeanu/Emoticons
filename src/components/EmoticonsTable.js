import React, { Component } from 'react';
import EmoticonItem from './EmoticonItem';
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
					<EmoticonItem />
					<EmoticonItem />
					<EmoticonItem />
					<EmoticonItem />
				</tbody>
			</table>
		);
	}
}

export default EmoticonsTable;