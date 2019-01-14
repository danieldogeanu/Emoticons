import React, { Component } from 'react';
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
					<tr>
						<td>
							<span role="img" aria-label="Face Medical Mask">😷</span>
						</td>
						<td>Face Medical Mask</td>
						<td>
							<button className="CopyBtn">Copy</button>
						</td>
					</tr>
					<tr>
						<td>
							<span role="img" aria-label="Face Medical Mask">😷</span>
						</td>
						<td>Face medical mask</td>
						<td>
							<button className="CopyBtn">Copy</button>
						</td>
					</tr>
					<tr>
						<td>
							<span role="img" aria-label="Face Medical Mask">😷</span>
						</td>
						<td>Face Medical Mask</td>
						<td>
							<button className="CopyBtn">Copy</button>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default EmoticonsTable;