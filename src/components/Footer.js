import React from 'react';
import './Footer.scss';

function Footer() {
	return (
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
	);
}

export default Footer;