import React from 'react';
import {render} from '@testing-library/react';
import Name from '../../elements/Name';

const testName = 'Test Emoticon Name';

describe('Name Element', () => {

	it('renders emoticon name properly', () => {
		const {getByText} = render(<Name name={testName} />);
		const renderedName = getByText(testName);

		expect(renderedName).toBeInTheDocument();
		expect(renderedName).toHaveTextContent(testName);
		expect(renderedName).toHaveClass('Name');
		expect(renderedName).toMatchSnapshot();
	});

});
