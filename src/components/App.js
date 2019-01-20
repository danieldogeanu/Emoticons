import React, { Component } from 'react';
import IconsSprite from './IconsSprite';
import Header from './Header';
import SearchBar from './SearchBar';
import EmoticonsTable from './EmoticonsTable';
import Footer from './Footer';
import './App.scss';

class App extends Component {
	constructor() {
		super();
		this.state = {
			filterText: '',
			emoticons: [],
		};
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	}

	handleFilterTextChange(filterText) {
		this.setState({filterText: filterText});
	}

	componentWillMount() {
		fetch('https://unpkg.com/emoji.json@11.0.1/emoji.json')
			.then(result => result.json())
			.then(data => this.setState({emoticons: data}))
			.catch(error => console.error('Fetch Error: ', error));
	}

	render() {
		return (
			<div className="App">
				<IconsSprite />
				<Header />
				<SearchBar
					filterText={this.state.filterText}
					onFilterTextChange={this.handleFilterTextChange} />
				<EmoticonsTable
					emoticons={this.state.emoticons}
					filterText={this.state.filterText} />
				<Footer />
			</div>
		);
	}
}

export default App;
