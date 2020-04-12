import React from 'react';
import Icon from '../elements/Icon';
import ScreenReaderText from './ScreenReaderText';

const ClearButton = () => {
	const clearText = 'Clear Input';
	return (
		<button className="ClearButton" title={clearText}>
			<ScreenReaderText text={clearText} />
			<Icon name="close" />
		</button>
	);
}

export default ClearButton;
