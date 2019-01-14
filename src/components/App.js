import React, { Component } from 'react';
import './App.scss';

class App extends Component {
	render() {
		return (
			<div className="App container">

				<header className="Header">
					<h1>Emoticons</h1>
					<h2>Copy the emoticon and paste it where you need it</h2>
				</header>

				<form className="SearchBar">
					<input type="text" placeholder="Search Emoticons..." />
				</form>

				<table className="EmoticonsTable">
					<thead>
						<tr>
							<th>Face</th>
							<th>Emoticon Name</th>
							<th>Get</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>😷</td>
							<td>Face Medical Mask</td>
							<td>
								<button className="CopyEmoticon">Copy</button>
							</td>
						</tr>
					</tbody>
				</table>
				
				<footer className="Footer">
					<p className="author">By: <a href="https://danieldogeanu.com" target="_blank">Daniel Dogeanu</a></p>
					<p className="mynets">Follow Me: 
						<span>
							<a href="#" target="_blank">Twitter</a>
							<a href="#" target="_blank">GitHub</a>
							<a href="#" target="_blank">Behance</a>
						</span>
					</p>
				</footer>

			</div>
		);
	}
}

export default App;
