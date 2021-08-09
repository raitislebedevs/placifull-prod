import { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Form, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Switch from 'react-switch';
import { CustomFormControl } from 'components/common';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import { userOwned } from './userOwned';
import { userOwnedCV } from './userOwnedCV';

import { purchaceChoiseCV } from './purchaceChoiseCV';
import { jobsChoise } from './jobsChoise';
import { transportChoice } from './transportChoice';
import { realEstateChoise } from './realEstateChoise';

import * as moment from 'node_modules/moment/moment';
import {
  addDays,
  formatNumber,
  getExpiryCount,
} from 'utils/standaloneFunctions';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import Subscriptions from 'services/subscriptions';
import {
  defaultPurchaseOption,
  subscriptionExpiryBrowserCV,
  subscriptionQuarterly,
  subscriptionYearly,
} from 'constants/defaultPurchaseOption';

const PaymentModalForm = (props) => {
  const {
    t,
    user,
    plan,
    setPaymentDetails,
    paymentDetails,
    setReceiptModal,
    setPaymentModal,
  } = props;

  const [defaultExpiry, setDefaultExpiry] = useState(0);
  const [purchaseControl, setPurchaseControl] = useState(false);
  const [purchaseText, setPurchaseText] = useState(
    t('payment:payment-modal.purchase-text.user-held')
  );
  ///Currently Selecting By ID
  const [pricingOption, setPricingOption] = useState();
  //Price Calculation
  const [totalAmount, setTotalAmount] = useState(0);
  const [optionQty, setOptionQty] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //Qty Cost and options.
  const [optionCost, setOptionCost] = useState(0);
  const [optionSize, setOptionSize] = useState();
  const [singleCost, setSingleCost] = useState();
  // Subscription Expiry plan
  const [subscriptions, setSubscriptions] = useState({});
  const [expiryPlan, setExpiryPlan] = useState('');
  const [expiryDate, setExpiryDate] = useState();
  //For extended Expiry date
  const [extendDays, setExtendDays] = useState();
  const [dayCost, setDayCost] = useState();
  const [expiryDays, setExpiryDays] = useState(
    moment(new Date()).format('DD-MM-YYYY')
  );
  let userStack = {};
  let purchaseOptions = {};

  switch (plan) {
    case 'browserCv':
      userStack = userOwnedCV(t, subscriptions);
      purchaseOptions = purchaceChoiseCV(t, subscriptions);
      break;
    case 'realEstate':
      userStack = userOwned(t, subscriptions);
      purchaseOptions = realEstateChoise(t, subscriptions);
      break;
    case 'transport':
      userStack = userOwned(t, subscriptions);
      purchaseOptions = transportChoice(t, subscriptions);
      break;
    case 'jobs':
      userStack = userOwned(t, subscriptions);
      purchaseOptions = jobsChoise(t, subscriptions);
      break;
    default:
      break;
  }

  const purchaseChange = (checked) => {
    if (isLoading) return;

    setPurchaseControl(checked);
    if (!checked) {
      setOptionCost(0);
      return setPurchaseText(
        t('payment:payment-modal.purchase-text.user-held')
      );
    }

    let optionPrice = purchaseOptions.find(
      (element) => element.key === pricingOption
    );
    if (optionPrice) setOptionCost(optionPrice.price);

    setPurchaseText(t('payment:payment-modal.purchase-text.purchase'));
  };

  const handleOptionChange = (item) => {
    setExtendDays('');
    setOptionSize(item?.quantity);
    setSingleCost(item?.qtyCost);
    setDefaultExpiry(item?.days);
    setExpiryPlan(item?.expiryPlan);
    setExpiryDate(item?.expiryDate);
    setOptionQty(item?.quantity);
    setPricingOption(item?.key);
    setOptionCost(item?.price);

    setDayCost(item?.dayCost);

    if (!purchaseControl) {
      return setExpiryDays(item.expiryDate);
    }
    if (!optionQty && purchaseControl) return setExpiryDays('-');
    setExpiryDays(addDays(item?.expiryDate, item?.days));
  };

  useEffect(() => {
    //if (!extendDays && purchaseControl) return setExpiryDays('-');
    let addedDays = extendDays ? extendDays : 0;

    if (pricingOption == subscriptionExpiryBrowserCV) {
      return setExpiryDays(addDays(expiryDate, addedDays + defaultExpiry));
    }

    if (pricingOption == subscriptionQuarterly) {
      return setExpiryDays(addDays(expiryDate, addedDays + defaultExpiry));
    }

    if (pricingOption == subscriptionYearly) {
      return setExpiryDays(addDays(expiryDate, addedDays + defaultExpiry));
    }
  }, [extendDays, pricingOption]);

  useEffect(() => {
    let extendDayCount = extendDays ? extendDays : 0;
    let extendDayCost = dayCost ? dayCost : 0;
    let dayCostFactor = (optionQty / optionSize).toFixed(2);
    let fullCost = Number(
      (
        extendDayCost * extendDayCount * dayCostFactor +
        (optionQty - optionSize) * singleCost +
        optionCost
      ).toFixed(2)
    );
    setTotalAmount(fullCost);
  }, [optionQty, optionCost, extendDays]);

  const OpenReceiptModal = () => {
    setPaymentModal(false);
    setPaymentDetails({
      ...paymentDetails,
      optionQty: optionQty,
      purchasePlan: pricingOption,
      purchacePrice: optionCost,
      totalCost: totalAmount,
      expiryDate: expiryDays === '-' ? null : expiryDays,
      expiryPlan: expiryPlan,
      plan: plan,
    });
    setReceiptModal(true);
  };

  useEffect(() => {
    if (purchaseControl && plan != 'browserCv') {
      handleOptionChange(purchaseOptions[0]);
    }
    if (purchaseControl && plan == 'browserCv') {
      handleOptionChange();
    }
  }, [purchaseControl]);

  useEffect(() => {
    getSubscriptions();
    if (plan == 'browserCv') {
      setExpiryDays(addDays(expiryDate, 0));
    }
  }, []);

  const getSubscriptions = async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      return;
    }
    try {
      const filter = {
        userId: user,
      };
      const { data } = await Subscriptions.FIND({
        _where: filter,
      });

      if (data?.length == 0) {
        setSubscriptions({});
      }
      if (data?.length == 1) {
        setSubscriptions(data[0][plan]);
      }

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
  const handleProceed = () => {
    OpenReceiptModal();
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
                {t('payment:currency')}{' '}
                {isNaN(totalAmount) ? 0 : formatNumber(totalAmount)}
              </em>
            </Col>
            <Col lg={3} className="total__amount__text">
              {t('payment:payment-modal.expiry-date')} <em> {expiryDays}</em>
            </Col>
          </Row>
          <Row className="added__cost">
            <Col lg={4} md={5} sm={5}>
              <label className="cost__label" htmlFor="switch-purchase">
                {purchaseText}
              </label>
              <Switch
                id={'switch-purchase'}
                uncheckedIcon={false}
                checkedIcon={false}
                offColor="#fff"
                onColor="#fff"
                height={20}
                width={45}
                offHandleColor="#c1c1c1"
                onHandleColor="#a52a2a"
                onChange={purchaseChange}
                checked={purchaseControl}
                className={
                  purchaseControl ? 'toggle_button_on' : 'toggle_button_off'
                }
              />
            </Col>

            {plan != 'browserCv' && (
              <Col lg={3} md={6}>
                <Form.Group className="extra__day__input">
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={<>{t('payment:payment-modal.quantity-label')}</>}
                    id={'extraQty'}
                    value={!purchaseControl ? '' : optionQty}
                    onValueChange={(e) => {
                      setOptionQty(parseInt(e.value));
                    }}
                    readOnly={!purchaseControl}
                    autoComplete="current-text"
                    thousandSeparator={true}
                    decimalScale={0}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={(values) => values.value <= 999}
                  />
                </Form.Group>
              </Col>
            )}
            <Col lg={3} md={6}>
              <Form.Group className="extra__day__input">
                <NumberFormat
                  customInput={CustomFormControl}
                  label={<>{t('payment:payment-modal.extend-expiry')}</>}
                  id={'extendExpiry'}
                  value={!purchaseControl ? '' : extendDays}
                  onValueChange={(e) => {
                    setExtendDays(parseInt(e.value));
                  }}
                  readOnly={
                    !purchaseControl || pricingOption == defaultPurchaseOption
                  }
                  autoComplete="current-text"
                  thousandSeparator={true}
                  decimalScale={0}
                  allowNegative={false}
                  thousandsGroupStyle="thousand"
                  fixedDecimalScale={true}
                  isAllowed={(values) =>
                    values.value >= 0 && values.value <= 365
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="purchase__options">
            {purchaseControl
              ? purchaseOptions.map((item) => {
                  return (
                    <Col
                      lg={3}
                      className={
                        pricingOption == item.key
                          ? 'price__option__container active'
                          : 'price__option__container'
                      }
                      key={item.key}
                      id={item.key}
                      onClick={() => {
                        if (getExpiryCount(item?.expiryDate) <= 0)
                          return handleOptionChange(item);

                        TostifyCustomContainer(
                          'info',
                          `${t(
                            'payment:payment-modal.subscription-valid'
                          )} ${getExpiryCount(item?.expiryDate)} ${t(
                            'payment:payment-modal.days'
                          )}`
                        );
                      }}
                    >
                      <div className="price__header">{item.label}</div>
                      <div className="price__cost">
                        {t('payment:currency')} {item.price}
                      </div>
                      <div className="price__icon">
                        {pricingOption == item.key ? (
                          <AiFillCheckCircle />
                        ) : (
                          <AiOutlineCheckCircle />
                        )}
                      </div>
                    </Col>
                  );
                })
              : userStack.map((item) => {
                  if (item?.key == 'singlePositions') {
                    return (
                      <Col
                        lg={3}
                        className={
                          pricingOption == item.key
                            ? 'price__option__container profile active'
                            : 'price__option__container profile'
                        }
                        key={item.key}
                        id={item.key}
                        onClick={() => handleOptionChange(item)}
                      >
                        <div className="price__header">{item.label}</div>
                        <div className="profile__standalone">
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
                          {pricingOption == item.key ? (
                            <AiFillCheckCircle />
                          ) : (
                            <AiOutlineCheckCircle />
                          )}
                        </div>
                      </Col>
                    );
                  }
                  if (item?.key == 'browserCvPurchase') {
                    return (
                      <Col
                        lg={3}
                        className={
                          pricingOption == item.key
                            ? 'price__option__container active'
                            : 'price__option__container'
                        }
                        key={item.key}
                        id={item.key}
                        onClick={() => handleOptionChange(item)}
                      >
                        <div className="price__header">{item.label}</div>
                        <div className="price__cost">
                          {isLoading ? (
                            <Spinner
                              as="span"
                              animation="border"
                              variant="danger"
                              size="sm"
                              role="status"
                            />
                          ) : (
                            item?.expiryDate
                          )}
                        </div>
                        <div className="price__icon">
                          {pricingOption == item.key ? (
                            <AiFillCheckCircle />
                          ) : (
                            <AiOutlineCheckCircle />
                          )}
                        </div>
                      </Col>
                    );
                  }
                  if (
                    item?.key != 'activeSubscription' &&
                    item?.key != 'singlePositions'
                  ) {
                    return (
                      <Col
                        lg={3}
                        className={
                          pricingOption == item.key
                            ? 'price__option__container profile active'
                            : 'price__option__container profile'
                        }
                        key={item.key}
                        id={item.key}
                        onClick={() => handleOptionChange(item)}
                      >
                        <div className="price__header">{item.label}</div>
                        <div className="price__cost">
                          <div>
                            {t('payment:payment-modal.listed')}{' '}
                            {isLoading ? (
                              <Spinner
                                as="span"
                                animation="border"
                                variant="danger"
                                size="sm"
                                role="status"
                              />
                            ) : (
                              item.active
                            )}
                          </div>

                          <div>
                            {t('payment:payment-modal.purchase')}{' '}
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
                        </div>
                        <div className="price__icon">
                          {pricingOption == item.key ? (
                            <AiFillCheckCircle />
                          ) : (
                            <AiOutlineCheckCircle />
                          )}
                        </div>
                      </Col>
                    );
                  }
                })}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => setPaymentModal(false)}
        >
          {t('payment:payment-modal.form.buttons.decline')}
        </Button>
        <Button
          onClick={() => handleProceed()}
          disabled={
            !purchaseControl ||
            optionQty < 1 ||
            !optionQty ||
            optionQty < optionSize
          }
        >
          {t('payment:payment-modal.form.buttons.proceed')}
        </Button>
      </Modal.Footer>
    </>
  );
};
export default PaymentModalForm;
