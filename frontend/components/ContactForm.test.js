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
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = 'kev';
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const firstName = '';
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);

    const lastName = '';
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, lastName);

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, true);

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = 'Brandon';
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);

    const lastName = 'Nguyen';
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, lastName);

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, '');
    

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'Brandon')

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
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

    const message = false;
    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, message);
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

    expect(firstName).toBeTruthy();
    expect(lastName).toBeTruthy();
    expect(email).toBeTruthy();
    expect(message).toBeTruthy();


});
