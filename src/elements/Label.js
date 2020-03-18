import React from 'react';

const Label = (props) => (
	<span className={'Label ' + props.label.class}>
		{props.label.name}
	</span>
);

export default Label;
