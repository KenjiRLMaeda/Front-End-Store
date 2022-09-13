import React, { Component } from 'react';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { FaBoxOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ProductCart from '../../components/ProductCart';

class ShoppingCart extends Component {
  render() {
    const { cart } = this.props;

    return (
      <div>
        <Link to="/">

          <FiArrowLeft size={ 30 } color="black" />
        </Link>
        <section>
          <FiShoppingCart size={ 30 } color="black" />
          <p>Carrinho de Compras</p>
        </section>
        <main>
          {
            cart.length > 0 ? cart.map((product) => (

              <ProductCart
                key={ product.id }
                { ...this.props }
                { ...product }
              />
            )) : (
              <>
                <FaBoxOpen size={ 30 } color="black" />
                <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              </>
            )
          }
          <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
        </main>
      </div>
    );
  }
}
ShoppingCart.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
};
export default ShoppingCart;
