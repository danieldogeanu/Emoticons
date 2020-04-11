import React from 'react';
import {render} from '@testing-library/react';
import CopyHint from '../../elements/CopyHint';

describe('CopyHint Element', () => {

	it('renders copy hint element properly', () => {
		const testHint = 'Test Hint';
		const {getByText} = render(<CopyHint text={testHint} />);
		const renderedHint = getByText(testHint);

		expect(renderedHint).toBeInTheDocument();
		expect(renderedHint).toHaveClass('CopyHint');
		expect(renderedHint).toHaveTextContent(testHint);
		expect(renderedHint).toMatchSnapshot();
	});

});
