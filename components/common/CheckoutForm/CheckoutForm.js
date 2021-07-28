import React, { useState } from 'react';
import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeServiss } from 'services/index';
import TostifyCustomContainer from '../TostifyCustomContainer/TostifyCustomContainer';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { CustomFormControl } from 'components/common';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  hidePostalCode: true,
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: 'black',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: 'black',
      },
      '::placeholder': {
        color: 'gray',
      },
    },
    invalid: {
      iconColor: 'red',
      color: 'red',
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="card__row">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const CheckoutForm = (props) => {
  const { t, handleDataSubmit, paymentDetails, setIsStripe } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    phone: '',
    name: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }
    try {
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      });

      if (result.error) {
        setProcessing(false);
        return setError(result.error);
      }

      let payload = {
        amount: (paymentDetails.totalCost * 100).toFixed(0),
        source: result.paymentMethod.id,
        receipt_email: billingDetails.email,
        description: `${t(`stripe:labels.plan`)}: ${paymentDetails?.plan} | ${t(
          `stripe:labels.quantity`
        )}: ${paymentDetails?.optionQty}`,
      };
      const { data } = await StripeServiss.UPDATE_WITHOUT_ID(payload);

      if (!data?.charged) {
        TostifyCustomContainer(
          'warning',
          t(`stripe:declined.${data?.message?.code}`)
        );

        throw new Error('Payment Failed!');
      }

      let success = await handleDataSubmit(event);
      if (!success) {
        setProcessing(false);
        TostifyCustomContainer('info', t(`stripe:main.plan_update`));
        return TostifyCustomContainer('warning', t(`stripe:main.card_not`));
      }
    } catch (error) {
      setProcessing(false);
      return;
    }

    TostifyCustomContainer('success', t(`stripe:main.success`));
    setProcessing(false);
    setIsStripe(false);
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <Container>
        <Row className={'heading_info'}>
          <div>{t(`stripe:checkout.billing`)}</div>
        </Row>
        <Row>
          <Col lg={4}>
            <Form.Group>
              <CustomFormControl
                label={t(`stripe:labels.name`)}
                id="name"
                type="text"
                required
                autoComplete="name"
                value={billingDetails.name}
                onChange={(e) => {
                  setBillingDetails({
                    ...billingDetails,
                    name: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group>
              <CustomFormControl
                label={t(`stripe:labels.email`)}
                id="email"
                type="email"
                required
                autoComplete="email"
                value={billingDetails.email}
                onChange={(e) => {
                  setBillingDetails({
                    ...billingDetails,
                    email: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group>
              <CustomFormControl
                label={t(`stripe:labels.phone`)}
                id="phone"
                type="tel"
                required
                autoComplete="tel"
                value={billingDetails.phone}
                onChange={(e) => {
                  setBillingDetails({
                    ...billingDetails,
                    phone: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className={'heading_info'}>
          <div>{t(`stripe:checkout.card-details`)}</div>
        </Row>
      </Container>
      <fieldset className="card-details">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && (
        <ErrorMessage>{t(`stripe:incomplete.${error.code}`)}</ErrorMessage>
      )}

      <Row>
        <Col lg={6}></Col>
        <Col lg={3}>
          <Button
            className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
            onClick={(e) => setIsStripe(false)}
            variant="outline-secondary"
            disabled={processing}
          >
            {t(`stripe:checkout.cancel`)}
          </Button>
        </Col>
        <Col lg={3}>
          <Button
            className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
            type="submit"
            disabled={processing}
          >
            {processing ? (
              t(`stripe:main.processing`)
            ) : (
              <>
                {t(`stripe:main.pay`)}
                {paymentDetails.totalCost}
              </>
            )}
          </Button>
        </Col>
      </Row>
    </form>
  );
};
CheckoutForm.getInitialProps = async () => ({
  namespacesRequired: ['common', 'navbar', 'footer', 'stripe'],
});

CheckoutForm.propTypes = {
  t: PropTypes.func.isRequired,
};
export default withTranslation()(CheckoutForm);
