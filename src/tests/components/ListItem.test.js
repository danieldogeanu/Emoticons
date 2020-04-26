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
const compNames = {
	list: {
		desktop: 'DesktopListItem',
		mobile: 'MobileListItem',
	},
	emoticon: 'Emoticon',
	name: 'Name',
	copyBtn: 'CopyButton',
};
const classNames = {
	card: 'mobileCard',
	ripple: 'ripple',
};

describe('ListItem Component', () => {

	it('renders desktop list item properly', () => {
		const {getByTestId, container} = render(<ListItem type="desktop" data={testEmoticon} />);
		const rendered = {
			item: getByTestId(compNames.list.desktop),
			emoticon: container.querySelector(`.${compNames.emoticon}`),
			name: container.querySelector(`.${compNames.name}`),
			copyBtn: container.querySelector(`.${compNames.copyBtn}`),
		};

		expect(rendered.item).toBeInTheDocument();
		expect(rendered.item).toHaveClass(compNames.list.desktop);
		expect(rendered.item).toContainElement(rendered.emoticon);
		expect(rendered.item).toContainElement(rendered.name);
		expect(rendered.item).toContainElement(rendered.copyBtn);
		expect(rendered.item).toMatchSnapshot();

		expect(rendered.emoticon).toHaveTextContent(testEmoticon.char);
		expect(rendered.emoticon).toHaveAttribute('aria-label', testEmoticon.name);
		expect(rendered.name).toHaveTextContent(testEmoticon.name);
		expect(rendered.copyBtn).toHaveAttribute('data-clipboard-text', testEmoticon.char);
	});

	it('renders mobile list item properly', () => {
		const {getByTestId, container} = render(<ListItem type="mobile" data={testEmoticon} />);
		const rendered = {
			item: getByTestId(compNames.list.mobile),
			copyBtn: container.querySelector(`.${compNames.copyBtn}`),
			name: container.querySelector(`.${compNames.name}`),
			emoticon: container.querySelector(`.${compNames.emoticon}`),
		};

		expect(rendered.item).toBeInTheDocument();
		expect(rendered.item).toHaveClass(compNames.list.mobile);
		expect(rendered.item).toContainElement(rendered.copyBtn);
		expect(rendered.item).toContainElement(rendered.name);
		expect(rendered.item).toContainElement(rendered.emoticon);
		expect(rendered.item).toMatchSnapshot();

		expect(rendered.copyBtn).toHaveAttribute('data-clipboard-text', testEmoticon.char);
		expect(rendered.copyBtn).toHaveClass(classNames.card, classNames.ripple);
		expect(rendered.copyBtn).toContainElement(rendered.name);
		expect(rendered.copyBtn).toContainElement(rendered.emoticon);

		expect(rendered.name).toHaveTextContent(testEmoticon.name);
		expect(rendered.emoticon).toHaveTextContent(testEmoticon.char);
		expect(rendered.emoticon).toHaveAttribute('aria-label', testEmoticon.name);
	});

});
