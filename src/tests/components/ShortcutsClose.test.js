import React from 'react';
import {render, fireEvent, waitForDomChange} from '@testing-library/react';
import ShortcutsClose from '../../components/ShortcutsClose';

const btnTitle = 'Close Shortcuts Screen';
const compNames = {
	button: 'ShortcutsButton',
	screen: 'ShortcutsScreen',
	close: 'ShortcutsClose',
	srText: 'ScreenReaderText',
};
const classNames = {
	icon: 'icon',
	close: 'close',
	show: 'show',
	hide: 'hide',
	animated: 'animated',
	fadeIn: 'fadeIn',
	fadeOut: 'fadeOut',
};

describe('ShortcutsClose Component', () => {

	it('renders shortcuts close button properly', () => {
		const {getByTitle, getByTestId, container} = render(<ShortcutsClose />);
		const rendered = {
			btn: getByTitle(btnTitle),
			srText: getByTestId(compNames.srText),
			icon: container.querySelector('svg'),
		};

		expect(rendered.btn).toBeInTheDocument();
		expect(rendered.btn).toHaveClass(compNames.close);
		expect(rendered.btn).toHaveAttribute('title', btnTitle);
		expect(rendered.btn).toContainElement(rendered.srText);
		expect(rendered.btn).toContainElement(rendered.icon);
		expect(rendered.btn).toMatchSnapshot();

		expect(rendered.srText).toHaveTextContent(btnTitle);
		expect(rendered.icon).toHaveClass(classNames.icon, classNames.close);
	});

	it('closes shortcuts screen', async () => {
		const {show, animated, fadeIn, fadeOut} = classNames;
		const classesToRemove = [show, animated, fadeIn, fadeOut];
		const {getByTitle, getByTestId} = render(
			<div data-testid="test-parent">
				<button className={[compNames.button, classNames.hide].join(' ')}
					data-testid={compNames.button} />
				<div className={[compNames.screen, ...classesToRemove].join(' ')}
					data-testid={compNames.screen}>
					<ShortcutsClose />
				</div>
			</div>
		);
		const shortcuts = {
			close: getByTitle(btnTitle),
			button: getByTestId(compNames.button),
			screen: getByTestId(compNames.screen),
		};

		fireEvent.click(shortcuts.close);
		await waitForDomChange();

		expect(shortcuts.screen).not.toHaveClass(...classesToRemove);
		expect(shortcuts.button).not.toHaveClass(classNames.hide);
	});

});
