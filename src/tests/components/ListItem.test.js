import React from 'react';
import {render} from '@testing-library/react';
import ListItem from '../../components/ListItem';

const testEmoticon = {
	"codes": "1F604",
	"char": "😄",
	"name": "grinning face with smiling eyes",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
};

describe('ListItem Component', () => {

	it('renders desktop list item properly', () => {
		const {getByTestId, container} = render(<ListItem type="desktop" data={testEmoticon} />);
		const renderedItem = getByTestId('DesktopListItem');
		const renderedEmoticon = container.querySelector('.Emoticon');
		const renderedName = container.querySelector('.Name');
		const renderedCopyBtn = container.querySelector('.CopyButton');

		expect(renderedItem).toBeInTheDocument();
		expect(renderedItem).toHaveClass('DesktopListItem');
		expect(renderedItem).toContainElement(renderedEmoticon);
		expect(renderedItem).toContainElement(renderedName);
		expect(renderedItem).toContainElement(renderedCopyBtn);
		expect(renderedItem).toMatchSnapshot();

		expect(renderedEmoticon).toHaveTextContent(testEmoticon.char);
		expect(renderedEmoticon).toHaveAttribute('aria-label', testEmoticon.name);
		expect(renderedName).toHaveTextContent(testEmoticon.name);
		expect(renderedCopyBtn).toHaveAttribute('data-clipboard-text', testEmoticon.char);
	});

	it('renders mobile list item properly', () => {
		const {getByTestId, container} = render(<ListItem type="mobile" data={testEmoticon} />);
		const renderedItem = getByTestId('MobileListItem');
		const renderedCopyBtn = container.querySelector('.CopyButton');
		const renderedName = container.querySelector('.Name');
		const renderedEmoticon = container.querySelector('.Emoticon');

		expect(renderedItem).toBeInTheDocument();
		expect(renderedItem).toHaveClass('MobileListItem');
		expect(renderedItem).toContainElement(renderedCopyBtn);
		expect(renderedItem).toContainElement(renderedName);
		expect(renderedItem).toContainElement(renderedEmoticon);
		expect(renderedItem).toMatchSnapshot();

		expect(renderedCopyBtn).toHaveAttribute('data-clipboard-text', testEmoticon.char);
		expect(renderedCopyBtn).toHaveClass('mobileCard', 'ripple');
		expect(renderedCopyBtn).toContainElement(renderedName);
		expect(renderedCopyBtn).toContainElement(renderedEmoticon);

		expect(renderedName).toHaveTextContent(testEmoticon.name);
		expect(renderedEmoticon).toHaveTextContent(testEmoticon.char);
		expect(renderedEmoticon).toHaveAttribute('aria-label', testEmoticon.name);
	});

});
