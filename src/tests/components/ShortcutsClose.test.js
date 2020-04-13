import React from 'react';
import {render, fireEvent, cleanup, waitForDomChange} from '@testing-library/react';
import ShortcutsClose from '../../components/ShortcutsClose';

const btnTitle = 'Close Shortcuts Screen';

describe('ShortcutsClose Component', () => {

	afterEach(cleanup);

	it('renders shortcuts close button properly', () => {
		const {getByTitle, getByTestId, container} = render(<ShortcutsClose />);
		const renderedBtn = getByTitle(btnTitle);
		const renderedSRText = getByTestId('ScreenReaderText');
		const renderedIcon = container.querySelector('svg');

		expect(renderedBtn).toBeInTheDocument();
		expect(renderedBtn).toHaveClass('ShortcutsClose');
		expect(renderedBtn).toHaveAttribute('title', btnTitle);
		expect(renderedBtn).toContainElement(renderedSRText);
		expect(renderedBtn).toContainElement(renderedIcon);
		expect(renderedBtn).toMatchSnapshot();

		expect(renderedSRText).toHaveTextContent(btnTitle);
		expect(renderedIcon).toHaveClass('icon', 'close');
	});

	it('closes shortcuts screen', async () => {
		const {getByTitle, getByTestId} = render(
			<div data-testid="test-parent">
				<button className="ShortcutsButton hide"
					data-testid="ShortcutsButton" />
				<div className="ShortcutsScreen show animated fadeIn fadeOut"
					data-testid="ShortcutsScreen">
					<ShortcutsClose />
				</div>
			</div>
		);
		const shortcutsClose = getByTitle(btnTitle);
		const shortcutsButton = getByTestId('ShortcutsButton');
		const shortcutsScreen = getByTestId('ShortcutsScreen');

		fireEvent.click(shortcutsClose);
		await waitForDomChange();

		expect(shortcutsScreen).not.toHaveClass('show', 'animated', 'fadeIn', 'fadeOut');
		expect(shortcutsButton).not.toHaveClass('hide');
	});

});
