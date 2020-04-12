import React from 'react';
import {render} from '@testing-library/react';
import {author, social} from '../../details.json';
import Footer from '../../elements/Footer';

describe('Footer Element', () => {

	it('renders footer element properly', () => {
		const {container} = render(<Footer />);
		const renderedFooter = container.querySelector('footer');

		expect(renderedFooter).toBeInTheDocument();
		expect(renderedFooter).toHaveClass('Footer');
		expect(renderedFooter).toMatchSnapshot();
	});

	it('contains author section', () => {
		const {getByTestId} = render(<Footer />);
		const renderedAuthor = getByTestId('author');
		const renderedLink = renderedAuthor.querySelector('a');

		expect(renderedAuthor).toBeInTheDocument();
		expect(renderedAuthor).toHaveClass('author');
		expect(renderedAuthor).toHaveTextContent('By: ' + author.name);
		expect(renderedAuthor).toContainElement(renderedLink);
		expect(renderedLink).toHaveAttribute('href', author.url);
	});

	it('contains social section', () => {
		const netsClass = 'mynets';
		const {getByTestId, getByText, getAllByTestId} = render(<Footer />);
		const renderedNets = getByTestId(netsClass);
		const renderedFollow = getByText(/follow me/i);
		const renderedWrapper = getByTestId('wrapper');
		const renderedLinks = getAllByTestId('mynet');

		expect(renderedNets).toBeInTheDocument();
		expect(renderedNets).toHaveClass(netsClass);
		expect(renderedNets).toContainElement(renderedFollow);
		expect(renderedNets).toContainElement(renderedWrapper);

		expect(renderedFollow).toHaveClass('folw');
		expect(renderedFollow).toHaveTextContent('Follow Me:');

		expect(renderedWrapper).toHaveClass('wrapper');
		expect(renderedLinks.length).toBe(4);
	});

	it('contains all social networks', () => {
		const {getAllByTestId} = render(<Footer />);
		const renderedNets = getAllByTestId('mynet');

		renderedNets.forEach((net, i) => {
			expect(net).toHaveTextContent(social[i].name);
		});
	});

});
