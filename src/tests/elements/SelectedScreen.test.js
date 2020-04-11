import React from 'react';
import {render} from '@testing-library/react';
import SelectedScreen from '../../elements/SelectedScreen';

describe('SelectedScreen Element', () => {

	it('renders selected screen properly', () => {
		const {getByTestId} = render(<SelectedScreen />);
		const renderedScreen = getByTestId('SelectedScreen');

		expect(renderedScreen).toBeInTheDocument();
		expect(renderedScreen).toHaveClass('SelectedScreen');
		expect(renderedScreen).toMatchSnapshot();
	});

});
