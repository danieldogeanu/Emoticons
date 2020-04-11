import React from 'react';
import {render} from '@testing-library/react';
import Label from '../../elements/Label';

describe('Label Element', () => {

	it('renders list column label properly', () => {
		const labelObj = {class: 'test', name: 'Test'};
		const {getByText} = render(<Label label={labelObj} />);
		const renderedLabel = getByText(labelObj.name);

		expect(renderedLabel).toBeInTheDocument();
		expect(renderedLabel).toHaveTextContent(labelObj.name);
		expect(renderedLabel).toHaveClass('Label', labelObj.class);
		expect(renderedLabel).toMatchSnapshot();
	});

});
