import React from 'react';
import Icon from '../elements/Icon';

function ClearButton() {
	const clearText = 'Clear Input';
	return (
		<button className="ClearButton" title={clearText}>
			<span className="show-for-screen-reader">{clearText}</span>
			<Icon name="close" />
		</button>
	);
}

export default ClearButton;
