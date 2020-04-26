import React from 'react';
import {render} from '@testing-library/react';
import IconsSprite from '../../elements/IconsSprite';

const compNames = {
	sprite: 'IconsSprite',
};

describe('IconsSprite Element', () => {

	it('renders icons sprite properly', () => {
		const {getByTestId, container} = render(<IconsSprite />);
		const rendered = {
			sprite: getByTestId(compNames.sprite),
			svg: container.querySelector('svg'),
		};

		expect(rendered.sprite).toBeInTheDocument();
		expect(rendered.sprite).toHaveClass(compNames.sprite);
		expect(rendered.sprite).toHaveStyle('display: none;');
		expect(rendered.sprite).toContainElement(rendered.svg);
		expect(rendered.sprite).toMatchSnapshot();
	});

});
