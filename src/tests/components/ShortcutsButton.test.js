import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import ShortcutsButton from '../../components/ShortcutsButton';
import ShortcutsScreen from '../../components/ShortcutsScreen';

jest.mock('../../components/ShortcutsScreen', () => () => (
	<div className="ShortcutsScreen" data-testid="ShortcutsScreen"></div>
));

const btnTitle = 'Keyboard Shortcuts';

describe('ShortcutsButton Component', () => {

	afterEach(cleanup);

	it('renders shortcuts button properly', () => {
		const {getByTitle, getByTestId, container} = render(<ShortcutsButton />);
		const renderedBtn = getByTitle(btnTitle);
		const renderedSRText = getByTestId('ScreenReaderText');
		const renderedIcon = container.querySelector('svg');

		expect(renderedBtn).toBeInTheDocument();
		expect(renderedBtn).toHaveClass('ShortcutsButton');
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
				<ShortcutsScreen />
			</div>
		);
		const renderedBtn = getByTitle(btnTitle);
		const renderedScreen = getByTestId('ShortcutsScreen');

		fireEvent.click(renderedBtn);

		expect(renderedBtn).toHaveClass('ShortcutsButton', 'hide');
		expect(renderedScreen).toHaveClass('ShortcutsScreen', 'animated', 'fadeIn', 'show');
	});

});
