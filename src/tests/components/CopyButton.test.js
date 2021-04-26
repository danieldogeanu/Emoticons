import React from 'react';
import {render, fireEvent, waitForDomChange, waitForElement} from '@testing-library/react';
import CopyButton from '../../components/CopyButton';

// FIXME: Fix failing test for CopyButton.
// TODO: Replace deprecated methods for Testing Library (waitForDomChange, waitForElement).

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
const compNames = {
	copyBtn: 'CopyButton',
	screen: 'SelectedScreen',
};
const classNames = {
	undefined: 'undefined',
	children: 'children',
	copied: 'copied',
	show: 'show',
};

describe('CopyButton Component', () => {

	it('renders copy button properly', () => {
		const {getByTestId} = render(<CopyButton data={char} />);
		const renderedCopyBtn = getByTestId(compNames.copyBtn);

		expect(renderedCopyBtn).toBeInTheDocument();
		expect(renderedCopyBtn).toHaveClass(compNames.copyBtn, classNames.undefined);
		expect(renderedCopyBtn).toHaveAttribute('data-clipboard-text', char);
		expect(renderedCopyBtn).toHaveAttribute('type', 'button');
		expect(renderedCopyBtn).toHaveTextContent('Copy');
		expect(renderedCopyBtn).toMatchSnapshot();
	});

	it('renders copy button with children properly', () => {
		const {getByTestId} = render(
			<CopyButton data={char} className={classNames.children}>
				<div data-testid="child">{char}</div>
			</CopyButton>
		);
		const rendered = {
			copyBtn: getByTestId(compNames.copyBtn),
			child: getByTestId('child'),
		};

		expect(rendered.copyBtn).toBeInTheDocument();
		expect(rendered.copyBtn).toHaveClass(compNames.copyBtn, classNames.children);
		expect(rendered.copyBtn).toHaveAttribute('data-clipboard-text', char);
		expect(rendered.copyBtn).toHaveAttribute('type', 'button');
		expect(rendered.copyBtn).toContainElement(rendered.child);
		expect(rendered.copyBtn).toMatchSnapshot();
		expect(rendered.child).toHaveTextContent(char);
	});

	it('copies data to clipboard', async () => {
		const {getByTestId, container} = render(
			<div>
				<CopyButton data={char} />
				<div className={compNames.screen}></div>
			</div>
		);
		const rendered = {
			copyBtn: getByTestId(compNames.copyBtn),
			screen: container.querySelector(`.${compNames.screen}`),
		};

		fireEvent.click(rendered.copyBtn);
		rendered.icon = await waitForElement(
			() => container.querySelector('svg'),
			{container}
		);

		// After Click Event
		expect(rendered.copyBtn).toHaveClass(classNames.copied);
		expect(rendered.copyBtn).toContainElement(rendered.icon);
		expect(rendered.screen).toHaveClass(classNames.show);
		expect(rendered.screen).toHaveTextContent(char);

		await waitForDomChange({container: rendered.copyBtn});

		// After Timers Run Out
		expect(rendered.copyBtn).not.toHaveClass(classNames.copied);
		expect(rendered.copyBtn).not.toContainElement(rendered.icon);
		expect(rendered.screen).not.toHaveClass(classNames.show);
		expect(rendered.icon).not.toBeInTheDocument();
	});

});
