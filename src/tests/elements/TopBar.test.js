import React from 'react';
import {render} from '@testing-library/react';
import TopBar from '../../elements/TopBar';

const compNames = {topBar: 'TopBar'};
const childText = 'TopBar Test Child';

describe('TopBar Element', () => {

	it('renders top bar properly', () => {
		const {getByTestId, getByText} = render(<TopBar>{childText}</TopBar>);
		const rendered = {
			topBar: getByTestId(compNames.topBar),
			wrapper: getByText(childText),
		};

		expect(rendered.topBar).toBeInTheDocument();
		expect(rendered.topBar).toHaveClass(compNames.topBar);
		expect(rendered.topBar).toContainElement(rendered.wrapper);
		expect(rendered.topBar).toMatchSnapshot();
		expect(rendered.wrapper).toHaveTextContent(childText);
		expect(rendered.wrapper).toHaveClass('wrapper');
	});

});
