import React, { Component } from 'react';
import propTypes from 'prop-types';

class CheckoutCard extends Component {
  render() {
    const {
      title,
      price,
      thumbnail,
      quantity,
      totalPrice,
    } = this.props;

    return (
      <div>
        <h2 data-testid="shopping-cart-product-name">{title}</h2>
        <img width="150px" src={ thumbnail } alt={ title } />
        <strong>{ `Preço por item: ${price}` }</strong>
        <p data-testid="shopping-cart-product-quantity">
          Quantidade:

          {' '}
          {quantity}

        </p>
        <strong>{ `Soma: ${totalPrice}` }</strong>
      </div>
    );
  }
}

CheckoutCard.propTypes = {
  title: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  thumbnail: propTypes.string.isRequired,
  quantity: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
};
export default CheckoutCard;
