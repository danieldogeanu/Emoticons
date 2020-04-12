import React from 'react';
import {render} from '@testing-library/react';
import IconsSprite from '../../elements/IconsSprite';

describe('IconsSprite Element', () => {

	it('renders icons sprite properly', () => {
		const testId = 'IconsSprite';
		const {getByTestId, container} = render(<IconsSprite />);
		const renderedSprite = getByTestId(testId);
		const renderedSVG = container.querySelector('svg');

		expect(renderedSprite).toBeInTheDocument();
		expect(renderedSprite).toHaveClass(testId);
		expect(renderedSprite).toHaveStyle('display: none;');
		expect(renderedSprite).toContainElement(renderedSVG);
		expect(renderedSprite).toMatchSnapshot();
	});

});
