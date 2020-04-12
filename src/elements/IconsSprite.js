import React from 'react';
import { ReactComponent as Icons } from '../images/icons.svg';

const IconsSprite = () => (
	<div
		className="IconsSprite"
		data-testid="IconsSprite"
		style={{display: 'none'}}>
		<Icons />
	</div>
);

export default IconsSprite;
