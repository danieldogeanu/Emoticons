import React from 'react';
import {render} from '@testing-library/react';
import Emoticon from '../../elements/Emoticon';

const testEmoticon = {
	char: '😄',
	name: 'grinning face with smiling eyes',
};

describe('Emoticon Element', () => {

	it('renders emoticon element properly', () => {
		const {getByRole} = render(
			<Emoticon name={testEmoticon.name} char={testEmoticon.char} />
		);
		const renderedEmoticon = getByRole('img');

		expect(renderedEmoticon).toBeInTheDocument();
		expect(renderedEmoticon).toHaveClass('Emoticon');
		expect(renderedEmoticon).toHaveAttribute('aria-label', testEmoticon.name);
		expect(renderedEmoticon).toHaveTextContent(testEmoticon.char);
		expect(renderedEmoticon).toMatchSnapshot();
	});

});
