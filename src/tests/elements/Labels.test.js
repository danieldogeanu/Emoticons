import React from 'react';
import {render} from '@testing-library/react';
import Labels from '../../elements/Labels';
import {labels} from '../../details.json';


describe('Labels Element', () => {

	it('renders labels element properly', () => {
		const {getByTestId} = render(<Labels />);
		const renderedLabels = getByTestId('Labels');

		expect(renderedLabels).toBeInTheDocument();
		expect(renderedLabels).toHaveClass('Labels');
		expect(renderedLabels).toMatchSnapshot();
	});

	it('renders all list columns labels properly', () => {
		const {getByText} = render(<Labels />);

		labels.forEach(label => {
			const renderedLabel = getByText(label.name);

			expect(renderedLabel).toBeInTheDocument();
			expect(renderedLabel).toHaveClass('Label', label.class);
			expect(renderedLabel).toHaveTextContent(label.name);
		});
	});

});
