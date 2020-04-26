import React from 'react';
import {render} from '@testing-library/react';
import {author, social} from '../../details.json';
import Link from '../../elements/Link';

const compNames = {
	link: 'Link',
};

describe('Link Element', () => {

	it('renders author link element properly', () => {
		const {getByTestId} = render(<Link data={author} />);
		const renderedLink = getByTestId(compNames.link);

		expect(renderedLink).toBeInTheDocument();
		expect(renderedLink).toHaveTextContent(author.name);
		expect(renderedLink).toHaveAttribute('href', author.url);
		expect(renderedLink).toHaveAttribute('rel', 'noopener noreferrer');
		expect(renderedLink).toHaveAttribute('target', '_blank');
		expect(renderedLink).toMatchSnapshot();
	});

	it('renders social link element properly', () => {
		const {name, url} = social[0];
		const {getByTestId, getByText, container} = render(<Link data={social[0]} social="true" />);
		const rendered = {
			link: getByTestId(compNames.link),
			container: getByTestId('mynet'),
			srText: getByText(name),
			icon: container.querySelector('svg'),
		};

		expect(rendered.link).toBeInTheDocument();
		expect(rendered.link).toHaveAttribute('href', url);
		expect(rendered.link).toHaveAttribute('rel', 'noopener noreferrer');
		expect(rendered.link).toHaveAttribute('target', '_blank');
		expect(rendered.link).toContainElement(rendered.container);
		expect(rendered.link).toMatchSnapshot();

		expect(rendered.container).toHaveClass('mynet');
		expect(rendered.container).toContainElement(rendered.srText);
		expect(rendered.container).toContainElement(rendered.icon);

		expect(rendered.srText).toHaveTextContent(name);
		expect(rendered.srText).toHaveClass('show-for-screen-reader');

		expect(rendered.icon).toHaveClass('icon', name.toLowerCase());
	});

});
