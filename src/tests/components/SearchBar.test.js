import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

// FIXME: Fix failing test for SearchBar.

const testText = 'this is a search input test';
const compNames = {
	clear: 'ClearButton',
	search: 'SearchBar',
	input: 'SearchInput',
};
const classNames = {
	focused: 'focused',
	show: 'show',
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
	expect(rendered.clearBtn).not.toHaveClass(classNames.show);
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
		const rendered = {
			search: getByTestId(compNames.search),
			input: getByTestId(compNames.input),
			clearBtn: container.querySelector(`.${compNames.clear}`),
		};

		expect(rendered.search).toBeInTheDocument();
		expect(rendered.search).toHaveClass(compNames.search);
		expect(rendered.search).toContainElement(rendered.input);
		expect(rendered.search).toContainElement(rendered.clearBtn);
		expect(rendered.search).toMatchSnapshot();

		expect(rendered.input).toHaveAttribute('placeholder', 'Search Emoticons...');
		expect(rendered.input).toHaveAttribute('type', 'text');
		expect(rendered.input).not.toHaveValue();
	});

	it('selects search input on \'s\' key up', () => {
		const {getByTestId} = render(<SearchBar />);
		const renderedInput = getByTestId(compNames.input);

		fireEvent.keyUp(window, {
			key: 's', code: 'KeyS',
			keyCode: 83, charCode: 83
		});

		expect(renderedInput).toHaveClass(classNames.focused);
	});

	it('handles focus and blur events', () => {
		const {getByTestId} = render(<SearchBar />);
		const renderedInput = getByTestId(compNames.input);

		fireEvent.focus(renderedInput);
		expect(renderedInput).toHaveClass(classNames.focused);

		fireEvent.blur(renderedInput);
		expect(renderedInput).not.toHaveClass(classNames.focused);
	});

	it('handles filter text change', () => {
		const {getByTestId, container, rerender} = render(searchBarWithProps(
			filterText, handleFilterTextChange, handleFilterTextClear
		));
		const rendered = {
			input: getByTestId(compNames.input),
			clearBtn: container.querySelector(`.${compNames.clear}`),
		};

		currRenderer = rerender;
		fireEvent.change(rendered.input, {target: {value: testText}});

		expect(filterText).toBe(testText);
		expect(rendered.input).toHaveValue(testText);
		expect(rendered.clearBtn).toHaveClass(classNames.show);
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
