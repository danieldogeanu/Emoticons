import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

const testText = 'this is a search input test';
const compNames = {
	clear: 'ClearButton',
	search: 'SearchBar',
	input: 'SearchInput',
};

let currRenderer = null;
let filterText = '';

const handleFilterTextChange = jest.fn(text => {
	filterText = text;
	rerenderSearchBar(currRenderer);
});
const handleFilterTextClear = jest.fn(() => {
	filterText = '';
	rerenderSearchBar(currRenderer);
});

const searchBarWithProps = (text, changeHandler, clearHandler) => (
	<SearchBar filterText={text}
		onFilterTextChange={changeHandler}
		onFilterTextClear={clearHandler} />
);

const rerenderSearchBar = (rerender) => {
	rerender(searchBarWithProps(
		filterText,
		handleFilterTextChange,
		handleFilterTextClear
	));
};

const clearInputTest = (cbEvent, cbElement, cbOptions = {}) => {
	const {getByTestId, container, rerender} = render(searchBarWithProps(
		filterText, handleFilterTextChange, handleFilterTextClear
	));
	const rendered = {
		searchInput: getByTestId(compNames.input),
		clearBtn: container.querySelector(`.${compNames.clear}`),
	};

	currRenderer = rerender;

	fireEvent.change(rendered.searchInput, {target: {value: testText}});
	cbEvent(rendered[cbElement], cbOptions);

	expect(filterText).toBe('');
	expect(filterText).not.toBe(testText);
	expect(rendered.searchInput).not.toHaveValue();
	expect(rendered.clearBtn).not.toHaveClass('show');
	expect(handleFilterTextClear).toHaveBeenCalled();
};

describe('SearchBar Component', () => {

	afterEach(() => {
		currRenderer = null;
		filterText = '';
		handleFilterTextChange.mockClear();
		handleFilterTextClear.mockClear();
	});

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
			key: 's', code: 'KeyS',
			keyCode: 83, charCode: 83
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
		const {getByTestId, container, rerender} = render(searchBarWithProps(
			filterText, handleFilterTextChange, handleFilterTextClear
		));
		const renderedInput = getByTestId(compNames.input);
		const renderedClearBtn = container.querySelector(`.${compNames.clear}`);

		currRenderer = rerender;

		fireEvent.change(renderedInput, {target: {value: testText}});

		expect(filterText).toBe(testText);
		expect(renderedInput).toHaveValue(testText);
		expect(renderedClearBtn).toHaveClass('show');
		expect(handleFilterTextChange).toHaveBeenCalled();
	});

	it('clears input on button click', () => {
		clearInputTest(fireEvent.click, 'clearBtn');
	});

	it('clears input on \'esc\' key up', () => {
		clearInputTest(fireEvent.keyUp, 'searchInput', {
			key: 'Escape', code: 'Escape',
			keyCode: 27, charCode: 27
		});
	});

	it('clears input on submit', () => {
		clearInputTest(fireEvent.submit, 'searchInput');
	});

});