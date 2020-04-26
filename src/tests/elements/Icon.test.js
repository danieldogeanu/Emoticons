import React from 'react';
import {render} from '@testing-library/react';
import Icon from '../../elements/Icon';

const compClass = {
	icon: 'icon',
	test: 'test',
};

describe('Icon Element', () => {

	it('renders svg icon properly', () => {
		const {container} = render(<Icon name={compClass.test} />);
		const rendered = {
			icon: container.querySelector('svg'),
			use: container.querySelector('use'),
		};

		expect(rendered.icon).toBeInTheDocument();
		expect(rendered.icon).toHaveClass('icon', compClass.test);
		expect(rendered.icon).toContainElement(rendered.use);
		expect(rendered.icon).toMatchSnapshot();
		expect(rendered.use).toHaveAttribute('xlink:href', `#${compClass.test}`);
	});

});
