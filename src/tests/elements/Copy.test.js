import React from 'react';
import {render} from '@testing-library/react';
import Copy from '../../elements/Copy';

describe('Copy Element', () => {

	it('renders copy element properly', () => {
		const btnText = 'Copy Me';
		const {getByTitle, getByText} = render(<Copy><button>{btnText}</button></Copy>);
		const renderedCopy = getByTitle(/copy the emoticon/i);
		const renderedBtn = getByText(btnText);

		expect(renderedCopy).toBeInTheDocument();
		expect(renderedCopy).toHaveTextContent(btnText);
		expect(renderedCopy).toHaveClass('Copy');
		expect(renderedCopy).toContainElement(renderedBtn);
		expect(renderedCopy).toMatchSnapshot();
	});

});
