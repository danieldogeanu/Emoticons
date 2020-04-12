import React from 'react';
import {render} from '@testing-library/react';
import Icon from '../../elements/Icon';

describe('Icon Element', () => {

	it('renders svg icon properly', () => {
		const testIcon = 'test';
		const {container} = render(<Icon name={testIcon} />);
		const renderedIcon = container.querySelector('svg');
		const useElement = container.querySelector('use');

		expect(renderedIcon).toBeInTheDocument();
		expect(renderedIcon).toHaveClass('icon', testIcon);
		expect(renderedIcon).toContainElement(useElement);
		expect(renderedIcon).toMatchSnapshot();
		expect(useElement).toHaveAttribute('xlink:href', `#${testIcon}`);
	});

});
