import React from 'react';
import '../styles/components/TopBar.scss';

const TopBar = (props) => (
	<div className="TopBar">
		<div className="wrapper">
			{props.children}
		</div>
	</div>
);

export default TopBar;
