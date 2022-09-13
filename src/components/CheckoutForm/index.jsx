import React, { Component } from 'react';
import propTypes from 'prop-types';

class CheckoutForm extends Component {
  render() {
    const {
      name,
      email,
      cpf,
      phone,
      cep,
      address,
      handleChange,
      handleClick,
      isDisabled,
    } = this.props;
    return (
      <form>
        <fieldset>
          <legend>Informações do Comprador</legend>
          <label htmlFor="name">
            Nome completo
            <input
              name="name"
              type="text"
              value={ name }
              onChange={ handleChange }
              data-testid="checkout-fullname"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              name="email"
              type="text"
              value={ email }
              onChange={ handleChange }
              data-testid="checkout-email"
            />
          </label>
          <label htmlFor="cpf">
            CPF
            <input
              name="cpf"
              type="text"
              value={ cpf }
              onChange={ handleChange }
              data-testid="checkout-cpf"
            />
          </label>
          <label htmlFor="phone">
            Telefone
            <input
              name="phone"
              type="text"
              value={ phone }
              onChange={ handleChange }
              data-testid="checkout-phone"
            />
          </label>
          <label htmlFor="cep">
            CEP
            <input
              name="cep"
              type="text"
              value={ cep }
              onChange={ handleChange }
              data-testid="checkout-cep"
            />
          </label>
          <label htmlFor="address">
            Endereço
            <input
              name="address"
              type="text"
              value={ address }
              onChange={ handleChange }
              data-testid="checkout-address"
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Método de Pagamento</legend>
          <label htmlFor="payment">
            Boleto
            <br />
            <input
              name="payment"
              type="radio"
              value="boleto"
              onChange={ handleChange }
            />
          </label>
          <br />
          <label htmlFor="payment">
            Cartão de Crédito
            <br />
            <input
              name="payment"
              type="radio"
              value="visa"
              onChange={ handleChange }
            />
            Visa
            <input
              name="payment"
              type="radio"
              value="mastercard"
              onChange={ handleChange }
            />
            MasterCard
            <input
              name="payment"
              type="radio"
              value="elo"
              onChange={ handleChange }
            />
            Elo
          </label>
        </fieldset>
        <button
          name="buyButton"
          type="submit"
          disabled={ isDisabled }
          onClick={ handleClick }
        >
          Comprar
        </button>
      </form>
    );
  }
}

CheckoutForm.propTypes = {
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  cpf: propTypes.string.isRequired,
  phone: propTypes.string.isRequired,
  cep: propTypes.string.isRequired,
  address: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
  handleClick: propTypes.func.isRequired,
  isDisabled: propTypes.bool.isRequired,
};

export default CheckoutForm;
