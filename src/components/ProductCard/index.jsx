import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FreeShipping from '../FreeShipping';

class ProductCard extends Component {
  render() {
    const { title, price, thumbnail, id, handleAddItemToCart, shipping, buttonDisabled } = this.props;
    const { free_shipping: freeShipping } = shipping;

    return (
      <div data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ `/product/${id}` }

        >
          <img width="250px" src={ thumbnail } alt={ title } />
          <strong>{title}</strong>
          <span>{price}</span>
        </Link>
        <button
          onClick={ () => handleAddItemToCart(this.props) }
          type="button"
          data-testid="product-add-to-cart"
          disabled={buttonDisabled}
        >
          add

        </button>

        {freeShipping && <FreeShipping />}

      </div>
    );
  }
}

ProductCard.propTypes = {
  title: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  thumbnail: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  handleAddItemToCart: propTypes.func.isRequired,
  shipping: propTypes.objectOf(propTypes.object).isRequired,
  buttonDisabled: propTypes.bool.isRequired,
};
export default ProductCard;
