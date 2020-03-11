import React, { Component } from 'react';
import Link from '../elements/Link';
import '../styles/components/Footer.scss';

class Footer extends Component {
	constructor() {
		super();
		this.state = {
			author: { name: 'Daniel Dogeanu', url: 'https://danieldogeanu.com' },
			social: [
				{ name: 'Twitter', url: 'https://twitter.com/danieldogeanu' },
				{ name: 'GitHub', url: 'https://github.com/danieldogeanu' },
				{ name: 'Behance', url: 'https://behance.net/danieldogeanu' },
			]
		};
	}

	render() {
		const {author, social} = this.state;
		return (
			<footer className="Footer">
				<p className="author">By: <Link data={author} /></p>
				<p className="mynets">
					<span className="folw">Follow Me: </span>
					<span className="wrapper">
						{social.map((value) => {
							return <Link key={value.name.toLowerCase()} data={value} social={true} />;
						})}
					</span>
				</p>
			</footer>
		);
	}
}

export default Footer;
