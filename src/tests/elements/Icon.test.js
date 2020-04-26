import React from 'react';
import {render} from '@testing-library/react';
import Icon from '../../elements/Icon';

const classNames = {
	icon: 'icon',
	test: 'test',
};

describe('Icon Element', () => {

	it('renders svg icon properly', () => {
		const {container} = render(<Icon name={classNames.test} />);
		const rendered = {
			icon: container.querySelector('svg'),
			use: container.querySelector('use'),
		};

		expect(rendered.icon).toBeInTheDocument();
		expect(rendered.icon).toHaveClass('icon', classNames.test);
		expect(rendered.icon).toContainElement(rendered.use);
		expect(rendered.icon).toMatchSnapshot();
		expect(rendered.use).toHaveAttribute('xlink:href', `#${classNames.test}`);
	});

});
