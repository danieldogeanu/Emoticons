import React from 'react';

function Icon(props) {
	return (
		<svg className={'icon ' + props.name}>
			<use xlinkHref={'#' + props.name} />
		</svg>
	);
}

export default Icon;