import React, { Component } from 'react';
import emojiJSON from '../emoji.json';
import IconsSprite from './IconsSprite';
import Header from './Header';
import SearchBar from './SearchBar';
import EmoticonsTable from './EmoticonsTable';
import Footer from './Footer';
import ScrollUp from './ScrollUp';
import ShortcutsButton from './ShortcutsButton';
import ShortcutsScreen from './ShortcutsScreen';
import SelectedScreen from './SelectedScreen';
import './App.scss';

class App extends Component {
	constructor() {
		super();
		this.state = {
			filterText: '',
			emoticons: [],
		};
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleFilterTextClear = this.handleFilterTextClear.bind(this);
	}

	handleFilterTextChange(filterText) {
		this.setState({filterText: filterText});
	}

	handleFilterTextClear() {
		this.setState({filterText: ''});
	}

	componentWillMount() {
		this.setState({emoticons: emojiJSON});
	}

	render() {
		return (
			<div className="App">
				<IconsSprite />
				<Header />
				<SearchBar
					filterText={this.state.filterText}
					onFilterTextChange={this.handleFilterTextChange}
					onFilterTextClear={this.handleFilterTextClear} />
				<EmoticonsTable
					emoticons={this.state.emoticons}
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
