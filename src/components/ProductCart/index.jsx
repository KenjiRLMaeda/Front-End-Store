import React, { Component } from 'react';
import propTypes from 'prop-types';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

class ProductCart extends Component {
  render() {
    const {
      title,
      price,
      thumbnail,
      quantity,
      totalPrice,
      handleDecrement,
      handleIncrement,
      handleDeleteItem,
      id,
      buttonDisabled,
    } = this.props;

    return (
      <div>
        <button onClick={ () => handleDeleteItem(id) } type="button">
          <MdOutlineDelete />
        </button>
        <h2 data-testid="shopping-cart-product-name">{title}</h2>
        <img width="150px" src={ thumbnail } alt={ title } />
        <strong>{price}</strong>
        <button
          onClick={ () => handleDecrement(id) }
          data-testid="product-decrease-quantity"
          type="button"
        >

          <AiOutlineMinusCircle size={ 30 } color="black" />
        </button>
        <p data-testid="shopping-cart-product-quantity">
          quantidade:

          {' '}
          {quantity}

        </p>
        <button
          onClick={ () => handleIncrement(id) }
          data-testid="product-increase-quantity"
          type="button"
          disabled={buttonDisabled}
        >

          <AiOutlinePlusCircle size={ 30 } color="black" />
        </button>

        <strong>{totalPrice}</strong>
      </div>
    );
  }
}

ProductCart.propTypes = {
  title: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  thumbnail: propTypes.string.isRequired,
  quantity: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
  handleDecrement: propTypes.func.isRequired,
  handleIncrement: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
  handleDeleteItem: propTypes.func.isRequired,
  buttonDisabled: propTypes.bool.isRequired,
};
export default ProductCart;
