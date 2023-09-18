import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);

});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const headerElement = screen.queryByText(/contact form/i);

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeTruthy();
    expect(headerElement).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = 'kev';
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1); 
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(3); 

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = 'Brandon';
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);

    const lastName = 'Nguyen';
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, lastName);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1); 
    

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, 'wrongEmail@gmail');

    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument();


});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstName = 'Brandon';
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);

    const lastName = 'Nguyen';
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, lastName);

    const email = 'brandonxnguyen@gmail.com';
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, email);

    const button = screen.getByRole('button');
    userEvent.click(button);


    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Brandon');
        const lastNameDisplay = screen.queryByText('Nguyen');
        const emailDisplay = screen.queryByText('brandonxnguyen@gmail.com');
        const messageDisplay = screen.queryByText('messageDisplay');

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstName = 'Brandon';
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);

    const lastName = 'Nguyen';
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, lastName);

    const email = 'brandonxnguyen@gmail.com';
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, email);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const message = 'something';
    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, message);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Brandon');
        const lastNameDisplay = screen.queryByText('Nguyen');
        const emailDisplay = screen.queryByText('brandonxnguyen@gmail.com');
        const messageDisplay = screen.queryByText('something');

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
        expect(firstName).toBeTruthy();
        expect(lastName).toBeTruthy();
        expect(email).toBeTruthy();
        expect(message).toBeTruthy();
    });
    


});
