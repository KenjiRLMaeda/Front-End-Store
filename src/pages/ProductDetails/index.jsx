import React, { Component } from 'react';
import propTypes from 'prop-types';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as api from '../../services/api';
import EvaluationForm from '../../components/EvaluationForm';
import './styles.css';
import Evaluation from '../../components/Evaluation';

class ProductDetails extends Component {
  state ={
    product: {},
    email: '',
    evaluationInput: '',
    evaluations: [],
    stars: ['star', 'star', 'star', 'star', 'star'],
    initialStateStars: ['star', 'star', 'star', 'star', 'star'],
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const product = await api.getProductById(id);
    const evaluations = api.getEvaluationsToProduct(id);
    this.setState({ product, evaluations });
  }

  handleChangeEvaluationForm = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  changeColorEvaluationForm = (ratingValue) => {
    const { initialStateStars } = this.state;
    const stars = [...initialStateStars];

    for (let i = 0; i <= ratingValue; i += 1) {
      stars[i] = 'starChecked';
    }
    this.setState({ stars });
  }

  handleSubmitEvaluationForm = (event) => {
    event.preventDefault();
    const { stars, email, evaluationInput, initialStateStars, product } = this.state;
    const starsRatingValue = stars.reduce((acc, curr) => {
      if (curr === 'starChecked') {
        return acc + 1;
      }
      return acc;
    }, 0);

    const evaluation = {
      starsRatingValue,
      email,
      evaluation: evaluationInput,
      productId: product.id,
    };

    api.setEvaluationToProduct(evaluation);

    this.setState((prevState) => (
      {
        evaluations: [...prevState.evaluations, evaluation],
        email: '',
        evaluationInput: '',
        stars: initialStateStars,
      }
    ));
  }

  render() {
    const { product, evaluations } = this.state;
    const { handleAddItemToCart, buttonDisabled } = this.props;
    return (
      <div>
        <section>
          <Link data-testid="shopping-cart-button" to="/cart">
            <FiShoppingCart size={ 30 } color="black" />
          </Link>
          <section>

            <h1 data-testid="product-detail-name">{product.title}</h1>
            <img src={ product.thumbnail } alt={ product.title } />
            <strong>{product.price}</strong>
            <button
              onClick={ () => handleAddItemToCart(product) }
              data-testid="product-detail-add-to-cart"
              type="button"
              disabled={buttonDisabled}
            >
              add

            </button>
          </section>
        </section>
        <EvaluationForm
          handleChange={ this.handleChangeEvaluationForm }
          handleSubmit={ this.handleSubmitEvaluationForm }
          changeColor={ this.changeColorEvaluationForm }
          { ...this.state }
        />
        {
          evaluations.map((evaluation, index) => (
            <Evaluation key={ index } { ...evaluation } />
          ))
        }
      </div>
    );
  }
}
ProductDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleAddItemToCart: propTypes.func.isRequired,
  buttonDisabled: propTypes.bool.isRequired,
};

export default ProductDetails;
