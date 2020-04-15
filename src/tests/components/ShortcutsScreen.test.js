import React from 'react';
import {render, fireEvent, cleanup, waitForDomChange} from '@testing-library/react';
import ShortcutsScreen from '../../components/ShortcutsScreen';
import ShortcutsButton from '../../components/ShortcutsButton';
import {shortcuts} from '../../details.json';

const screenTitle = 'Keyboard Shortcuts';
const openClasses = ['animated', 'fadeIn', 'show'];
const screenClasses = {
	container: 'shortcutsContainer',
	title: 'shortcutsTitle',
	list: 'shortcutsList',
	key: 'shortcutsKey',
};
const compNames = {
	button: 'ShortcutsButton',
	screen: 'ShortcutsScreen',
	close: 'ShortcutsClose',
	search: {
		bar: 'SearchBar',
		input: 'SearchInput',
	},
};

const compShell = (component) => (
	<div data-testid="test-parent">
		<form className={compNames.search.bar}
			data-testid={compNames.search.bar}>
			<input type="text" data-testid={compNames.search.input} />
		</form>
		<ShortcutsButton />
		{component}
	</div>
);

describe('ShortcutsScreen Component', () => {

	afterEach(cleanup);

	it('renders shortcuts screen properly', () => {
		const {getByTestId, getAllByTestId} = render(compShell(<ShortcutsScreen />));
		const renderedScreen = getByTestId(compNames.screen);
		const renderedContainer = getByTestId(screenClasses.container);
		const renderedTitle = getByTestId(screenClasses.title);
		const renderedList = getByTestId(screenClasses.list);
		const renderedKeys = getAllByTestId(screenClasses.key);

		expect(renderedScreen).toBeInTheDocument();
		expect(renderedScreen).toHaveClass(compNames.screen);
		expect(renderedScreen).toContainElement(renderedContainer);
		expect(renderedScreen).toContainElement(renderedTitle);
		expect(renderedScreen).toContainElement(renderedList);
		expect(renderedScreen).toContainElement(...renderedKeys);
		expect(renderedScreen).toMatchSnapshot();

		expect(renderedContainer).toHaveClass(screenClasses.container);
		expect(renderedTitle).toHaveClass(screenClasses.title);
		expect(renderedList).toHaveClass(screenClasses.list);

		expect(renderedTitle).toHaveTextContent(screenTitle);
		expect(renderedKeys.length).toBe(4);
	});

	it('renders all shortcut keys properly', () => {
		const {getAllByTestId} = render(compShell(<ShortcutsScreen />));
		const renderedKeys = getAllByTestId(screenClasses.key);

		renderedKeys.forEach((key, i) => {
			const kbd = key.querySelector('kbd');
			expect(kbd).toHaveTextContent(shortcuts[i].key);
			expect(key).toHaveTextContent(shortcuts[i].description);
			expect(key).toContainElement(kbd);
		});
	});

	it('opens on button click', () => {
		const {getByTestId, container} = render(compShell(<ShortcutsScreen />));
		const shortcutsScreen = getByTestId(compNames.screen);
		const shortcutsButton = container.querySelector(`.${compNames.button}`);

		fireEvent.click(shortcutsButton);

		expect(shortcutsScreen).toHaveClass(...openClasses);
	});

	it('closes on button click', async () => {
		const {getByTestId, container} = render(compShell(<ShortcutsScreen />));
		const shortcutsScreen = getByTestId(compNames.screen);
		const shortcutsButton = container.querySelector(`.${compNames.button}`);
		const shortcutsClose = container.querySelector(`.${compNames.close}`);

		fireEvent.click(shortcutsButton);
		fireEvent.click(shortcutsClose);

		await waitForDomChange();

		expect(shortcutsScreen).not.toHaveClass('show');
	});

	it('closes on \'esc\' key press', () => {
		const {getByTestId, container} = render(compShell(<ShortcutsScreen />));
		const shortcutsScreen = getByTestId(compNames.screen);
		const shortcutsButton = container.querySelector(`.${compNames.button}`);

		fireEvent.click(shortcutsButton);
		fireEvent.keyUp(shortcutsScreen, {
			key: 'Escape',
			code: 'Escape',
			keyCode: 27,
			charCode: 27
		});

		expect(shortcutsScreen).not.toHaveClass('show');
	});

	it('closes on \'k\' key press', () => {
		const {getByTestId, container} = render(compShell(<ShortcutsScreen />));
		const shortcutsScreen = getByTestId(compNames.screen);
		const shortcutsButton = container.querySelector(`.${compNames.button}`);

		fireEvent.click(shortcutsButton);
		fireEvent.keyUp(shortcutsScreen, {
			key: 'k',
			code: 'KeyK',
			keyCode: 75,
			charCode: 75
		});

		expect(shortcutsScreen).not.toHaveClass('show');
	});

});
