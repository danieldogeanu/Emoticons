import React, { Component } from 'react';
import ClearButton from '../elements/ClearButton';
import '../styles/components/SearchBar.scss';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.searchInput = React.createRef();
	}

	selectSearchInput = (e) => {
		if (e.keyCode === 83) {
			this.searchInput.current.focus();
		}
	}

	handleFilterTextChange = (e) => {
		this.props.onFilterTextChange(e.target.value);
		(e.target.value) ? this.ClearBtnCL.add('show') : this.ClearBtnCL.remove('show');
	}

	handleClearInput = (e) => {
		e.preventDefault();
		this.searchInput.current.value = '';
		this.searchInput.current.blur();
		this.props.onFilterTextClear();
		this.ClearBtnCL.remove('show');
	}

	handleKeyUp = (e) => {
		if (e.keyCode === 27) {
			this.handleClearInput(e);
		}
	}

	handleFocus = () => {
		if (!this.SearchInputCL.contains('focused')) this.SearchInputCL.add('focused');
	}

	handleBlur = () => {
		if (this.SearchInputCL.contains('focused')) this.SearchInputCL.remove('focused');
	}

	componentDidMount() {
		window.addEventListener('keyup', this.selectSearchInput);
		this.ClearBtnCL = document.querySelector('.ClearButton').classList;
		this.SearchInputCL = this.searchInput.current.classList;
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.selectSearchInput);
	}

	render() {
		return (
			<form className="SearchBar"
				data-testid="SearchBar"
				onSubmit={this.handleClearInput}>
				<input type="text"
					data-testid="SearchInput"
					placeholder="Search Emoticons..."
					value={this.props.filterText}
					onChange={this.handleFilterTextChange}
					onKeyUp={this.handleKeyUp}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					ref={this.searchInput} />
				<ClearButton />
			</form>
		);
	}
}

export default SearchBar;
