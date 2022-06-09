
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import EditImageModal from './EditImageModal';

const activeImage= {
  name: "",
  product: null,
  image: "",
  default: false,
}
const handleImageSubmit = jest.fn();
const toggleImageEditModal = jest.fn();

it("renders the product edit form", () => {
  render(
    <EditImageModal activeImage={activeImage} toggle={toggleImageEditModal} onSave={handleImageSubmit}/>
  )
  expect(screen.getByLabelText('Name').type).toBe('text');
  expect(screen.getByLabelText('Image').type).toBe('file');
});

it("calls the event handler on save", () => {
  render(
    <EditImageModal activeImage={activeImage} toggle={toggleImageEditModal} onSave={handleImageSubmit}/>
  )
  const save_button = screen.getByText('Save');
  fireEvent.click(save_button);
  expect(handleImageSubmit).toHaveBeenCalledTimes(1);
});