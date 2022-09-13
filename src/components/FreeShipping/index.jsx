import React, { Component } from 'react';
import { BsBoxSeam } from 'react-icons/bs';

class FreeShipping extends Component {
  render() {
    return (
      <span>
        <BsBoxSeam data-testid="free-shipping" size={ 30 } color="green" />
        Frete Grátis
      </span>);
  }
}

export default FreeShipping;
