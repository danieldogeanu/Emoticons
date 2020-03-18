import React from 'react';
import Icon from './Icon';

const Link = (props) => (
	<a href={props.data.url}
		target="_blank"
		rel="noopener noreferrer">
		{props.social ? (
			<span className="mynet">
				<span className="show-for-screen-reader">{props.data.name}</span>
				<Icon name={props.data.name.toLowerCase()} />
			</span>
		) : (props.data.name)}
	</a>
);

export default Link;
