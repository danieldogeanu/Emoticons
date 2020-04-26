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
const classNames = {
	simplebar: 'simplebar-content-wrapper',
	list: 'List',
	icon: 'icon',
	chevronUp: 'chevron-up',
	show: 'show',
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
				classNames.list,
				classNames.simplebar,
			].join(' ')}
			data-testid={classNames.list}>
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
		const rendered = {
			scrollBtn: getByTitle(scrollText),
			srText: getByTestId(compNames.screenReaderText),
			icon: container.querySelector('svg'),
		};

		expect(rendered.scrollBtn).toBeInTheDocument();
		expect(rendered.scrollBtn).toHaveClass(compNames.scrollUp);
		expect(rendered.scrollBtn).toHaveAttribute('title', scrollText);
		expect(rendered.scrollBtn).toContainElement(rendered.srText);
		expect(rendered.scrollBtn).toContainElement(rendered.icon);
		expect(rendered.scrollBtn).toMatchSnapshot();

		expect(rendered.srText).toHaveTextContent(scrollText);
		expect(rendered.icon).toHaveClass(classNames.icon, classNames.chevronUp);
	});

	it('shows button on scroll down', async () => {
		const {getByTitle, getByTestId} = render(compShell(<ScrollUp />));
		const rendered = {
			scrollBtn: getByTitle(scrollText),
			list: getByTestId(classNames.list),
		};

		rendered.list.scrollTop = 500;
		fireEvent.scroll(rendered.list);

		expect(rendered.scrollBtn).toHaveClass(classNames.show);
		expect(rendered.scrollBtn).toBeVisible();
	});

	it('scrolls to top on click', () => {
		const {getByTitle, getByTestId} = render(compShell(<ScrollUp />));
		const rendered = {
			scrollBtn: getByTitle(scrollText),
			list: getByTestId(classNames.list),
		};

		setupScroll(rendered.list, 500);
		fireEvent.click(rendered.scrollBtn);

		// It's 400 and not 0 because requestAnimationFrame fires only once in jest-dom.
		expect(rendered.list.scrollTop).toBe(400);
		resetScroll(rendered.list);
	});

	it('scrolls to top on key up', () => {
		const {getByTestId} = render(compShell(<ScrollUp />));
		const renderedList = getByTestId(classNames.list);

		setupScroll(renderedList, 500);
		fireEvent.keyUp(window, {
			key: 't', code: 'KeyT',
			keyCode: 84, charCode: 84
		});

		// It's 400 and not 0 because requestAnimationFrame fires only once in jest-dom.
		expect(renderedList.scrollTop).toBe(400);
		resetScroll(renderedList);
	});

});
