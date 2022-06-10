import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the login modal', () => {
  render(<App />);
  const linkElement = screen.getByRole('button', {name: /Login/i});
  expect(linkElement).toBeInTheDocument();
});