import React from 'react';

function Emoticon(props) {
	return (
		<span role="img"
			className="Emoticon"
			aria-label={props.name}>
			{props.char}
		</span>
	);
}

export default Emoticon;
