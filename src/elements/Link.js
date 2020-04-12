import React from 'react';
import Icon from './Icon';

const Link = (props) => (
	<a href={props.data.url}
		target="_blank"
		data-testid="Link"
		rel="noopener noreferrer">
		{props.social ? (
			<span className="mynet" data-testid="container">
				<span className="show-for-screen-reader">
					{props.data.name}
				</span>
				<Icon name={props.data.name.toLowerCase()} />
			</span>
		) : (props.data.name)}
	</a>
);

export default Link;
