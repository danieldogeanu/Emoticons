import React, { Component } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import EmoticonsTable from './EmoticonsTable';
import Footer from './Footer';
import './App.scss';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<SearchBar />
				<EmoticonsTable />
				<Footer />
			</div>
		);
	}
}

export default App;
