import React from 'react';
import {render} from '@testing-library/react';
import Copy from '../../elements/Copy';

const btnText = 'Copy Me';
const TestButton = ({text}) => (<button>{text}</button>);

describe('Copy Element', () => {

	it('renders copy element properly', () => {
		const {getByTitle, getByText} = render(<Copy><TestButton text={btnText} /></Copy>);
		const rendered = {
			copy: getByTitle(/copy the emoticon/i),
			btn: getByText(btnText),
		};

		expect(rendered.copy).toBeInTheDocument();
		expect(rendered.copy).toHaveTextContent(btnText);
		expect(rendered.copy).toHaveClass('Copy');
		expect(rendered.copy).toContainElement(rendered.btn);
		expect(rendered.copy).toMatchSnapshot();
	});

});
