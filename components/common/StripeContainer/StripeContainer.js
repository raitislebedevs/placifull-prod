import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import CheckoutForm from '../CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import config from 'config';

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

const StripeContainer = (props) => {
  const { handleDataSubmit, paymentDetails, setIsStripe } = props;
  const PUBLIC_KEY = config.STRIPE.PUBLIC_KEY;

  const stripePromise = loadStripe(PUBLIC_KEY);

  return (
    <Modal {...props} size="lg" centered className="spiner__modal">
      <Modal.Body>
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          <CheckoutForm
            setIsStripe={setIsStripe}
            handleDataSubmit={handleDataSubmit}
            paymentDetails={paymentDetails}
          />
        </Elements>
      </Modal.Body>
    </Modal>
  );
};

export default StripeContainer;
