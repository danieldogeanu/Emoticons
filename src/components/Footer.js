import React from 'react';
import './Footer.scss';

function Footer() {
	return (
		<footer className="Footer">
			<p className="author">By: <a href="https://danieldogeanu.com" target="_blank" rel="noopener noreferrer">Daniel Dogeanu</a></p>
			<p className="mynets">Follow Me: 
				<span>
					<a href="https://twitter.com/danieldogeanu" target="_blank" rel="noopener noreferrer">Twitter</a>
					<a href="https://github.com/danieldogeanu" target="_blank" rel="noopener noreferrer">GitHub</a>
					<a href="https://behance.net/danieldogeanu" target="_blank" rel="noopener noreferrer">Behance</a>
				</span>
			</p>
		</footer>
	);
}

export default Footer;