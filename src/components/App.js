import React, { Component } from 'react';
import emojiJSON from '../emoji.json'; // NOTE: Emoji List Source: https://github.com/amio/emoji.json
import SearchBar from './SearchBar';
import ListContainer from './ListContainer.js';
import ScrollUp from './ScrollUp';
import ShortcutsButton from './ShortcutsButton';
import ShortcutsScreen from './ShortcutsScreen';
import IconsSprite from '../elements/IconsSprite';
import TopBar from '../elements/TopBar.js';
import SelectedScreen from '../elements/SelectedScreen';
import '../styles/components/App.scss';

class App extends Component {
	constructor() {
		super();
		this.state = {filterText: ''};
	}

	handleFilterTextChange = (filterText) => {
		this.setState({filterText: filterText});
	}

	handleFilterTextClear = () => {
		this.setState({filterText: ''});
	}

	render() {
		return (
			<div className="App">
				<IconsSprite />
				<TopBar>
					<SearchBar
						filterText={this.state.filterText}
						onFilterTextChange={this.handleFilterTextChange}
						onFilterTextClear={this.handleFilterTextClear} />
				</TopBar>
				<ListContainer data={emojiJSON}
					filterText={this.state.filterText} />
				<ScrollUp />
				<ShortcutsButton />
				<ShortcutsScreen />
				<SelectedScreen />
			</div>
		);
	}
}

export default App;
