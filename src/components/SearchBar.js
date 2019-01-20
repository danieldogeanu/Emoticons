import React, { Component } from 'react';
import './SearchBar.scss';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.searchInput = React.createRef();
		this.selectSearchInput = this.selectSearchInput.bind(this);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	}

	componentDidMount() {
		window.addEventListener('keyup', this.selectSearchInput);
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.selectSearchInput);
	}

	selectSearchInput(e) {
		if (e.keyCode === 83) {
			this.searchInput.current.focus();
		}
	}

	handleFilterTextChange(e) {
		this.props.onFilterTextChange(e.target.value);
	}

	render() {
		return (
			<form className="SearchBar">
				<input type="text" 
					placeholder="Search Emoticons..."
					value={this.props.filterText}
					onChange={this.handleFilterTextChange}
					ref={this.searchInput} />
			</form>
		);
	}
}

export default SearchBar;