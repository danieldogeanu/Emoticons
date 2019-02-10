import React from 'react';
import './TopBar.scss';

function TopBar(props) {
	return (
		<div className="TopBar">
			<div className="wrapper">
				{props.children}
			</div>
		</div>
	);
}

export default TopBar;