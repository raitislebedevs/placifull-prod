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
    let principal = inputValues?.mortgage || 0;
    let extraPayment = inputValues?.extraPayment || 0;
    let deposit = inputValues?.deposit || 0;

    principal -= deposit;

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
    let monthlyPrincipalPay = (principal / mortgageTime + extraPayment).toFixed(
      2
    );
    let totalSums = {
      interestPayment: 0,
      principalPayment: 0,
      obligatoryPayment: 0,
      totalPayment: 0
    };
    let fullMonthlyPayment = 0;
    if (type == 'even') {
      fullMonthlyPayment = calculateMonthlyPayment(
        mortgageTime,
        percentage,
        fullMonthlyPayment,
        principal,
        extraPayment
      );
    }

    let timeFlies = 0;

    while (principal > 0) {
      let fromPaymentDate = new Date(fromDate);
      let paymentDate = new Date(fromDate.setMonth(fromDate.getMonth() + 1));
      let diffTime = Math.abs(paymentDate - fromPaymentDate);
      let accruedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let dailyInterest = parseFloat(
        ((principal * percentage) / 360).toFixed(2)
      );

      let monthlyIntPay = parseFloat((dailyInterest * accruedDays).toFixed(2));

      //  let monthlyIntPay = parseFloat((dailyInterest * accruedDays).toFixed(2));

      // console.log('Monthly Interest Payment', monthlyIntPay);
      // console.log('Daily Interest Payment', dailyInterest);

      if (type != 'even') {
        if (principal - monthlyPrincipalPay > 0) {
          let totalAmount =
            parseFloat(monthlyIntPay) + parseFloat(monthlyPrincipalPay);

          let item = createAmortizationItem(
            paymentDate,
            monthlyIntPay,
            monthlyPrincipalPay,
            fullMonthlyPayment,
            totalAmount,
            principal - monthlyPrincipalPay
          );
          amortization.push(item);

          totalSumCreation(
            totalSums,
            monthlyIntPay,
            monthlyPrincipalPay,
            totalAmount - extraPayment,
            totalAmount
          );
        }

        if (principal - monthlyPrincipalPay < 0) {
          let totalAmount = parseFloat(monthlyIntPay) + parseFloat(principal);

          let item = createAmortizationItem(
            paymentDate,
            monthlyIntPay,
            principal,
            principal,
            totalAmount,
            0
          );
          amortization.push(item);

          totalSumCreation(
            totalSums,
            monthlyIntPay,
            principal,
            totalAmount - extraPayment,
            totalAmount
          );
        }
      }

      if (type == 'even') {
        monthlyPrincipalPay =
          parseFloat(fullMonthlyPayment) - parseFloat(monthlyIntPay);

        // console.log('Principal', monthlyPrincipalPay);
        // console.log('Regular Payment', monthlyPrincipalPay);
        // console.log('Monthly mortgage payment', fullMonthlyPayment);
        // console.log('Monthly int pay', monthlyIntPay);

        if (principal - monthlyPrincipalPay > 0) {
          let item = createAmortizationItem(
            paymentDate,
            monthlyIntPay,
            monthlyPrincipalPay,
            fullMonthlyPayment,
            fullMonthlyPayment,
            //What amount is left to be paid
            principal
          );
          amortization.push(item);

          totalSumCreation(
            totalSums,
            monthlyIntPay,
            monthlyPrincipalPay,
            fullMonthlyPayment,
            fullMonthlyPayment
          );
        }

        if (principal - monthlyPrincipalPay < 0) {
          const lastPayment = parseFloat(principal) + parseFloat(monthlyIntPay);
          let item = createAmortizationItem(
            paymentDate,
            monthlyIntPay,
            principal,
            fullMonthlyPayment,
            lastPayment,
            0
          );
          amortization.push(item);

          totalSumCreation(
            totalSums,
            monthlyIntPay,
            principal,
            fullMonthlyPayment,
            lastPayment
          );
        }
      }
      // console.log('Regular payment', monthlyPrincipalPay);
      principal = principal - monthlyPrincipalPay;
      if (extraPayment !== 0) {
        timeFlies++;

        let newDeadline = mortgageTime - timeFlies;
        fullMonthlyPayment = calculateMonthlyPayment(
          newDeadline,
          percentage,
          fullMonthlyPayment,
          principal,
          extraPayment
        );

        monthlyPrincipalPay = parseFloat(
          (principal / newDeadline + extraPayment).toFixed(2)
        );
      }
    }
    setTotals(totalSums);
    setMortgage(amortization);
    setMonthlyPayment(amortization[0].totalPayment);
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

  const createAmortizationItem = (
    payDate,
    intPay,
    prinPay,
    oblPay,
    totalPay,
    payAmount
  ) => {
    return {
      paymentDate: formatDate(payDate, t),
      interestPayment: formatPaymentValue(intPay),
      principalPayment: formatPaymentValue(prinPay),
      obligatoryPayment: inputValues?.extraPayment
        ? getDefaultPayment(oblPay.toFixed(2))
        : null,
      totalPayment: formatPaymentValue(totalPay),
      paymentAmount: formatPaymentValue(payAmount)
    };
  };

  const totalSumCreation = (totalSums, intPay, prinPay, oblPay, totalPay) => {
    totalSums.interestPayment += intPay;
    totalSums.principalPayment += parseFloat(prinPay);
    totalSums.obligatoryPayment += oblPay;
    totalSums.totalPayment += totalPay;
  };

  const calculateMonthlyPayment = (
    mortgageTime,
    percentage,
    fullMonthlyPayment,
    principal,
    extraPayment
  ) => {
    var currentDate = moment();
    var futureMonth = moment().add(mortgageTime, 'M');
    let monthLength = futureMonth.diff(currentDate, 'days');
    let factor =
      Math.floor((monthLength / (mortgageTime * 30)) * 10000 - 1) / 10000;

    //Here the rate needs to be Annual rate, not just the rate you get.
    let rate = (percentage / 12) * factor;

    let powerRate = parseFloat(Math.pow(1 + rate, mortgageTime).toFixed(4));

    fullMonthlyPayment =
      (principal * (rate * powerRate)) / (powerRate - 1) + extraPayment;
    return fullMonthlyPayment;
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
                  <CurrencyInput
                    handleOnChange={handleOnChange}
                    setCurrency={setSubmitCurrency}
                    placeholder={t('tools:form.currency')}
                    currencyId={'currency'}
                  />
                </Form.Group>
              </Col>
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
                  {formatNumber(totals?.totalPayment?.toFixed(2))}
                </span>
              </div>
              <div className={'payment__info'}>
                <span>{t('tools:mortgage.paid-in-percentage')}:</span>
                <span className={'amount'}>
                  {formatNumber(totals?.interestPayment?.toFixed(2))}
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

                        <td>{item?.interestPayment}</td>
                        <td>{formatNumber(item?.principalPayment)}</td>
                        {item?.obligatoryPayment && (
                          <td>{formatNumber(item?.obligatoryPayment)}</td>
                        )}
                        <td>{formatNumber(item?.totalPayment)}</td>

                        <td>{formatNumber(item?.paymentAmount)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="table__footer">
                  <tr>
                    <td className={'first__foot__col'}>
                      {t('tools:mortgage.table.sum')}
                    </td>
                    <td>{`${totals.interestPayment.toFixed(2)}   ${
                      submitCurrency
                        ? submitCurrency
                        : t('tools:mortgage.no-currency')
                    }`}</td>

                    <td>{`${totals.principalPayment.toFixed(2)}   ${
                      submitCurrency
                        ? submitCurrency
                        : t('tools:mortgage.no-currency')
                    }`}</td>
                    {inputValues?.extraPayment > 0 && (
                      <td>{`${totals.obligatoryPayment.toFixed(2)}   ${
                        submitCurrency
                          ? submitCurrency
                          : t('tools:mortgage.no-currency')
                      }`}</td>
                    )}
                    <td>{`${totals.totalPayment.toFixed(2)}   ${
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
