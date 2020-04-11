import React from 'react';
import {render} from '@testing-library/react';
import ClearButton from '../../elements/ClearButton';

const btnTitle = 'Clear Input';

describe('ClearButton Element', () => {

	it('renders clear button properly', () => {
		const {getByTitle} = render(<ClearButton />);
		const renderedBtn = getByTitle(btnTitle);

		expect(renderedBtn).toBeInTheDocument();
		expect(renderedBtn).toHaveClass('ClearButton');
		expect(renderedBtn).toMatchSnapshot();
	});

	it('has screen reader text', () => {
		const {getByTitle, getByText} = render(<ClearButton />);
		const renderedBtn = getByTitle(btnTitle);
		const renderedSRTxt = getByText(btnTitle);

		expect(renderedBtn).toContainElement(renderedSRTxt);

		expect(renderedSRTxt).toBeInTheDocument();
		expect(renderedSRTxt).toHaveClass('show-for-screen-reader');
	});

	it('has close svg icon', () => {
		const {getByTitle, container} = render(<ClearButton />);
		const renderedBtn = getByTitle(btnTitle);
		const renderedSVG = container.querySelector('svg');

		expect(renderedBtn).toContainElement(renderedSVG);

		expect(renderedSVG).toBeInTheDocument();
		expect(renderedSVG).toHaveClass('icon', 'close');
	});

});
