import React from 'react';
import {render} from '@testing-library/react';
import {author, social} from '../../details.json';
import Footer from '../../elements/Footer';

const compNames = {
	footer: 'Footer',
}

const classNames = {
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
		const renderedAuthor = getByTestId(classNames.author);
		const renderedLink = renderedAuthor.querySelector('a');

		expect(renderedAuthor).toBeInTheDocument();
		expect(renderedAuthor).toHaveClass(classNames.author);
		expect(renderedAuthor).toHaveTextContent('By: ' + author.name);
		expect(renderedAuthor).toContainElement(renderedLink);
		expect(renderedLink).toHaveAttribute('href', author.url);
	});

	it('contains social section', () => {
		const {getByTestId, getByText, getAllByTestId} = render(<Footer />);
		const rendered = {
			nets: getByTestId(classNames.mynets),
			follow: getByText(/follow me/i),
			wrapper: getByTestId(classNames.wrapper),
			links: getAllByTestId(classNames.mynet),
		};

		expect(rendered.nets).toBeInTheDocument();
		expect(rendered.nets).toHaveClass(classNames.mynets);
		expect(rendered.nets).toContainElement(rendered.follow);
		expect(rendered.nets).toContainElement(rendered.wrapper);

		expect(rendered.follow).toHaveClass(classNames.folw);
		expect(rendered.follow).toHaveTextContent('Follow Me:');

		expect(rendered.wrapper).toHaveClass(classNames.wrapper);
		expect(rendered.links.length).toBe(4);
	});

	it('contains all social networks', () => {
		const {getAllByTestId} = render(<Footer />);
		const renderedNets = getAllByTestId(classNames.mynet);

		renderedNets.forEach((net, i) => {
			expect(net).toHaveTextContent(social[i].name);
		});
	});

});
