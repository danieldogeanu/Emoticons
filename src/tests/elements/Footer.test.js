import React from 'react';
import {render} from '@testing-library/react';
import {author, social} from '../../details.json';
import Footer from '../../elements/Footer';

const compNames = {
	footer: 'Footer',
}

const compClass = {
	mynets: 'mynets',
	mynet: 'mynet',
	folw: 'folw',
	wrapper: 'wrapper',
	author: 'author',
};

describe('Footer Element', () => {

	it('renders footer element properly', () => {
		const {getByTestId} = render(<Footer />);
		const renderedFooter = getByTestId(compNames.footer);

		expect(renderedFooter).toBeInTheDocument();
		expect(renderedFooter).toHaveClass(compNames.footer);
		expect(renderedFooter).toMatchSnapshot();
	});

	it('contains author section', () => {
		const {getByTestId} = render(<Footer />);
		const renderedAuthor = getByTestId(compClass.author);
		const renderedLink = renderedAuthor.querySelector('a');

		expect(renderedAuthor).toBeInTheDocument();
		expect(renderedAuthor).toHaveClass(compClass.author);
		expect(renderedAuthor).toHaveTextContent('By: ' + author.name);
		expect(renderedAuthor).toContainElement(renderedLink);
		expect(renderedLink).toHaveAttribute('href', author.url);
	});

	it('contains social section', () => {
		const {getByTestId, getByText, getAllByTestId} = render(<Footer />);
		const rendered = {
			nets: getByTestId(compClass.mynets),
			follow: getByText(/follow me/i),
			wrapper: getByTestId(compClass.wrapper),
			links: getAllByTestId(compClass.mynet),
		};

		expect(rendered.nets).toBeInTheDocument();
		expect(rendered.nets).toHaveClass(compClass.mynets);
		expect(rendered.nets).toContainElement(rendered.follow);
		expect(rendered.nets).toContainElement(rendered.wrapper);

		expect(rendered.follow).toHaveClass(compClass.folw);
		expect(rendered.follow).toHaveTextContent('Follow Me:');

		expect(rendered.wrapper).toHaveClass(compClass.wrapper);
		expect(rendered.links.length).toBe(4);
	});

	it('contains all social networks', () => {
		const {getAllByTestId} = render(<Footer />);
		const renderedNets = getAllByTestId(compClass.mynet);

		renderedNets.forEach((net, i) => {
			expect(net).toHaveTextContent(social[i].name);
		});
	});

});
