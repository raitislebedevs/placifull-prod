import { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { StripeContainer } from '../index';
import PaymentModalForm from './PaymentModalForm/PaymentModalForm';

const ListingPayment = (props) => {
  const {
    t,
    user,
    paymentModal,
    setPaymentModal,
    handleDataSubmit,
    plan,
    dayCost,
  } = props;
  const [receiptModal, setReceiptModal] = useState(false);
  const [isStripe, setIsStripe] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    isPromoted: false,
    addedDays: 0,
    purchacePrice: 0,
    purchasePlan: '',
    totalCost: 0,
    subscribtionQuantity: 0,
  });

  const PaymentModal = (props) => {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        keyboard={false}
        className="custom__previewModal"
      >
        <PaymentModalForm
          setPaymentModal={setPaymentModal}
          setPaymentDetails={setPaymentDetails}
          setPaymentModal={setPaymentModal}
          setReceiptModal={setReceiptModal}
          handleDataSubmit={handleDataSubmit}
          dayCost={dayCost}
          plan={plan}
          user={user}
          t={t}
        />
      </Modal>
    );
  };

  const ReceiptModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
        className="receipt_modal_container"
      >
        <Modal.Body>
          <Container className="receipt__modal">
            <Row lg={12} md={12} sm={12} className="receipt__modal--header">
              <Col className="header__text">
                <div className="header__main__text">
                  {t('payment:receipt-modal.header')}
                </div>
                <div className="header__sub__text">
                  {t('payment:receipt-modal.sub-header')}
                </div>
              </Col>
            </Row>
            <Row className={'receipt__card__details'}></Row>
            <Row className={'purchase__summary__details'}>
              <Col className={'right__boarder'} lg={3} md={3}>
                <div> {t('payment:receipt-modal.receipt-table.plan')} </div>
                <div>
                  {' '}
                  {t('payment:currency')} {paymentDetails.purchacePrice}
                </div>
              </Col>
              <Col className={'right__boarder'} lg={3} md={3}>
                <div> {t('payment:receipt-modal.receipt-table.quantity')}</div>
                <div>{paymentDetails.subscribtionQuantity}</div>
              </Col>
              <Col className={'right__boarder'} lg={2} md={2}>
                <div> {t('payment:receipt-modal.receipt-table.promote')}</div>
                <div> {paymentDetails.isPromoted ? 'Yes' : 'No'}</div>
              </Col>
              <Col className={'right__boarder'} lg={2} md={2}>
                <div>
                  {t('payment:receipt-modal.receipt-table.extend-expiry')}
                </div>
                <div>
                  {t('payment:currency')} {paymentDetails.addedDays}
                </div>
              </Col>

              <Col lg={2} md={2}>
                <div> {t('payment:receipt-modal.receipt-table.total')} </div>
                <div>
                  {t('payment:currency')} {paymentDetails.totalCost}
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className={'purchase__summary__price'}
              >
                {t('payment:receipt-modal.receipt-table.total-amount')}
                <strong>
                  {' '}
                  {t('payment:currency')} {paymentDetails.totalCost}
                </strong>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12} className={'receipt__footer__info'}>
                {t('payment:receipt-modal.thank-you-message')}
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide}>
            {t('payment:receipt-modal.buttons.cancel')}
          </Button>
          <Button
            onClick={(e) => {
              setReceiptModal(false);
              setIsStripe(true);
            }}
          >
            {t('payment:receipt-modal.buttons.proceed')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <StripeContainer
        show={isStripe}
        setIsStripe={setIsStripe}
        paymentDetails={paymentDetails}
        onHide={() => setIsStripe(false)}
        handleDataSubmit={handleDataSubmit}
      />
      <ReceiptModal show={receiptModal} onHide={() => setReceiptModal(false)} />
      <PaymentModal show={paymentModal} onHide={() => setPaymentModal(false)} />
    </>
  );
};

export default ListingPayment;
