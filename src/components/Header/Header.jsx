import React, { Component } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { cart } = this.props;
    const totalProducts = cart.reduce((total, product) => total + product.quantity, 0);
    return (
      <>
        <h1>Nome loja</h1>
        <form>
          <Link to="/cart">
            <FiShoppingCart size={ 30 } color="black" />
          </Link>
        </form>
        <p data-testid="shopping-cart-size">{totalProducts}</p>
      </>
    );
  }
}

Header.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Header;
