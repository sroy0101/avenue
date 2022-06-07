import React, { Component } from "react";
import EditModal from "./components/EditModal";
import LoginModal from "./components/LoginModal";

import API from './api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewCompleted: false,
      productList: [],
      productImageList: [],
      editModal: false,
      loginModal: false,
      // token: "ae0b8a11cb3ec4ab266f4d5dc83114d6fb79ca37",
      activeItem: {
        sku: "",
        price: 0,
        name: "",
        description: "",
        active: false,
        shipment_time: "",
        inventory: "",
        gender: "",
      }
    }
  }
  componentDidMount() {
    this.initialize()
  }
  /**
   * Show the login modal (if no access token).
   * Otherwise, get the product list from backend.
   */
  initialize = () => {
    // Do we have a token and is valid (test with API)
    if (this.state.token == null) {
      // NO --> show login modal to get token
      this.toggleLoginModal()
    } else {
      const token = this.state.token
      API.interceptors.request.use(function(config) {
        config.headers.Authorization = `Token ${token}`
        return config
      })
      this.refreshList()
    }
  }
  toggleLoginModal = () => {
    this.setState({ loginModal: !this.loginModal})
  };
  isRetry = () => {
    return this.state.loginRetry;
  }

  /**
   * Get the user token from backend with the username and password.
   * This event is triggered by the loginModal.
   * @param {*} username
   * @param {*} password
   */
  handleLogin = (username, password) => {
    // console.log(username, password)
    if (username && password) {
      let formData = new FormData()
      formData.append("username", username)
      formData.append("password", password)

      API
        .post('/dj-rest-auth/login/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          this.setState({
              token: res.data.key,
              loginModal: false
            }, () => {
            this.initialize()
          })
        })
        .catch((err) => {
          window.alert("Login failed. Please try again.")
          console.log(err)
        })
    }
  };
  /**
   * Refresh the product list and product images.
   */
  refreshList = () => {
    API
      .get("/api/products/")
      .then((res) => this.setState({ productList: res.data }))
      .catch((err) => console.log(err))
    API
      .get("/api/productimages/")
      .then((res) => this.setState({ productImageList: res.data }))
      .catch((err) => console.log(err))

  };
  toggleEditModal = () => {
    this.setState({ editModal: !this.state.editModal })
  };
  handleSubmit = (item) => {
    this.toggleEditModal();
    console.log(item)
    if (item.id) {
      API
        .put(`/api/products/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    API
      .post("/api/products/", item)
      .then((res) => this.refreshList());
  };
  handleDelete = (item) => {
    API
      .delete(`/api/products/${item.id}/`)
      .then((res) => this.refreshList)
  };
  createItem = () => {
    const item = {
      sku: "",
      price: 0,
      name: "",
      description: "",
      active: false,
      shipment_time: "",
      inventory: "",
      gender: "M",
    }
    this.setState({ activeItem: item, editModal: !this.state.editModal })
  };
  editItem = (item) => {
    this.setState({
      activeItem: item,
      editModal: !this.state.editModal
    })
  };
  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false })
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.productList
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item "
      >
        <div className="d-flex justify-content-between align-items-center">
          <span
            className="todo-title mr-2"
            title={item.name}
          >
            {item.name}
          </span>
          <span>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editItem(item)}
            >Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(item)}
            >Delete
            </button>
          </span>
        </div>
      </li>
    ));
  }
  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Product Manager</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >Add product</button>
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.editModal ? (
          <EditModal
            activeItem={this.state.activeItem}
            toggle={this.toggleEditModal}
            onSave={this.handleSubmit}
          >
          </EditModal>
        ) : null }
        { this.state.loginModal ? (
          <LoginModal
          toggle={this.toggleLoginModal}
          onSave={this.handleLogin}
          >
          </LoginModal>
          ) : null }
      </main>
    );
  }
}


export default App;
