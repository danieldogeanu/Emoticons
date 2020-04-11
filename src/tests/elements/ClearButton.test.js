import React from 'react';
import {render} from '@testing-library/react';
import ClearButton from '../../elements/ClearButton';

describe('ClearButton Element', () => {

	it('clear button renders properly', () => {
		const btnTitle = 'Clear Input';
		const {getByTitle, getByText, container} = render(<ClearButton />);
		const renderedBtn = getByTitle(btnTitle);
		const renderedSRTxt = getByText(btnTitle);
		const renderedSVG = container.querySelector('svg');

		// Full Rendered Button
		expect(renderedBtn).toBeInTheDocument();
		expect(renderedBtn).toHaveClass('ClearButton');
		expect(renderedBtn).toContainElement(renderedSRTxt);
		expect(renderedBtn).toContainElement(renderedSVG);
		expect(renderedBtn).toMatchSnapshot();

		// Screen Reader Text
		expect(renderedSRTxt).toBeInTheDocument();
		expect(renderedSRTxt).toHaveClass('show-for-screen-reader');

		// SVG Icon
		expect(renderedSVG).toBeInTheDocument();
		expect(renderedSVG).toHaveClass('icon', 'close');
	});

});
