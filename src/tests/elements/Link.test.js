import React from 'react';
import {render} from '@testing-library/react';
import {author, social} from '../../details.json';
import Link from '../../elements/Link';

describe('Link Element', () => {

	it('renders author link element properly', () => {
		const linkId = 'Link';
		const {getByTestId} = render(<Link data={author} />);
		const renderedLink = getByTestId(linkId);

		expect(renderedLink).toBeInTheDocument();
		expect(renderedLink).toHaveTextContent(author.name);
		expect(renderedLink).toHaveAttribute('href', author.url);
		expect(renderedLink).toHaveAttribute('rel', 'noopener noreferrer');
		expect(renderedLink).toHaveAttribute('target', '_blank');
		expect(renderedLink).toMatchSnapshot();
	});

	it('renders social link element properly', () => {
		const linkId = 'Link';
		const {name, url} = social[0];
		const {getByTestId, getByText, container} = render(<Link data={social[0]} social="true" />);
		const renderedLink = getByTestId(linkId);
		const renderedWrapper = getByTestId('Wrapper');
		const renderedSRText = getByText(name);
		const renderedIcon = container.querySelector('svg');

		expect(renderedLink).toBeInTheDocument();
		expect(renderedLink).toHaveAttribute('href', url);
		expect(renderedLink).toHaveAttribute('rel', 'noopener noreferrer');
		expect(renderedLink).toHaveAttribute('target', '_blank');
		expect(renderedLink).toContainElement(renderedWrapper);
		expect(renderedLink).toMatchSnapshot();

		expect(renderedWrapper).toHaveClass('mynet');
		expect(renderedWrapper).toContainElement(renderedSRText);
		expect(renderedWrapper).toContainElement(renderedIcon);

		expect(renderedSRText).toHaveTextContent(name);
		expect(renderedSRText).toHaveClass('show-for-screen-reader');

		expect(renderedIcon).toHaveClass('icon', name.toLowerCase());
	});

});
