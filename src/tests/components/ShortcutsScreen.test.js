import React from 'react';
import {render, fireEvent, waitForDomChange} from '@testing-library/react';
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

	it('renders shortcuts screen properly', () => {
		const {getByTestId, getAllByTestId} = render(compShell(<ShortcutsScreen />));
		const rendered = {
			screen: getByTestId(compNames.screen),
			container: getByTestId(screenClasses.container),
			title: getByTestId(screenClasses.title),
			list: getByTestId(screenClasses.list),
			keys: getAllByTestId(screenClasses.key),
		};

		expect(rendered.screen).toBeInTheDocument();
		expect(rendered.screen).toHaveClass(compNames.screen);
		expect(rendered.screen).toContainElement(rendered.container);
		expect(rendered.screen).toContainElement(rendered.title);
		expect(rendered.screen).toContainElement(rendered.list);
		expect(rendered.screen).toContainElement(...rendered.keys);
		expect(rendered.screen).toMatchSnapshot();

		expect(rendered.container).toHaveClass(screenClasses.container);
		expect(rendered.title).toHaveClass(screenClasses.title);
		expect(rendered.list).toHaveClass(screenClasses.list);

		expect(rendered.title).toHaveTextContent(screenTitle);
		expect(rendered.keys.length).toBe(4);
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
		const rendered = {
			screen: getByTestId(compNames.screen),
			button: container.querySelector(`.${compNames.button}`),
		};

		fireEvent.click(rendered.button);

		expect(rendered.screen).toHaveClass(...openClasses);
	});

	it('closes on button click', async () => {
		const {getByTestId, container} = render(compShell(<ShortcutsScreen />));
		const rendered = {
			screen: getByTestId(compNames.screen),
			button: container.querySelector(`.${compNames.button}`),
			close: container.querySelector(`.${compNames.close}`),
		};

		fireEvent.click(rendered.button);
		fireEvent.click(rendered.close);
		await waitForDomChange();

		expect(rendered.screen).not.toHaveClass('show');
	});

	it('closes on \'esc\' key press', () => {
		const {getByTestId, container} = render(compShell(<ShortcutsScreen />));
		const rendered = {
			screen: getByTestId(compNames.screen),
			button: container.querySelector(`.${compNames.button}`),
		};

		fireEvent.click(rendered.button);
		fireEvent.keyUp(rendered.screen, {
			key: 'Escape', code: 'Escape',
			keyCode: 27, charCode: 27
		});

		expect(rendered.screen).not.toHaveClass('show');
	});

	it('closes on \'k\' key press', () => {
		const {getByTestId, container} = render(compShell(<ShortcutsScreen />));
		const rendered = {
			screen: getByTestId(compNames.screen),
			button: container.querySelector(`.${compNames.button}`),
		};

		fireEvent.click(rendered.button);
		fireEvent.keyUp(rendered.screen, {
			key: 'k', code: 'KeyK',
			keyCode: 75, charCode: 75
		});

		expect(rendered.screen).not.toHaveClass('show');
	});

});
