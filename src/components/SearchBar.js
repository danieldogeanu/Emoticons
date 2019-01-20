import React, { Component } from 'react';
import Icon from './Icon';
import './SearchBar.scss';

function ClearButton() {
	const clearText = 'Clear Input';
	return (
		<button className="ClearButton" title={clearText}>
			<span className="show-for-screen-reader">{clearText}</span>
			<Icon name="close" />
		</button>
	);
}

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.searchInput = React.createRef();
		this.selectSearchInput = this.selectSearchInput.bind(this);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleClearInput = this.handleClearInput.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}
	
	componentDidMount() {
		window.addEventListener('keyup', this.selectSearchInput);
		this.clearBtn = document.querySelector('.ClearButton').classList;
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
		(e.target.value) ? this.clearBtn.add('show') : this.clearBtn.remove('show');
	}

	handleClearInput(e) {
		e.preventDefault();
		this.searchInput.current.value = '';
		this.searchInput.current.blur();
		this.props.onFilterTextClear();
		this.clearBtn.remove('show');
	}

	handleKeyUp(e) {
		if (e.keyCode === 27) {
			this.handleClearInput(e);
		}
	}

	render() {
		return (
			<form className="SearchBar" 
				onSubmit={e => this.handleClearInput(e)}>
				<input type="text" 
					placeholder="Search Emoticons..."
					value={this.props.filterText}
					onChange={this.handleFilterTextChange}
					onKeyUp={this.handleKeyUp}
					ref={this.searchInput} />
				<ClearButton />
			</form>
		);
	}
}

export default SearchBar;