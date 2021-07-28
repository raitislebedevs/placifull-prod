import React from 'react';
import { Modal } from 'react-bootstrap';
import CheckoutForm from '../CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

const StripeContainer = (props) => {
  const { handleDataSubmit, paymentDetails, setIsStripe } = props;
  const PUBLIV_KEY =
    'pk_test_51HYshtLQeXlfqG3xg2gis20CqvIQVXWLc946TBWzIRAHBoTgMnpY47eMXxx21I6tDdv0fVp01OUUl6PmmzdXepgB00izqNEo69';

  const stripePromise = loadStripe(PUBLIV_KEY);
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
