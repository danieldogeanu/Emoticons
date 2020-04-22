import React from 'react';
import {render, fireEvent, waitForDomChange, waitForElement} from '@testing-library/react';
import CopyButton from '../../components/CopyButton';

// Mock required to trigger onSuccess event on <Clipboard> component.
document.execCommand = jest.fn(() => true);

const testEmoticon = {
	"codes": "1F604",
	"char": "😄",
	"name": "grinning face with smiling eyes",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
};
const {char} = testEmoticon;

describe('CopyButton Component', () => {

	it('renders copy button properly', () => {
		const {getByTestId} = render(<CopyButton data={char} />);
		const renderedCopyBtn = getByTestId('CopyButton');

		expect(renderedCopyBtn).toBeInTheDocument();
		expect(renderedCopyBtn).toHaveClass('CopyButton', 'undefined');
		expect(renderedCopyBtn).toHaveAttribute('data-clipboard-text', char);
		expect(renderedCopyBtn).toHaveAttribute('type', 'button');
		expect(renderedCopyBtn).toHaveTextContent('Copy');
		expect(renderedCopyBtn).toMatchSnapshot();
	});

	it('renders copy button with children properly', () => {
		const {getByTestId} = render(
			<CopyButton data={char} className="children">
				<div data-testid="child">{char}</div>
			</CopyButton>
		);
		const renderedCopyBtn = getByTestId('CopyButton');
		const renderedChild = getByTestId('child');

		expect(renderedCopyBtn).toBeInTheDocument();
		expect(renderedCopyBtn).toHaveClass('CopyButton', 'children');
		expect(renderedCopyBtn).toHaveAttribute('data-clipboard-text', char);
		expect(renderedCopyBtn).toHaveAttribute('type', 'button');
		expect(renderedCopyBtn).toContainElement(renderedChild);
		expect(renderedCopyBtn).toMatchSnapshot();
		expect(renderedChild).toHaveTextContent(char);
	});

	it('copies data to clipboard', async () => {
		const {getByTestId, container} = render(
			<div>
				<CopyButton data={char} />
				<div className="SelectedScreen"></div>
			</div>
		);
		const renderedCopyBtn = getByTestId('CopyButton');
		const renderedScreen = container.querySelector('.SelectedScreen');

		fireEvent.click(renderedCopyBtn);
		const renderedIcon = await waitForElement(
			() => container.querySelector('svg'),
			{container}
		);

		// After Click Event
		expect(renderedCopyBtn).toHaveClass('copied');
		expect(renderedCopyBtn).toContainElement(renderedIcon);
		expect(renderedScreen).toHaveClass('show');
		expect(renderedScreen).toHaveTextContent(char);

		await waitForDomChange({container: renderedCopyBtn});

		// After Timers Run Out
		expect(renderedCopyBtn).not.toHaveClass('copied');
		expect(renderedCopyBtn).not.toContainElement(renderedIcon);
		expect(renderedScreen).not.toHaveClass('show');
		expect(renderedIcon).not.toBeInTheDocument();
	});

});
