import React from 'react';
import {render} from '@testing-library/react';
import ListContainer from '../../components/ListContainer';

const testEmoticons = [{
	"codes": "1F600",
	"char": "😀",
	"name": "grinning face",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
}, {
	"codes": "1F603",
	"char": "😃",
	"name": "grinning face with big eyes",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
}, {
	"codes": "1F604",
	"char": "😄",
	"name": "grinning face with smiling eyes",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
}, {
	"codes": "1F601",
	"char": "😁",
	"name": "beaming face with smiling eyes",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
}, {
	"codes": "1F606",
	"char": "😆",
	"name": "grinning squinting face",
	"category": "Smileys & Emotion (face-smiling)",
	"group": "Smileys & Emotion",
	"subgroup": "face-smiling"
}];

const compNames = {
	container: 'ListContainer',
	list: 'List',
	labels: 'Labels',
	label: 'Label',
	item: {
		desktop: 'DesktopListItem',
		mobile: 'MobileListItem',
	},
	footer: 'Footer',
};
const classNames = {
	simplebar: {
		wrapper: 'simplebar-wrapper',
		observer: 'simplebar-height-auto-observer',
		observerWrapper: 'simplebar-height-auto-observer-wrapper',
		mask: 'simplebar-mask',
		offset: 'simplebar-offset',
		content: 'simplebar-content',
		contentWrapper: 'simplebar-content-wrapper',
		placeholder: 'simplebar-placeholder',
		track: 'simplebar-track',
		scrollbar: 'simplebar-scrollbar',
		horizontal: 'simplebar-horizontal',
		vertical: 'simplebar-vertical',
	},
	innerWrapper: 'innerWrapper',
	listUl: 'listUl',
};

let filterText = '';

describe('ListContainer Component', () => {

	it('renders list container and items properly', () => {
		const {getByTestId, getAllByTestId} = render(
			<ListContainer data={testEmoticons}
				filterText={filterText} />
		);
		const rendered = {
			container: getByTestId(compNames.container),
			list: getByTestId(compNames.list),
			ul: getByTestId(classNames.listUl),
			items: getAllByTestId(compNames.item.desktop),
			labels: getByTestId(compNames.labels),
			footer: getByTestId(compNames.footer),
		};

		expect(rendered.container).toBeInTheDocument();
		expect(rendered.container).toHaveClass(compNames.container);
		expect(rendered.container).toContainElement(rendered.list);
		expect(rendered.container).toContainElement(rendered.ul);
		expect(rendered.container).toContainElement(...rendered.items);
		expect(rendered.container).toContainElement(rendered.labels);
		expect(rendered.container).toContainElement(rendered.footer);
		expect(rendered.container).toMatchSnapshot();

		expect(rendered.list).toHaveClass(compNames.list);
		expect(rendered.list).toHaveAttribute('data-simplebar', 'init');
		expect(rendered.ul).toHaveAttribute('style', expect.stringContaining('padding-top', 'height'));

		expect(rendered.items.length).toEqual(testEmoticons.length);
		rendered.items.forEach((item, i) => {
			expect(item).toHaveTextContent(testEmoticons[i].char);
			expect(item).toHaveTextContent(testEmoticons[i].name);
		});
	});

});
