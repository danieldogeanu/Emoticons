import React from 'react';
import {render} from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

const compNames = {
	clear: 'ClearButton',
	search: 'SearchBar',
	input: 'SearchInput',
};

describe('SearchBar Component', () => {

	it('renders search bar properly', () => {
		const {getByTestId, container} = render(<SearchBar />);
		const renderedSearch = getByTestId(compNames.search);
		const renderedInput = getByTestId(compNames.input);
		const renderedClearBtn = container.querySelector(`.${compNames.clear}`);

		expect(renderedSearch).toBeInTheDocument();
		expect(renderedSearch).toHaveClass(compNames.search);
		expect(renderedSearch).toContainElement(renderedInput);
		expect(renderedSearch).toContainElement(renderedClearBtn);
		expect(renderedSearch).toMatchSnapshot();

		expect(renderedInput).toHaveAttribute('placeholder', 'Search Emoticons...');
		expect(renderedInput).toHaveAttribute('type', 'text');
		expect(renderedInput).not.toHaveValue();
	});

});
