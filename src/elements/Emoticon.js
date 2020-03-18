import React from 'react';

const Emoticon = (props) => (
	<span role="img"
		className="Emoticon"
		aria-label={props.name}>
		{props.char}
	</span>
);

export default Emoticon;
