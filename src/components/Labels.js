import React, { Component } from 'react';
import Label from '../elements/Label';

class Labels extends Component {
	constructor() {
		super();
		this.state = {
			labels: [
				{ class: 'face', name: 'Face' },
				{ class: 'name', name: 'Emoticon Name' },
				{ class: 'copy', name: 'Get' },
			]
		};
	}

	render() {
		return (
			<div className="Labels">
				{this.state.labels.map(label => {
					return <Label key={label.class} label={label} />
				})}
			</div>
		);
	}
}

export default Labels;
