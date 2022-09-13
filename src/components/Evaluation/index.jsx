import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import propTypes from 'prop-types';

class Evaluation extends Component {
  createStarsRating = (starsRatingValue) => {
    const arrStars = ['star', 'star', 'star', 'star', 'star'];

    for (let i = 0; i < starsRatingValue; i += 1) {
      arrStars[i] = 'starChecked';
    }
    return arrStars;
  }

  render() {
    const { starsRatingValue, email, evaluation } = this.props;

    const starsRating = this.createStarsRating(starsRatingValue);

    return (
      <div>
        <section>
          <p>{email}</p>
          {
            starsRating.map((star, index) => (
              <FaStar
                key={ index }
                data-testid={ `${index + 1}-rating` }
                className={ star }
                id={ index }
                size={ 30 }
              />
            ))
          }
        </section>
        <p>{evaluation}</p>
      </div>
    );
  }
}
Evaluation.propTypes = {
  starsRatingValue: propTypes.number.isRequired,
  email: propTypes.string.isRequired,
  evaluation: propTypes.string.isRequired,
};

export default Evaluation;
