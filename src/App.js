import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import * as api from './services/api';
import SearchForm from './pages/SearchForm';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import Header from './components/Header/Header';
import Checkout from './pages/Checkout';

class App extends Component {
  state = {
    categories: [],
    searchInput: '',
    products: [],
    cart: [],
    finalPrice: 0,
    buttonDisabled: false,
  }

  handleDeleteItem = (id) => {
    const { cart } = this.state;
    const newCart = cart.filter((item) => item.id !== id);
    this.setState({ cart: newCart });
    this.handleFinalPrice();
  }

  handleDecrement = (id) => {
    const { cart } = this.state;
    const productInCart = cart.find((item) => item.id === id);
    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;
      productInCart.totalPrice = productInCart.price * productInCart.quantity;
      api.clearProducts(id);
      this.setState(() => (
        {
          cart: [...cart.filter((item) => item.id !== id), productInCart],
        }
      ));
    } else {
      api.clearProducts(id);
      this.setState(() => ({
        cart: [...cart.filter((item) => item.id !== id)],
      }));
    }
    this.handleFinalPrice();
  }

  handleIncrement = (id) => {
    const { cart } = this.state;
    const productInCart = cart.find((item) => item.id === id);
    const { available_quantity: availableQuantity } = productInCart;

    if (availableQuantity > productInCart.quantity) {
      productInCart.quantity += 1;
      productInCart.totalPrice = productInCart.price * productInCart.quantity;
      this.setState(() => (
        {
          cart: [...cart.filter((item) => item.id !== id), productInCart],
        }
      ));

    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
    this.handleFinalPrice();
  }

  handleAddItemToCart = (product) => {
    const { cart } = this.state;
    const productData = {
      ...product,
      quantity: 0,
      totalPrice: 0,
    };
    const productInCart = cart.find(({ id }) => id === product.id) ?? productData;
    const { available_quantity: availableQuantity } = productInCart;
    if (availableQuantity > productInCart.quantity){
      productInCart.quantity += 1;
      productInCart.totalPrice = productInCart.price * productInCart.quantity;
      api.addProducts(productInCart);
      this.setState(() => (
        {
          cart: [...cart.filter(({ id }) => id !== product.id), productInCart],
        }
      ));
    } else {
      this.setState({
        buttonDisabled: true,
      })
    }

    this.handleFinalPrice();
  }

  handleFinalPrice = () => {
    this.setState((prevState) => {
      const sumPrice = prevState.cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
      return ({ finalPrice: sumPrice.toFixed(2) });
    });
  }

  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState(() => ({ searchInput: value }));
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    const products = (await api.getProductsFromCategoryAndQuery(searchInput)).results;
    this.setState(() => ({ products }));
  }

  handleButtonClick = async (id) => {
    const products = (await api.getProductsByCategory(id)).results;
    this.setState(() => ({ products }));
  }

  componentDidMount = async () => {
    const categories = await api.getCategories();
    const products = api.getProducts();
    this.setState({
      categories,
      cart: products,
    });
  };

  render() {
    return (
      <Router>
        <Header { ...this.state } />
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <SearchForm
                { ...this.state }
                handleButtonClick={ this.handleButtonClick }
                handleSubmit={ this.handleSubmit }
                handleInputChange={ this.handleInputChange }
                handleAddItemToCart={ this.handleAddItemToCart }

              />) }
          />
          <Route
            path="/cart"
            render={ () => (<ShoppingCart
              { ...this.state }
              handleIncrement={ this.handleIncrement }
              handleDecrement={ this.handleDecrement }
              handleDeleteItem={ this.handleDeleteItem }
            />) }
          />
          <Route
            path="/product/:id"
            render={ (params) => (
              <ProductDetails
                { ...params }
                handleAddItemToCart={ this.handleAddItemToCart }
              />) }
          />
          <Route
            path="/checkout"
            render={ (params) => (<Checkout
              { ...this.state }
              { ...params }
            />) }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
