import React from 'react';
import {render, fireEvent, cleanup, waitForDomChange} from '@testing-library/react';
import ShortcutsClose from '../../components/ShortcutsClose';

const btnTitle = 'Close Shortcuts Screen';
const compNames = {
	button: 'ShortcutsButton',
	screen: 'ShortcutsScreen',
	close: 'ShortcutsClose',
};

describe('ShortcutsClose Component', () => {

	afterEach(cleanup);

	it('renders shortcuts close button properly', () => {
		const {getByTitle, getByTestId, container} = render(<ShortcutsClose />);
		const renderedBtn = getByTitle(btnTitle);
		const renderedSRText = getByTestId('ScreenReaderText');
		const renderedIcon = container.querySelector('svg');

		expect(renderedBtn).toBeInTheDocument();
		expect(renderedBtn).toHaveClass(compNames.close);
		expect(renderedBtn).toHaveAttribute('title', btnTitle);
		expect(renderedBtn).toContainElement(renderedSRText);
		expect(renderedBtn).toContainElement(renderedIcon);
		expect(renderedBtn).toMatchSnapshot();

		expect(renderedSRText).toHaveTextContent(btnTitle);
		expect(renderedIcon).toHaveClass('icon', 'close');
	});

	it('closes shortcuts screen', async () => {
		const classesToRemove = ['show', 'animated', 'fadeIn', 'fadeOut'];
		const {getByTitle, getByTestId} = render(
			<div data-testid="test-parent">
				<button className={[compNames.button, 'hide'].join(' ')}
					data-testid={compNames.button} />
				<div className={[compNames.screen, ...classesToRemove].join(' ')}
					data-testid={compNames.screen}>
					<ShortcutsClose />
				</div>
			</div>
		);
		const shortcutsClose = getByTitle(btnTitle);
		const shortcutsButton = getByTestId(compNames.button);
		const shortcutsScreen = getByTestId(compNames.screen);

		fireEvent.click(shortcutsClose);
		await waitForDomChange();

		expect(shortcutsScreen).not.toHaveClass(...classesToRemove);
		expect(shortcutsButton).not.toHaveClass('hide');
	});

});
