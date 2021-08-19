import { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Form, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { CustomFormControl } from 'components/common';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import Subscriptions from 'services/subscriptions';
import { userOwned } from './userOwned';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { promotedCost } from 'constants/listingDetails';

const PaymentModalForm = (props) => {
  const {
    t,
    user,
    plan,
    dayCost,
    setPaymentDetails,
    handleDataSubmit,
    setReceiptModal,
    setPaymentModal,
  } = props;

  const [subscriptions, setSubscriptions] = useState({});
  const [pricingOption, setPricingOption] = useState('');

  ///Currently Selecting By ID
  //Price Calculation
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPromoted, setIsPromoted] = useState(false);
  const [addedDays, setAddedDays] = useState(0);
  const [optionQuantity, setOptionQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const userStack = userOwned(t, subscriptions);

  useEffect(() => {
    if (user?.id) getSubscriptions();
  }, [user?.id]);

  const getSubscriptions = async () => {
    setIsLoading(true);
    try {
      const filter = {
        userId: user?.id,
      };
      const { data } = await Subscriptions.FIND({
        _where: filter,
      });
      if (data) setSubscriptions(data[0][plan]);
      setIsLoading(false);
    } catch (e) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('payment:error.subscriptions')
      );
    }
    setIsLoading(false);
  };

  const handleOptionChange = (item) => {
    setPricingOption(item.key);
    setOptionQuantity(item?.stock || 0);
  };

  useEffect(() => {
    let fullCost = Number((dayCost * addedDays).toFixed(2));

    if (isPromoted) {
      let fullCost = Number((dayCost * addedDays + promotedCost).toFixed(2));
      return setTotalAmount(fullCost);
    }
    setTotalAmount(fullCost);
  }, [isPromoted, addedDays]);

  const OpenReceiptModal = async (e) => {
    e.preventDefault();

    let payload = {
      purchacePrice: 0,
      isPromoted: isPromoted,
      addedDays: Number((dayCost * addedDays).toFixed(2)),
      purchasePlan: pricingOption,
      totalCost: totalAmount,
      subscribtionQuantity: optionQuantity,
    };

    setPaymentDetails(payload);

    if (!totalAmount) {
      setPaymentModal(false);
      await handleDataSubmit(e, payload);
      return;
    }

    setPaymentModal(false);
    setReceiptModal(true);
  };

  return (
    <>
      <Modal.Body>
        <Container className="payment__modal">
          <Row className="payment__modal--header">
            <Col lg={5} className="header__text">
              <div className="header__main__text">
                {t('payment:payment-modal.header')}
              </div>
              <div className="header__sub__text">
                {t('payment:payment-modal.sub-header')}
              </div>
            </Col>
            <Col lg={3} className="total__amount__text">
              {t('payment:payment-modal.total-cost')}{' '}
              <em>
                {t('payment:currency')} {totalAmount}
              </em>
            </Col>
            <Col lg={3} className="total__amount__text">
              {t('payment:payment-modal.quantity')} <em> {optionQuantity}</em>
            </Col>
          </Row>
          <Row className="added__cost">
            <Col lg={4} md={5} sm={5}>
              <span>
                <label htmlFor="symbols">
                  {t('payment:payment-modal.promote')}
                </label>
              </span>
              <input
                type="checkbox"
                id="symbols"
                className="custom-check-box"
                name="symbols"
                value="symbols"
                checked={isPromoted}
                onChange={() => setIsPromoted(!isPromoted)}
              />
              <label htmlFor="symbols"></label>
            </Col>

            <Col lg={4} md={12}>
              <Form.Group className="extra__day__input">
                <NumberFormat
                  customInput={CustomFormControl}
                  label={t('payment:payment-modal.form.added-days.label')}
                  id={'extraDayHold'}
                  onValueChange={(e) => {
                    setAddedDays(e.value);
                  }}
                  autoComplete="current-text"
                  thousandSeparator={true}
                  decimalScale={0}
                  allowNegative={false}
                  thousandsGroupStyle="thousand"
                  fixedDecimalScale={true}
                  isAllowed={(values) =>
                    values.value >= 0 && values.value <= 365
                  }
                  suffix={t('payment:payment-modal.form.added-days.suffix')}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="purchase__options">
            {userStack.map((item) => {
              return (
                <Col
                  lg={3}
                  className={
                    pricingOption === item.key
                      ? 'price__option__container active'
                      : 'price__option__container'
                  }
                  key={item.key}
                  id={item.key}
                  onClick={() => handleOptionChange(item)}
                >
                  <div className="price__header">{item.label}</div>
                  <div className="price__cost">
                    {t('payment:payment-modal.quantity')}{' '}
                    {isLoading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        variant="danger"
                        size="sm"
                        role="status"
                      />
                    ) : (
                      item.stock
                    )}
                  </div>
                  <div className="price__icon">
                    {pricingOption === item.key ? (
                      <AiFillCheckCircle />
                    ) : (
                      <AiOutlineCheckCircle />
                    )}
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setPaymentModal(false)}>
          {t('payment:payment-modal.form.buttons.decline')}
        </Button>
        <Button onClick={(e) => OpenReceiptModal(e)} disabled={!optionQuantity}>
          {t('payment:payment-modal.form.buttons.proceed')}
        </Button>
      </Modal.Footer>
    </>
  );
};
export default PaymentModalForm;
