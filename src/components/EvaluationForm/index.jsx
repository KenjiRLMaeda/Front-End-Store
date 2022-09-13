import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import propTypes from 'prop-types';

class EvaluationForm extends Component {
  render() {
    const {
      stars,
      email,
      evaluationInput,
      handleChange,
      handleSubmit,
      changeColor,
    } = this.props;

    return (
      <form>
        <section>
          <input
            data-testid="product-detail-email"
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ handleChange }
          />
          {
            stars.map((star, index) => (
              <FaStar
                key={ index }
                data-testid={ `${index + 1}-rating` }
                className={ star }
                size={ 30 }
                onClick={ () => changeColor(index) }
              />
            ))
          }
        </section>
        <textarea
          data-testid="product-detail-evaluation"
          placeholder="Comentário"
          onChange={ handleChange }
          value={ evaluationInput }
          name="evaluationInput"
        />
        <button
          data-testid="submit-review-btn"
          type="submit"
          onClick={ handleSubmit }
        >
          Avaliar

        </button>
      </form>
    );
  }
}
EvaluationForm.propTypes = {
  stars: propTypes.arrayOf(propTypes.string).isRequired,
  email: propTypes.string.isRequired,
  evaluationInput: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
  changeColor: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
};
export default EvaluationForm;
