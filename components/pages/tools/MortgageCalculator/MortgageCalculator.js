import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CustomFormControl } from 'components/common';
import { CurrencyInput } from 'components/common';
import NumberFormat from 'react-number-format';
import { RiCalendar2Line } from 'react-icons/ri';
import Datetime from 'react-datetime';
import { formatDate, formatNumber } from 'utils/standaloneFunctions';
import * as moment from 'node_modules/moment/moment';

const MortgageCalculator = props => {
  const { t } = props;
  const [submitCurrency, setSubmitCurrency] = useState('');
  const [inputValues, setInputValues] = useState({
    fromDate: new Date(),
    percentageType: 'even',
    paymentPeriod: 'year'
  });
  const [mortgage, setMortgage] = useState([]);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totals, setTotals] = useState({});
  const handleOnChange = event => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };
  const dropdownHandleChange = e => {
    handleOnChange({ target: { value: e.target.value, id: e.target.id } });
  };

  useEffect(() => {
    if (
      !inputValues?.mortgage ||
      !inputValues?.percentage ||
      (!inputValues?.mortgageTime && !inputValues?.toDate)
    ) {
      return;
    }

    handleMortgageCalculation();
  }, [inputValues?.extraPayment]);

  const handleMortgageCalculation = () => {
    if (
      !inputValues?.mortgage ||
      !inputValues?.percentage ||
      (!inputValues?.mortgageTime && !inputValues?.toDate)
    ) {
      return;
    }
    let amount = inputValues?.mortgage || 0;
    let extraPayment = inputValues?.extraPayment || 0;
    let deposit = inputValues?.deposit || 0;

    amount -= deposit;

    let percentage = inputValues?.percentage / 100;
    let fromDate = inputValues?.fromDate
      ? new Date(inputValues?.fromDate)
      : new Date();
    let toDate = inputValues?.toDate
      ? new Date(inputValues?.toDate)
      : new Date();

    let mortgageTime = inputValues?.mortgageTime || 1;
    let type = inputValues?.percentageType;
    let paymentPeriodType = inputValues?.paymentPeriod;

    if (toDate && fromDate && !inputValues?.mortgageTime) {
      mortgageTime = moment(toDate).diff(moment(fromDate), 'month');
    }

    if (paymentPeriodType == 'year' && inputValues?.mortgageTime) {
      mortgageTime = inputValues?.mortgageTime * 12;
    }

    let amortization = [];
    let regularPayment = (amount / mortgageTime + extraPayment).toFixed(2);
    let totalSums = {
      monthlyInterest: 0,
      mortgageSum: 0,
      obligatory: 0,
      total: 0
    };
    let mortgageMonthlyPayment = 0;
    if (type == 'even') {
      let rate = percentage / 12;
      mortgageMonthlyPayment =
        (amount * (rate * Math.pow(1 + rate, mortgageTime - 1))) /
          (Math.pow(1 + rate, mortgageTime - 1) - 1) +
        extraPayment;
      console.log('Menesa maksajums', mortgageMonthlyPayment);
    }
    let timeFlies = 0;
    while (amount > 0) {
      let fromPaymentDate = new Date(fromDate);
      let paymentDate = new Date(fromDate.setMonth(fromDate.getMonth() + 1));
      let diffTime = Math.abs(paymentDate - fromPaymentDate);
      let accruedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let monthlyPayment = parseFloat(
        (((amount * percentage) / 360) * accruedDays).toFixed(2)
      );
      console.log(monthlyPayment);
      if (type != 'even') {
        if (amount - regularPayment > 0) {
          let totalAmount =
            parseFloat(monthlyPayment) + parseFloat(regularPayment);
          amortization.push({
            paymentDate: formatDate(paymentDate, t),
            percantage: `${monthlyPayment.toFixed(2)} ${submitCurrency ||
              t('tools:mortgage.no-currency')}`,
            fromMortgageSum: `${regularPayment} ${submitCurrency ||
              t('tools:mortgage.no-currency')}`,
            total: `${totalAmount.toFixed(2)} ${submitCurrency ||
              t('tools:mortgage.no-currency')}`,
            left: `${(amount - regularPayment).toFixed(2)} ${submitCurrency ||
              t('tools:mortgage.no-currency')}`
          });

          totalSums.monthlyInterest += monthlyPayment;
          totalSums.mortgageSum += parseFloat(regularPayment);
          totalSums.obligatory += totalAmount - extraPayment;
          totalSums.total += totalAmount;
        }

        if (amount - regularPayment < 0) {
          let totalAmount = parseFloat(monthlyPayment) + parseFloat(amount);

          amortization.push({
            paymentDate: formatDate(paymentDate, t),
            percantage: `${parseFloat(monthlyPayment).toFixed(
              2
            )} ${submitCurrency || t('tools:mortgage.no-currency')}`,
            fromMortgageSum: `${parseFloat(amount).toFixed(
              2
            )} ${submitCurrency || t('tools:mortgage.no-currency')}`,
            total: `${totalAmount.toFixed(2)} ${submitCurrency ||
              t('tools:mortgage.no-currency')}`,
            left: `${0} ${submitCurrency || t('tools:mortgage.no-currency')}`
          });

          totalSums.monthlyInterest += monthlyPayment;
          totalSums.mortgageSum += parseFloat(amount);
          totalSums.obligatory += totalAmount - extraPayment;
          totalSums.total += totalAmount;
        }
      }

      if (type == 'even') {
        regularPayment =
          parseFloat(mortgageMonthlyPayment) - parseFloat(monthlyPayment);
        if (amount - regularPayment > 0) {
          amortization.push({
            paymentDate: formatDate(paymentDate, t),
            percantage: formatPaymentValue(monthlyPayment),
            fromMortgageSum: formatPaymentValue(regularPayment),
            obligatory: extraPayment
              ? getDefaultPayment(mortgageMonthlyPayment.toFixed(2))
              : null,
            total: formatPaymentValue(mortgageMonthlyPayment),
            left: formatPaymentValue(amount - regularPayment)
          });

          totalSums.monthlyInterest += monthlyPayment;
          totalSums.mortgageSum += parseFloat(regularPayment);
          totalSums.obligatory += mortgageMonthlyPayment - extraPayment;
          totalSums.total += mortgageMonthlyPayment;
        }

        if (amount - regularPayment < 0) {
          const lastPayment = parseFloat(amount) + parseFloat(monthlyPayment);
          amortization.push({
            paymentDate: formatDate(paymentDate, t),
            percantage: formatPaymentValue(monthlyPayment),
            fromMortgageSum: formatPaymentValue(amount),
            obligatory: extraPayment
              ? getDefaultPayment(mortgageMonthlyPayment.toFixed(2))
              : null,
            total: formatPaymentValue(lastPayment),
            left: formatPaymentValue(0)
          });

          totalSums.monthlyInterest += monthlyPayment;
          totalSums.mortgageSum += parseFloat(amount);
          totalSums.obligatory += mortgageMonthlyPayment - extraPayment;
          totalSums.total += lastPayment;
        }
      }
      // console.log('Regular payment', regularPayment);
      amount = amount - regularPayment;
      if (extraPayment !== 0) {
        timeFlies++;
        let newDeadline = mortgageTime - timeFlies;
        let rate = percentage / 12;
        mortgageMonthlyPayment =
          (amount * (rate * Math.pow(1 + rate, newDeadline))) /
            (Math.pow(1 + rate, newDeadline) - 1) +
          extraPayment;
        regularPayment = (amount / newDeadline + extraPayment).toFixed(2);
      }
    }
    setTotals(totalSums);
    setMortgage(amortization);
    setMonthlyPayment(amortization[0].total);
  };

  const getDefaultPayment = total => {
    let defaultPayment = (total - inputValues?.extraPayment).toFixed(2);
    let result = `${defaultPayment} ${submitCurrency ||
      t('tools:mortgage.no-currency')}`;
    return result;
  };

  const formatPaymentValue = value => {
    return `${value.toFixed(2)} ${submitCurrency ||
      t('tools:mortgage.no-currency')}`;
  };
  return (
    <>
      <Container className="tools_container">
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={8}
            className={'feature_suggestion'}
          >
            <h3 className={'suggestion_title'}>
              {t('tools:mortgage.heading')}
            </h3>
            <div className={'separator'}></div>
            <Row className={'suggestion__text'}>
              <Col lg={4} md={4} sm={4}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={t('tools:mortgage.amount')}
                    id={'mortgage'}
                    onValueChange={e => {
                      let payload = {
                        target: {
                          value: e?.floatValue || 0,
                          id: 'mortgage'
                        }
                      };
                      handleOnChange(payload);
                    }}
                    dropdownHandleChange={dropdownHandleChange}
                    autoComplete="current-text"
                    decimalScale={2}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={values =>
                      values.value >= 0 &&
                      values.value <= 99999999999999999999999
                    }
                    inputValues={inputValues}
                    prepend={
                      submitCurrency
                        ? { values: [submitCurrency] }
                        : { values: [t('tools:mortgage.no-currency')] }
                    }
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={t('tools:mortgage.deposit')}
                    id={'deposit'}
                    onValueChange={e => {
                      let payload = {
                        target: {
                          value: e?.floatValue || 0,
                          id: 'deposit'
                        }
                      };
                      handleOnChange(payload);
                    }}
                    dropdownHandleChange={dropdownHandleChange}
                    autoComplete="current-text"
                    decimalScale={2}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={values =>
                      values.value >= 0 &&
                      values.value <= 99999999999999999999999
                    }
                    inputValues={inputValues}
                    prepend={
                      submitCurrency
                        ? { values: [submitCurrency] }
                        : { values: [t('tools:mortgage.no-currency')] }
                    }
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={t('tools:mortgage.extra-payment')}
                    id={'extraPayment'}
                    onValueChange={e => {
                      let payload = {
                        target: {
                          value: e?.floatValue || 0,
                          id: 'extraPayment'
                        }
                      };
                      handleOnChange(payload);
                    }}
                    dropdownHandleChange={dropdownHandleChange}
                    autoComplete="current-text"
                    decimalScale={2}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={values =>
                      values.value >= 0 &&
                      values.value <= 99999999999999999999999
                    }
                    inputValues={inputValues}
                    prepend={
                      submitCurrency
                        ? { values: [submitCurrency] }
                        : { values: [t('tools:mortgage.no-currency')] }
                    }
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <Form.Group>
                  <CurrencyInput
                    handleOnChange={handleOnChange}
                    setCurrency={setSubmitCurrency}
                    placeholder={t('tools:form.currency')}
                    currencyId={'currency'}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={12}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={t('tools:mortgage.percentage')}
                    id={'percentage'}
                    onValueChange={e => {
                      let payload = {
                        target: {
                          value: e?.floatValue || 0,
                          id: 'percentage'
                        }
                      };
                      handleOnChange(payload);
                    }}
                    dropdownHandleChange={dropdownHandleChange}
                    autoComplete="current-text"
                    decimalScale={4}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={values =>
                      values.value >= 0 && values.value <= 99
                    }
                    inputValues={inputValues}
                    append={{
                      values: [
                        {
                          value: 'even',
                          label: t('tools:mortgage.even')
                        },
                        {
                          value: 'desc',
                          label: t('tools:mortgage.descending')
                        }
                      ],
                      id: 'percentageType'
                    }}
                    prepend={{ values: ['%'] }}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={12}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={t('tools:mortgage.time')}
                    id={'mortgageTime'}
                    onValueChange={e => {
                      let payload = {
                        target: {
                          value: e?.floatValue || 0,
                          id: 'mortgageTime'
                        }
                      };
                      handleOnChange(payload);
                    }}
                    dropdownHandleChange={dropdownHandleChange}
                    autoComplete="current-text"
                    decimalScale={0}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={values =>
                      values.value >= 0 && values.value <= 480
                    }
                    inputValues={inputValues}
                    append={{
                      values: [
                        {
                          value: 'month',
                          label: t('tools:mortgage.month')
                        },
                        {
                          value: 'year',
                          label: t('tools:mortgage.year')
                        }
                      ],
                      id: 'paymentPeriod'
                    }}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={6} className={'decorator__container'}>
                <Form.Group>
                  <RiCalendar2Line />
                  <Datetime
                    inputProps={{ className: 'datetime', readOnly: true }}
                    value={inputValues['fromDate']}
                    onChange={e =>
                      handleOnChange({ target: { value: e, id: 'fromDate' } })
                    }
                    timeFormat={false}
                    dateFormat={'YYYY-MMM-DD'}
                    renderInput={props => {
                      return (
                        <Form.Control
                          {...props}
                          id={'fromDate'}
                          placeholder={t('tools:mortgage.from-date')}
                        />
                      );
                    }}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={6} className={'decorator__container'}>
                <Form.Group>
                  <RiCalendar2Line />
                  <Datetime
                    inputProps={{ className: 'datetime', readOnly: true }}
                    value={inputValues['toDate']}
                    onChange={e =>
                      handleOnChange({ target: { value: e, id: 'toDate' } })
                    }
                    timeFormat={false}
                    dateFormat={'YYYY-MM-DD'}
                    renderInput={props => {
                      return (
                        <Form.Control
                          {...props}
                          id={'toDate'}
                          placeholder={t('tools:mortgage.to-date')}
                        />
                      );
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4} className={'info'}>
            <div>
              <div className={'payment__info'}>
                <span>{t('tools:mortgage.total')}:</span>
                <span className={'amount'}>
                  {formatNumber(totals?.total?.toFixed(2))}
                </span>
              </div>
              <div className={'payment__info'}>
                <span>{t('tools:mortgage.paid-in-percentage')}:</span>
                <span className={'amount'}>
                  {formatNumber(totals?.monthlyInterest?.toFixed(2))}
                </span>
              </div>
              <div className={'payment__info'}>
                <span>{t('tools:mortgage.payment')}:</span>
                <span className={'amount'}>{formatNumber(monthlyPayment)}</span>
              </div>
            </div>

            <div className={'tool_button'} onClick={handleMortgageCalculation}>
              {t('tools:mortgage.submit')}
            </div>
          </Col>
        </Row>
      </Container>

      {mortgage?.length !== 0 && (
        <Container className="tools_container">
          <>
            <div className="table__overflow">
              <table className="table__Listing">
                <thead className="thead-dark">
                  <tr>
                    <th className="first__col__row" scope="col">
                      {t('tools:mortgage.table.date')}
                    </th>
                    <th scope="col"> {t('tools:mortgage.table.interest')}</th>
                    <th scope="col"> {t('tools:mortgage.table.principal')}</th>
                    {inputValues?.extraPayment > 0 && (
                      <th scope="col">
                        {' '}
                        {t('tools:mortgage.table.obligatory')}
                      </th>
                    )}
                    <th scope="col"> {t('tools:mortgage.table.total')}</th>
                    <th className={'last__col__row'} scope="col">
                      {t('tools:mortgage.table.amount')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mortgage.map(item => {
                    return (
                      <tr className={'standalone__row'} key={item?.left}>
                        <td scope="row">{item.paymentDate}</td>

                        <td>{item?.percantage}</td>
                        <td>{formatNumber(item?.fromMortgageSum)}</td>
                        {item?.obligatory && (
                          <td>{formatNumber(item?.obligatory)}</td>
                        )}
                        <td>{formatNumber(item?.total)}</td>

                        <td>{formatNumber(item?.left)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="table__footer">
                  <tr>
                    <td className={'first__foot__col'}>
                      {t('tools:mortgage.table.sum')}
                    </td>
                    <td>{`${totals.monthlyInterest.toFixed(2)}   ${
                      submitCurrency
                        ? submitCurrency
                        : t('tools:mortgage.no-currency')
                    }`}</td>

                    <td>{`${totals.mortgageSum.toFixed(2)}   ${
                      submitCurrency
                        ? submitCurrency
                        : t('tools:mortgage.no-currency')
                    }`}</td>
                    {inputValues?.extraPayment > 0 && (
                      <td>{`${totals.obligatory.toFixed(2)}   ${
                        submitCurrency
                          ? submitCurrency
                          : t('tools:mortgage.no-currency')
                      }`}</td>
                    )}
                    <td>{`${totals.total.toFixed(2)}   ${
                      submitCurrency
                        ? submitCurrency
                        : t('tools:mortgage.no-currency')
                    }`}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        </Container>
      )}
    </>
  );
};

export const mapStateToProps = state => ({
  user: state.connectionReducer.user
});

export default MortgageCalculator;
//connect(mapStateToProps)(
