import React from 'react';

function Copy(props) {
	const hint = 'Copy the emoticon and paste it where you need it.';
	return (
		<span className="Copy" title={hint}>
			{props.children}
		</span>
	);
}

export default Copy;
