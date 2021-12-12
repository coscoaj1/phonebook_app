import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

import Person from './Person';

test('renders content', () => {
	const person = {
		name: 'Component testing is done with react-testing-library',
		phoneNumber: '828-555-1212',
	};

	const view = render(<Person person={person} />);

	expect(view.container).toHaveTextContent(
		'Component testing is done with react-testing-library'
	);
	const button = view.container.querySelector('button');

	console.log(prettyDOM(button));
});

test('clicking the button calls the event handler once', () => {
	const person = {
		name: 'Component testing is done with react-testing library',
		phoneNumber: '828-555-1212',
	};

	const mockHandler = jest.fn();

	const view = render(<Person person={person} handleDelete={mockHandler} />);

	const button = view.getByText('Delete');
	fireEvent.click(button);

	expect(mockHandler.mock.calls).toHaveLength(1);
});
