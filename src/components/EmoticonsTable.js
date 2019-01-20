import React, { Component } from 'react';
import EmoticonItem from './EmoticonItem';
import './EmoticonsTable.scss';

class EmoticonsTable extends Component {
	constructor() {
		super();
		this.state = {
			emoticons: [],
		};
	}

	componentWillMount() {

		fetch('https://unpkg.com/emoji.json@11.0.1/emoji.json')
			.then(result => result.json())
			.then(data => this.setState({emoticons: data}))
			.catch(error => console.error('Fetch Error: ', error));

	}

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
					{this.state.emoticons.map((emoticon) => {
						return <EmoticonItem key={emoticon.no} emoticon={emoticon} />
					})}
				</tbody>
			</table>
		);
	}
}

export default EmoticonsTable;