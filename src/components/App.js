import React, { Component } from 'react';
import emojiJSON from 'emoji.json';
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
	constructor(props) {
		super(props);
		this.state = {filterText: ''};
		this.appRef = React.createRef();
	}

	handleFilterTextChange = (filterText) => {
		this.setState({filterText: filterText});
	}

	handleFilterTextClear = () => {
		this.setState({filterText: ''});
	}

	handleBrowser = (browser) => {
		if (browser !== 'ie') {
			const htmlElement = this.appRef.current.parentNode.parentNode.parentNode;
			const htmlClasses = htmlElement.classList;
			const browserUpgrade = htmlElement.querySelector('.browserupgrade');
			if (htmlClasses.contains('ie')) {
				htmlClasses.remove('ie');
				htmlClasses.add(browser);
				browserUpgrade.remove();
			}
		}
	}

	componentDidMount() {
		this.handleBrowser(this.props.browser);
	}

	render() {
		return (
			<div className="App" data-testid="App" ref={this.appRef}>
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
