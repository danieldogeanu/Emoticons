import React from 'react';
import { ReactComponent as Icons } from '../images/icons.svg';

function IconsSprite() {
	return (
		<div 
			className="IconsSprite" 
			style={{display: 'none'}}>
			<Icons />
		</div>
	);
}

export default IconsSprite;