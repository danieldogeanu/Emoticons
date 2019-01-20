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
			emoticons: [],
		};
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
				<SearchBar />
				<EmoticonsTable
					emoticons={this.state.emoticons} />
				<Footer />
			</div>
		);
	}
}

export default App;
