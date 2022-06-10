import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

/**
 * Display a modal to add a product or edit an existing one.
 */
export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
        this.render()
    }
    handleChange = (e) => {
        let {name, value} = e.target;
        if(e.target.type === "checkbox") {
            value = e.target.checked;
        }
        console.log(`${name} ${value}`)
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({activeItem: activeItem})
        console.log(this.state.activeItem)
    };
    render() {
        const {toggle, onSave} = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Product</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="product-sku">SKU</Label>
                            <Input
                                type="text"
                                id="product-sku"
                                name="sku"
                                value={this.state.activeItem.sku}
                                onChange={this.handleChange}
                                placeholder="Enter SKU"
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="product-price">Price</Label>
                            <Input
                                type="number"
                                id="product-price"
                                name="price"
                                value={this.state.activeItem.price}
                                onChange={this.handleChange}
                                placeholder="Enter Price"
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="product-name">Name</Label>
                            <Input
                                type="text"
                                id="product-name"
                                name="name"
                                value={this.state.activeItem.name}
                                onChange={this.handleChange}
                                placeholder="Enter Product Name"
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="product-description">Description</Label>
                            <Input
                                type="textarea"
                                id="product-description"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter Description"
                            ></Input>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input
                                type="checkbox"
                                name="active"
                                checked={this.state.activeItem.active}
                                onChange={this.handleChange}
                            ></Input>
                            Active
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for="product-shipment-time">Shipment Time</Label>
                            <Input
                                type="text"
                                id="product-shipment-time"
                                name="shipment_time"
                                value={this.state.activeItem.shipmentTime}
                                onChange={this.handleChange}
                                placeholder="Enter Shipment Time"
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="product-inventory">Inventory</Label>
                            <Input
                                type="number"
                                id="product-inventory"
                                name="inventory"
                                value={this.state.activeItem.inventory}
                                onChange={this.handleChange}
                                placeholder="Enter Available Inventory Count"
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="product-gender">Gender</Label>
                            <Input
                                type="select"
                                id="product-gender"
                                name="gender"
                                value={this.state.activeItem.gender}
                                onChange={this.handleChange}
                                placeholder="Enter Gender"
                            >
                                <option value="M">M</option>
                                <option value="F">F</option>
                                <option value="U">U</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="submit" color="success"
                        onClick={() => onSave(this.state.activeItem)}
                    >Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
