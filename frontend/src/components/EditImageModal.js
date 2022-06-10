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
 * Display a modal to add an image.
 */
export default class EditImageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeImage: this.props.activeImage,
        };
    }
    handleChange = (e) => {
        let {name, value} = e.target;
        if(e.target.type === "checkbox") {
            value = e.target.checked;
        }
        if(e.target.type === "file") {
            value = e.target.files[0]
        }
        const activeImage = { ...this.state.activeImage, [name]: value };
        this.setState({activeImage: activeImage})
    };
    render() {
        const {toggle, onSave} = this.props;

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Product Image</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.activeImage.name}
                                onChange={this.handleChange}
                                placeholder="Enter Image Name"
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Image</Label>
                            <Input
                                type="file"
                                id="image"
                                name="image"
                                label={this.state.activeImage.image.name}
                                onChange={this.handleChange}
                                placeholder="Choose Image"
                            ></Input>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input
                                type="checkbox"
                                name="default"
                                checked={this.state.activeImage.default}
                                onChange={this.handleChange}
                            ></Input>
                            Default
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="submit" color="success"
                        onClick={() => onSave(this.state.activeImage)}
                    >Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
