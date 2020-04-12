import React from 'react';
import Icon from './Icon';
import ScreenReaderText from './ScreenReaderText';

const Link = (props) => (
	<a href={props.data.url}
		target="_blank"
		data-testid="Link"
		rel="noopener noreferrer">
		{props.social ? (
			<span className="mynet" data-testid="container">
				<ScreenReaderText text={props.data.name} />
				<Icon name={props.data.name.toLowerCase()} />
			</span>
		) : (props.data.name)}
	</a>
);

export default Link;
