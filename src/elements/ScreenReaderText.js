import React from 'react';

const ScreenReaderText = (props) => (
	<span data-testid="ScreenReaderText"
		className="show-for-screen-reader">
		{props.text}
	</span>
);

export default ScreenReaderText;
