import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

const testText = 'this is a search input test';
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

	it('selects search input on \'s\' key up', () => {
		const {getByTestId} = render(<SearchBar />);
		const renderedInput = getByTestId(compNames.input);

		fireEvent.keyUp(window, {
			key: 's',
			code: 'KeyS',
			keyCode: 83,
			charCode: 83
		});

		expect(renderedInput).toHaveClass('focused');
	});

	it('handles focus and blur events', () => {
		const {getByTestId} = render(<SearchBar />);
		const renderedInput = getByTestId(compNames.input);

		fireEvent.focus(renderedInput);
		expect(renderedInput).toHaveClass('focused');

		fireEvent.blur(renderedInput);
		expect(renderedInput).not.toHaveClass('focused');
	});

	it('handles filter text change', () => {
		const searchBarWithProps = (text, handler) => (
			<SearchBar filterText={text} onFilterTextChange={handler} />
		);
		const state = {filterText: ''};
		const handleFilterTextChange = jest.fn(text => {
			state.filterText = text;
			rerender(searchBarWithProps(state.filterText, handleFilterTextChange));
		});

		const {getByTestId, container, rerender} = render(
			searchBarWithProps(state.filterText, handleFilterTextChange)
		);
		const renderedInput = getByTestId(compNames.input);
		const renderedClearBtn = container.querySelector(`.${compNames.clear}`);

		fireEvent.change(renderedInput, {target: {value: testText}});

		expect(state.filterText).toBe(testText);
		expect(renderedInput).toHaveValue(testText);
		expect(renderedClearBtn).toHaveClass('show');
		expect(handleFilterTextChange).toHaveBeenCalled();
	});

	it('clears input on button click', () => {
		const searchBarWithProps = (text, changeHandler, clearHandler) => (
			<SearchBar filterText={text}
				onFilterTextChange={changeHandler}
				onFilterTextClear={clearHandler} />
		);
		const rerenderSearchBar = () => {
			rerender(searchBarWithProps(
				state.filterText,
				handleFilterTextChange,
				handleFilterTextClear
			));
		};

		const state = {filterText: ''};
		const handleFilterTextChange = jest.fn(text => {
			state.filterText = text;
			rerenderSearchBar();
		});
		const handleFilterTextClear = jest.fn(() => {
			state.filterText = '';
			rerenderSearchBar();
		});

		const {getByTestId, container, rerender} = render(searchBarWithProps(
			state.filterText, handleFilterTextChange, handleFilterTextClear
		));
		const renderedInput = getByTestId(compNames.input);
		const renderedClearBtn = container.querySelector(`.${compNames.clear}`);

		fireEvent.change(renderedInput, {target: {value: testText}});
		fireEvent.click(renderedClearBtn);

		expect(state.filterText).toBe('');
		expect(state.filterText).not.toBe(testText);
		expect(renderedInput).not.toHaveValue();
		expect(renderedClearBtn).not.toHaveClass('show');
		expect(handleFilterTextClear).toHaveBeenCalled();
	});

});
