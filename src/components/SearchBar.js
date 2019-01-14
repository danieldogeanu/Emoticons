import React, { Component } from 'react';
import './SearchBar.scss';

class SearchBar extends Component {
	render() {
		return (
			<form className="SearchBar">
				<input type="text" placeholder="Search Emoticons..." />
			</form>
		);
	}
}

export default SearchBar;