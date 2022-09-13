import React, { Component } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import ProductCard from '../../components/ProductCard';

class SearchForm extends Component {
  render() {
    const {
      categories,
      searchInput,
      products,
      handleInputChange,
      handleSubmit,
      handleButtonClick,
      handleAddItemToCart,
    } = this.props;

    return (
      <>
        <section>
          <form>

            <input
              onChange={ handleInputChange }
              value={ searchInput }
              name="searchInput"
              type="text"
              data-testid="query-input"
            />
            <button
              data-testid="query-button"
              onClick={ handleSubmit }
              type="submit"
            >
              Buscar

            </button>
          </form>
          <Link to="/cart" data-testid="shopping-cart-button">
            <FiShoppingCart size={ 30 } />
          </Link>

        </section>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <aside>
          {
            categories.map((category) => (
              <label data-testid="category" htmlFor={ category.id } key={ category.id }>
                <input
                  onClick={ () => handleButtonClick(category.id) }
                  type="radio"
                  name="SelectCategory"
                  id={ category.id }
                  value={ category.name }
                  key={ category.id }

                />
                {category.name}
              </label>

            ))
          }
        </aside>
        <section>
          {
            products.map((product) => (
              <ProductCard
                { ...product }
                key={ product.id }
                handleAddItemToCart={ handleAddItemToCart }
              />
            ))
          }
        </section>
      </>
    );
  }
}

SearchForm.propTypes = {
  categories: propTypes.arrayOf(propTypes.object).isRequired,
  searchInput: propTypes.string.isRequired,
  products: propTypes.arrayOf(propTypes.object).isRequired,
  handleButtonClick: propTypes.func.isRequired,
  handleInputChange: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  handleAddItemToCart: propTypes.func.isRequired,
};

export default SearchForm;
