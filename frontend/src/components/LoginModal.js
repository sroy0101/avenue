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
 * Display a login modal and collect the username and password.
 */
export default class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        console.log(props)
    }
    handleChange = (e) => {
       let {name, value} = e.target;
       if(name === "username") {
           this.setState({
               "username": value
           })
       } else if (name === "password") {
           this.setState({
               "password": value
           })
       }
    };
    render() {
        const {toggle, onSave} = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                placeholder="Enter Username"
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Enter Password"
                            ></Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => onSave(this.state.username, this.state.password)}
                    >Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
