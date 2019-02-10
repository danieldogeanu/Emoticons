import React, { Component } from 'react';
import emojiJSON from '../emoji.json';
import IconsSprite from './IconsSprite';
import TopBar from './TopBar.js';
import SearchBar from './SearchBar';
import EmoticonsTable from './EmoticonsTable';
import Footer from './Footer';
import ScrollUp from './ScrollUp';
import ShortcutsButton from './ShortcutsButton';
import ShortcutsScreen from './ShortcutsScreen';
import SelectedScreen from './SelectedScreen';
import '../styles/components/App.scss';

class App extends Component {
	constructor() {
		super();
		this.state = {filterText: ''};
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleFilterTextClear = this.handleFilterTextClear.bind(this);
	}

	handleFilterTextChange(filterText) {
		this.setState({filterText: filterText});
	}

	handleFilterTextClear() {
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
				<EmoticonsTable
					emoticons={emojiJSON}
					filterText={this.state.filterText} />
				<Footer />
				<ScrollUp />
				<ShortcutsButton />
				<ShortcutsScreen />
				<SelectedScreen />
			</div>
		);
	}
}

export default App;
