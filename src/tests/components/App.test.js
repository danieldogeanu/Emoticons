import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../components/App';

jest.mock('../../emoji.json', () => [{
	"codes": "1F600",
	"char": "😀",
	"name": "grinning face",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
}, {
	"codes": "1F603",
	"char": "😃",
	"name": "grinning face with big eyes",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
}, {
	"codes": "1F604",
	"char": "😄",
	"name": "grinning face with smiling eyes",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
}, {
	"codes": "1F601",
	"char": "😁",
	"name": "beaming face with smiling eyes",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
}, {
	"codes": "1F606",
	"char": "😆",
	"name": "grinning squinting face",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
}], {virtual: true});

const testEmoji = [
	{	"char": "😀", "name": "grinning face"},
	{	"char": "😃", "name": "grinning face with big eyes"},
	{	"char": "😄", "name": "grinning face with smiling eyes"},
	{	"char": "😁", "name": "beaming face with smiling eyes"},
	{	"char": "😆", "name": "grinning squinting face"}
];
const testFilterText = 'beaming';

const compNames = {
	app: 'App',
	sprite: 'IconsSprite',
	topBar: 'TopBar',
	search: {
		bar: 'SearchBar',
		input: 'SearchInput',
	},
	list: {
		container: 'ListContainer',
		item: {
			desktop: 'DesktopListItem',
			mobile: 'MobileListItem',
		},
	},
	scrollUp: 'ScrollUp',
	shortcuts: {
		button: 'ShortcutsButton',
		screen: 'ShortcutsScreen',
	},
	selected: 'SelectedScreen',
};

describe('App Component', () => {

	it('renders app properly', () => {
		const {getByTestId, getAllByTestId, container} = render(<App />);
		const rendered = {
			app: getByTestId(compNames.app),
			sprite: getByTestId(compNames.sprite),
			topBar: getByTestId(compNames.topBar),
			searchBar: getByTestId(compNames.search.bar),
			listContainer: getByTestId(compNames.list.container),
			listItems: getAllByTestId(compNames.list.item.desktop),
			scrollUp: container.querySelector(`.${compNames.scrollUp}`),
			shortcutsButton: container.querySelector(`.${compNames.shortcuts.button}`),
			shortcutsScreen: getByTestId(compNames.shortcuts.screen),
			selectedScreen: getByTestId(compNames.selected),
		};

		expect(rendered.app).toBeInTheDocument();
		expect(rendered.app).toHaveClass(compNames.app);
		expect(rendered.app).toContainElement(rendered.sprite);
		expect(rendered.app).toContainElement(rendered.topBar);
		expect(rendered.app).toContainElement(rendered.searchBar);
		expect(rendered.app).toContainElement(rendered.listContainer);
		expect(rendered.app).toContainElement(rendered.scrollUp);
		expect(rendered.app).toContainElement(rendered.shortcutsButton);
		expect(rendered.app).toContainElement(rendered.shortcutsScreen);
		expect(rendered.app).toContainElement(rendered.selectedScreen);
		expect(rendered.app).toMatchSnapshot();

		expect(rendered.listItems.length).toBe(5);
		rendered.listItems.forEach((item, i) => {
			expect(rendered.app).toContainElement(item);
			expect(item).toHaveTextContent(testEmoji[i].char);
			expect(item).toHaveTextContent(testEmoji[i].name);
		});
	});

	it('handles filter text change', async () => {
		const {getByTestId, getAllByTestId} = render(<App />);

		await userEvent.type(getByTestId(compNames.search.input), testFilterText);
		const rendered = {
			searchInput: getByTestId(compNames.search.input),
			listItems: getAllByTestId(compNames.list.item.desktop),
		};

		expect(rendered.searchInput.value).toBe(testFilterText);
		expect(rendered.listItems.length).toBe(1);
		expect(rendered.listItems[0]).toHaveTextContent(testFilterText);
	});

});
