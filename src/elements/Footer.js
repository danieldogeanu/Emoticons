import React from 'react';
import Link from './Link';
import { author, social } from '../details.json';
import '../styles/components/Footer.scss';

const Footer = () => (
	<footer className="Footer" data-testid="Footer">
		<p className="author" data-testid="author">
			By: <Link data={author} />
		</p>
		<p className="mynets" data-testid="mynets">
			<span className="folw">Follow Me: </span>
			<span className="wrapper" data-testid="wrapper">
				{social.map((value) => (
					<Link key={value.name.toLowerCase()}
								data={value} social={true} />
				))}
			</span>
		</p>
	</footer>
);

export default Footer;
