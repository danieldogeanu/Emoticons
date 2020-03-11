import React from 'react';

function Label(props) {
	return (
		<span className={'Label ' + props.label.class}>
			{props.label.name}
		</span>
	);
}

export default Label;
