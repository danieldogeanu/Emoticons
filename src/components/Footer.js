import React, { Component } from 'react';
import Link from '../elements/Link';
import details from '../details.json';
import '../styles/components/Footer.scss';

class Footer extends Component {
	render() {
		const {author, social} = details;
		return (
			<footer className="Footer">
				<p className="author">By: <Link data={author} /></p>
				<p className="mynets">
					<span className="folw">Follow Me: </span>
					<span className="wrapper">
						{social.map(
							(value) => (<Link
								key={value.name.toLowerCase()}
								data={value} social={true} />)
						)}
					</span>
				</p>
			</footer>
		);
	}
}

export default Footer;
