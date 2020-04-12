import React from 'react';
import {render} from '@testing-library/react';
import TopBar from '../../elements/TopBar';

describe('TopBar Element', () => {

	it('renders top bar properly', () => {
		const testId = 'TopBar';
		const childText = 'TopBar Test Child';
		const {getByTestId, getByText} = render(<TopBar>{childText}</TopBar>);
		const renderedTopBar = getByTestId(testId);
		const renderedWrapper = getByText(childText);

		expect(renderedTopBar).toBeInTheDocument();
		expect(renderedTopBar).toHaveClass(testId);
		expect(renderedTopBar).toContainElement(renderedWrapper);
		expect(renderedTopBar).toMatchSnapshot();
		expect(renderedWrapper).toHaveTextContent(childText);
		expect(renderedWrapper).toHaveClass('wrapper');
	});

});
