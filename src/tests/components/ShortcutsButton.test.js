import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import ShortcutsButton from '../../components/ShortcutsButton';

const btnTitle = 'Keyboard Shortcuts';
const compNames = {
	button: 'ShortcutsButton',
	screen: 'ShortcutsScreen',
};

describe('ShortcutsButton Component', () => {

	afterEach(cleanup);

	it('renders shortcuts button properly', () => {
		const {getByTitle, getByTestId, container} = render(<ShortcutsButton />);
		const renderedBtn = getByTitle(btnTitle);
		const renderedSRText = getByTestId('ScreenReaderText');
		const renderedIcon = container.querySelector('svg');

		expect(renderedBtn).toBeInTheDocument();
		expect(renderedBtn).toHaveClass(compNames.button);
		expect(renderedBtn).toHaveAttribute('title', btnTitle);
		expect(renderedBtn).toContainElement(renderedSRText);
		expect(renderedBtn).toContainElement(renderedIcon);
		expect(renderedBtn).toMatchSnapshot();

		expect(renderedSRText).toHaveTextContent(btnTitle);
		expect(renderedIcon).toHaveClass('icon', 'keyboard');
	});

	it('opens shortcuts screen', () => {
		const {getByTitle, getByTestId} = render(
			<div data-testid="test-parent">
				<ShortcutsButton />
				<div className={compNames.screen}
					data-testid={compNames.screen} />
			</div>
		);
		const renderedBtn = getByTitle(btnTitle);
		const renderedScreen = getByTestId(compNames.screen);

		fireEvent.click(renderedBtn);

		expect(renderedBtn).toHaveClass(compNames.button, 'hide');
		expect(renderedScreen).toHaveClass(compNames.screen, 'animated', 'fadeIn', 'show');
	});

});
