import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import ScrollUp from '../../components/ScrollUp';

const scrollText = 'Scroll Back Up';
const compNames = {
	search: {
		bar: 'SearchBar',
		input: 'SearchInput',
	},
	screenReaderText: 'ScreenReaderText',
	scrollUp: 'ScrollUp',
	listItem: 'ListItem',
};
const compClasses = {
	simplebar: 'simplebar-content-wrapper',
	list: 'List',
};

const SearchBar = () => (
	<form className={compNames.search.bar}
		data-testid={compNames.search.bar}>
		<input type="text" data-testid={compNames.search.input} />
	</form>
);

const ListItem = ({text}) => (
	<div className={compNames.listItem}
		data-testid={compNames.listItem}
		style={{height: 100}}>
		{text}
	</div>
);

const ListContainer = () => {
	const listItems = [];

	for (let i=0; i<15; i++) {
		const id = `#${i+1}`;
		listItems.push(
			<ListItem key={id} text={'Item ' + id} />
		);
	}

	return (
		<div className={[
				compClasses.list,
				compClasses.simplebar,
			].join(' ')}
			data-testid={compClasses.list}>
			{listItems}
		</div>
	);
};

const compShell = (component) => (
	<div data-testid="test-parent">
		<SearchBar />
		<ListContainer />
		{component}
	</div>
);

const setupScroll = (element, amount) => {
	element.scrollTop = amount;
	element.scrollTo = jest.fn((x, y) => {
		element.scrollTop = y;
	});
};

const resetScroll = (element) => {
	element.scrollTop = 0;
	element.scrollTo.mockRestore();
};

describe('ScrollUp Component', () => {

	it('renders scroll up button properly', () => {
		const {getByTitle, getByTestId, container} = render(compShell(<ScrollUp />));
		const renderedScrollBtn = getByTitle(scrollText);
		const renderedSRText = getByTestId(compNames.screenReaderText);
		const renderedIcon = container.querySelector('svg');

		expect(renderedScrollBtn).toBeInTheDocument();
		expect(renderedScrollBtn).toHaveClass(compNames.scrollUp);
		expect(renderedScrollBtn).toHaveAttribute('title', scrollText);
		expect(renderedScrollBtn).toContainElement(renderedSRText);
		expect(renderedScrollBtn).toContainElement(renderedIcon);
		expect(renderedScrollBtn).toMatchSnapshot();

		expect(renderedSRText).toHaveTextContent(scrollText);
		expect(renderedIcon).toHaveClass('icon', 'chevron-up');
	});

	it('shows button on scroll down', async () => {
		const {getByTitle, getByTestId} = render(compShell(<ScrollUp />));
		const renderedScrollBtn = getByTitle(scrollText);
		const renderedList = getByTestId(compClasses.list);

		renderedList.scrollTop = 500;
		fireEvent.scroll(renderedList);

		expect(renderedScrollBtn).toHaveClass('show');
		expect(renderedScrollBtn).toBeVisible();
	});

	it('scrolls to top on click', () => {
		const {getByTitle, getByTestId} = render(compShell(<ScrollUp />));
		const renderedScrollBtn = getByTitle(scrollText);
		const renderedList = getByTestId(compClasses.list);

		setupScroll(renderedList, 500);

		fireEvent.click(renderedScrollBtn);

		// It's 400 and not 0 because requestAnimationFrame fires only once in jest-dom.
		expect(renderedList.scrollTop).toBe(400);
		resetScroll(renderedList);
	});

	it('scrolls to top on key up', () => {
		const {getByTestId} = render(compShell(<ScrollUp />));
		const renderedList = getByTestId(compClasses.list);

		setupScroll(renderedList, 500);

		fireEvent.keyUp(window, {
			key: 't',
			code: 'KeyT',
			keyCode: 84,
			charCode: 84
		});

		// It's 400 and not 0 because requestAnimationFrame fires only once in jest-dom.
		expect(renderedList.scrollTop).toBe(400);
		resetScroll(renderedList);
	});

});
