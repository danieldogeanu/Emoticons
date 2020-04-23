import React from 'react';
import {render} from '@testing-library/react';
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
		].join(' ')}>
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

});
