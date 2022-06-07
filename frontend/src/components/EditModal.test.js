import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import EditModal from './EditModal';

const activeItem =  {
    sku: "1212",
    price: 100,
    name: "product",
    description: "product desc.",
    active: false,
    shipment_time: "2-3 days",
    inventory: "4",
    gender: "M"
}
const handleSubmit = jest.fn();
const toggleEditModal = jest.fn();


it("renders the product edit form", () => {

  render(
    <EditModal activeItem={activeItem} toggle={toggleEditModal} onSave={handleSubmit}/>
  )
  expect(screen.getByLabelText('SKU').type).toBe('text');
  expect(screen.getByLabelText('Price').type).toBe('number');
  expect(screen.getByLabelText('Name').type).toBe('text');
  expect(screen.getByLabelText('Description').type).toBe('textarea');
  expect(screen.getByLabelText('Shipment Time').type).toBe('text');
  expect(screen.getByLabelText('Inventory').type).toBe('number');
  expect(screen.getByLabelText('Gender').type).toBe('select-one');
  expect(screen.getByText('Save').type).toBe('button');

});

it("calls the event handler on save", () => {
  render(
    <EditModal activeItem={activeItem} toggle={toggleEditModal} onSave={handleSubmit}/>
  )
  const save_button = screen.getByText('Save');
  fireEvent.click(save_button);
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

