import React from 'react';
import {render} from '@testing-library/react';
import ScreenReaderText from '../../elements/ScreenReaderText';

const testText = 'Some Test Text';

describe('ScreenReaderText Element', () => {

	it('renders screen reader text properly', () => {
		const {getByTestId} = render(<ScreenReaderText text={testText} />);
		const renderedSRT = getByTestId('ScreenReaderText');

		expect(renderedSRT).toBeInTheDocument();
		expect(renderedSRT).toHaveClass('show-for-screen-reader');
		expect(renderedSRT).toHaveTextContent(testText);
		expect(renderedSRT).toMatchSnapshot();
	});

});
