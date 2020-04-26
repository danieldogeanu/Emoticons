import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import ShortcutsButton from '../../components/ShortcutsButton';

const btnTitle = 'Keyboard Shortcuts';
const compNames = {
	button: 'ShortcutsButton',
	screen: 'ShortcutsScreen',
	srText: 'ScreenReaderText',
};
const classNames = {
	icon: 'icon',
	keyboard: 'keyboard',
	hide: 'hide',
	show: 'show',
	animated: 'animated',
	fadeIn: 'fadeIn',
};

describe('ShortcutsButton Component', () => {

	it('renders shortcuts button properly', () => {
		const {getByTitle, getByTestId, container} = render(<ShortcutsButton />);
		const rendered = {
			btn: getByTitle(btnTitle),
			srText: getByTestId(compNames.srText),
			icon: container.querySelector('svg'),
		};

		expect(rendered.btn).toBeInTheDocument();
		expect(rendered.btn).toHaveClass(compNames.button);
		expect(rendered.btn).toHaveAttribute('title', btnTitle);
		expect(rendered.btn).toContainElement(rendered.srText);
		expect(rendered.btn).toContainElement(rendered.icon);
		expect(rendered.btn).toMatchSnapshot();

		expect(rendered.srText).toHaveTextContent(btnTitle);
		expect(rendered.icon).toHaveClass(classNames.icon, classNames.keyboard);
	});

	it('opens shortcuts screen', () => {
		const {getByTitle, getByTestId} = render(
			<div data-testid="test-parent">
				<ShortcutsButton />
				<div className={compNames.screen}
					data-testid={compNames.screen} />
			</div>
		);
		const rendered = {
			btn: getByTitle(btnTitle),
			screen: getByTestId(compNames.screen),
		};

		fireEvent.click(rendered.btn);

		expect(rendered.btn).toHaveClass(compNames.button, classNames.hide);
		expect(rendered.screen).toHaveClass(compNames.screen, classNames.animated,
			classNames.fadeIn, classNames.show);
	});

});
