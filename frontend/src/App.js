import React, { Component } from "react";
import EditModal from "./components/EditModal";
import LoginModal from "./components/LoginModal";
import EditImageModal from "./components/EditImageModal";

import API from './api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewCompleted: false,
      productList: [],
      productImageList: [],
      editModal: false,
      editImageModal: false,
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
      },
      activeImage: {
        name: "",
        product: null,
        image: "",
        default: false,
      }

    }
  }
  componentDidMount() {
    this.initialize()
  }
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
  handleLogin = (username, password) => {
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
        })
    }
  };
  refreshList = () => {
    API
      .get("/api/products/")
      .then((res) => {
        this.setState({ productList: res.data })
      })
      .catch((err) => this.process_refresh_error(err))
    API
      .get("/api/productimages/")
      .then((res) => this.setState({ productImageList: res.data }))
      .catch((err) => this.process_refresh_error(err))

  };
  process_refresh_error = (err) => {
    if (err.response && err.response.status === 403) {
      window.alert("Insufficient permissions. Please log in with a user belonging to the Merchandiser group.")
      window.location.reload()
    }
    if (err.response && err.response.status === 404) {
      this.setState({ productList: [] });
    }
  }
  toggleEditModal = () => {
    this.setState({ editModal: !this.state.editModal })
  };
  toggleImageEditModal = () => {
    this.setState({ editImageModal: !this.state.editImageModal})
  };
  handleSubmit = (item) => {
    this.toggleEditModal();
    if (item.id) {
      API
        .put(`/api/products/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    } else {
    API
      .post("/api/products/", item)
      .then((res) => this.refreshList());
    }
  };
  handleImageSubmit = (item) => {
    this.toggleImageEditModal();
    API
      .post('/api/productimages/', item, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => this.refreshList());
    return;
  };
  handleDelete = (item) => {
    API
      .delete(`/api/products/${item.id}/`)
      .then((res) => this.refreshList())
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          this.refreshList();
        }
      })
  };
  handleProductImageDelete = (productImage) => {
    API
      .delete(`/api/productimages/${productImage.id}`)
      .then((res) => this.refreshList())
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          this.refreshList();
        }
      })
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
  addImage = (product) => {
    const image = {
      name: "",
      product: product.id,
      image: "",
      default: false
    }
    this.setState({
      activeImage: image,
      editImageModal: !this.state.editImageModal
    })
  };
  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false })
  };
  get_small_img_url = (image_url) => {
    let parts = image_url.split(".")
    let small_url = parts.slice(0, -1) + "_small." + parts.pop()
    return small_url;
  };

  /**
   * Render the product and images from the product list.
   * @returns a React element for rendering by React.
   */
  renderItems = () => {
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
            <h5>{item.name}</h5>
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
        <div className="mt-4 w-100">
          {this.state.productImageList.filter((x) => x.product === item.id).map((productImage) => (
            <div key={productImage.id} className="d-inline-block relative rounded pr-3 mb-1 productImagePreview">
              <img alt={productImage.name} className="block rounded w-100" src={this.get_small_img_url(productImage.image)}/>
              <div>
                <button className="btn btn-danger mt-1" onClick={() => this.handleProductImageDelete(productImage)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 mb-2">
            <button
              className="btn btn-success"
              onClick={() => this.addImage(item)}
            >Add Image
            </button>
        </div>
      </li>
    ));
  }
  /**
   * Render the login or the product modal components based on the current state,
   * to collect related fields, make api calls and refresh the page based on the call response and results.
   * @returns a React element for rendering by React.
   */
  render() {
    return (
      <React.StrictMode>
        <main className="container">
          <h1 className="text-white text-uppercase text-center my-4">Product Manager</h1>
          <div className="row">
            <div className="col-md-8 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="mb-4">
                  <button
                    className="btn btn-primary"
                    onClick={this.createItem}
                  >Add Product</button>
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
          { this.state.editImageModal ? (
            <EditImageModal
              activeImage={this.state.activeImage}
              toggle={this.toggleImageEditModal}
              onSave={this.handleImageSubmit}
            ></EditImageModal>
          ): null }
          { this.state.loginModal ? (
            <LoginModal
            toggle={this.toggleLoginModal}
            onSave={this.handleLogin}
            >
            </LoginModal>
            ) : null }
        </main>
      </React.StrictMode>
    );
  }
}


export default App;
