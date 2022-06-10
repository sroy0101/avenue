import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LoginModal from './LoginModal';

const handleLogin = jest.fn();
const toggleLoginModal = jest.fn();

it("renders the login form", () => {

  render(
    <LoginModal toggle={toggleLoginModal} onSave={handleLogin}/>
  )

  expect(screen.getByLabelText('Username').id).toBe('username');
  expect(screen.getByLabelText('Password').id).toBe('password');
  expect(screen.getByRole('button', {name: /Login/i}).type).toBe('submit');

});

it("calls the event handler on save", () => {
  render(
    <LoginModal toggle={toggleLoginModal} onSave={handleLogin}/>
  )
  const save_button = screen.getByRole('button', {name: /Login/i});
  fireEvent.click(save_button);
  expect(handleLogin).toHaveBeenCalledTimes(1);
});

