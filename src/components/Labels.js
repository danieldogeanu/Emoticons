import React from 'react';
import Label from '../elements/Label';
import details from '../details.json';

const Labels = () => (
	<div className="Labels">
		{details.labels.map((label) => (
			<Label key={label.class} label={label} />
		))}
	</div>
);

export default Labels;
