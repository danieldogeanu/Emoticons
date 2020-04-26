import React from 'react';
import {render} from '@testing-library/react';
import ClearButton from '../../elements/ClearButton';

const btnTitle = 'Clear Input';

describe('ClearButton Element', () => {

	it('renders clear button properly', () => {
		const {getByTitle} = render(<ClearButton />);
		const renderedBtn = getByTitle(btnTitle);

		expect(renderedBtn).toBeInTheDocument();
		expect(renderedBtn).toHaveClass('ClearButton');
		expect(renderedBtn).toMatchSnapshot();
	});

	it('has screen reader text', () => {
		const {getByTitle, getByText} = render(<ClearButton />);
		const rendered = {
			btn: getByTitle(btnTitle),
			srTxt: getByText(btnTitle),
		};

		expect(rendered.btn).toContainElement(rendered.srTxt);

		expect(rendered.srTxt).toBeInTheDocument();
		expect(rendered.srTxt).toHaveClass('show-for-screen-reader');
	});

	it('has close svg icon', () => {
		const {getByTitle, container} = render(<ClearButton />);
		const rendered = {
			btn: getByTitle(btnTitle),
			svg: container.querySelector('svg'),
		};

		expect(rendered.btn).toContainElement(rendered.svg);

		expect(rendered.svg).toBeInTheDocument();
		expect(rendered.svg).toHaveClass('icon', 'close');
	});

});
