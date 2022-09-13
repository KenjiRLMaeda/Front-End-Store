import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import CheckoutCard from '../../components/CheckoutCard';
import CheckoutForm from '../../components/CheckoutForm';

class Checkout extends React.Component {
  state = {
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    isDisabled: true,
  }

  validateSubmitButton = () => {
    this.setState((prevState) => {
      const { name, email, cpf, phone, cep, address, payment } = prevState;
      const condition = (name.length > 0
        && email.length > 0
        && cpf.length > 0
        && phone.length > 0
        && cep.length > 0
        && address.length > 0
        && payment.length > 0);
      if (condition) {
        return ({ isDisabled: false });
      }
      return ({ isDisabled: true });
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.validateSubmitButton();
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      payment: '',
    });
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { cart, finalPrice } = this.props;
    return (
      <div>
        <Link to="/">
          <FiArrowLeft size={ 30 } color="black" />
        </Link>
        <Link to="/cart" data-testid="shopping-cart-button">
          <FiShoppingCart size={ 30 } />
        </Link>
        <section>
          <p>Finalizar Compra</p>
        </section>
        <main>
          <p>Revise seus Produtos</p>
          {
            cart.map((product) => (
              <CheckoutCard
                key={ product.id }
                { ...this.props }
                { ...product }
              />
            ))
          }
          <strong>{ `Total a pagar: ${finalPrice}` }</strong>
          <CheckoutForm
            { ...this.state }
            handleChange={ this.handleChange }
            handleClick={ this.handleClick }
          />
        </main>
      </div>
    );
  }
}

Checkout.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  finalPrice: propTypes.string.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
