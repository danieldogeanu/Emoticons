import React from 'react';
import '../styles/components/ListItem.scss';

export function ListItem(props) {
	return (
		<li className="ListItem">
			{props.data}
		</li>
	);
}
