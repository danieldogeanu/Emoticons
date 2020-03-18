import React from 'react';

const Icon = (props) => (
	<svg className={'icon ' + props.name}>
		<use xlinkHref={'#' + props.name} />
	</svg>
);

export default Icon;
