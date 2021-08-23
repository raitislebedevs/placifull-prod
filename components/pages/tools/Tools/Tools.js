import React, { useEffect, useState } from 'react';
import { Container, Spinner, Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CustomFormControl } from 'components/common';
import { CurrencyInput } from 'components/common';
import NumberFormat from 'react-number-format';
import { RiCalendar2Line } from 'react-icons/ri';
import Datetime from 'react-datetime';
import { formatDate, formatNumber } from 'utils/standaloneFunctions';

const Tools = (props) => {
  const { t, user } = props;

  const [submitCurrency, setSubmitCurrency] = useState('');
  const [inputValues, setInputValues] = useState({
    fromDate: new Date(),
    percentageType: 'even',
    paymentPeriod: 'year',
  });
  const [mortgage, setMortgage] = useState([]);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totals, setTotals] = useState({});
  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
    console.log(inputValues);
  };
  const dropdownHandleChange = (e) => {
    handleOnChange({ target: { value: e.target.value, id: e.target.id } });
  };

  const handleMortgageCalculation = () => {
    if (
      !inputValues?.mortgage ||
      !inputValues?.percentage ||
      !inputValues?.mortgageTime
    ) {
      return;
    }
    let amount = inputValues?.mortgage || 0;
    let percentage = inputValues?.percentage / 100;
    let fromDate = inputValues?.fromDate
      ? new Date(inputValues?.fromDate)
      : new Date();
    let mortgageTime = inputValues?.mortgageTime || 1;

    let type = inputValues?.percentageType;
    let paymentPeriodType = inputValues?.paymentPeriod;
    console.log(type, paymentPeriodType);

    if (paymentPeriodType == 'year') {
      mortgageTime *= 12;
      console.log('Time', mortgageTime);
    }

    console.log(mortgageTime);

    let amortization = [];
    let regularPayment = (amount / mortgageTime).toFixed(2);
    let totalSums = { monthlyInterest: 0, mortgageSum: 0, total: 0 };

    while (amount > 0) {
      let fromPaymentDate = new Date(fromDate);
      let paymentDate = new Date(fromDate.setMonth(fromDate.getMonth() + 1));
      let diffTime = Math.abs(paymentDate - fromPaymentDate);
      let accruedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let monthlyPayment = parseFloat(
        (((amount * percentage) / 360) * accruedDays).toFixed(2)
      );
      let totalAmount = parseFloat(monthlyPayment) + parseFloat(regularPayment);

      totalSums.monthlyInterest += monthlyPayment;
      totalSums.mortgageSum += parseFloat(regularPayment);
      totalSums.total += totalAmount;

      amortization.push({
        paymentDate: formatDate(paymentDate, t),
        percantage: `${monthlyPayment} ${submitCurrency || 'ALL'}`,
        fromMortgageSum: `${regularPayment} ${submitCurrency || 'ALL'}`,
        total: `${totalAmount.toFixed(2)} ${submitCurrency || 'ALL'}`,
        left: `${(amount - regularPayment).toFixed(2)} ${
          submitCurrency || 'ALL'
        }`,
      });
      amount = amount - regularPayment;
    }
    setTotals(totalSums);
    console.log(totalSums);
    setMortgage(amortization);
    console.log(amortization[0]);
    setMonthlyPayment(amortization[0].total);
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
            <h3 className={'suggestion_title'}>Mortgage Calculator</h3>
            <div className={'separator'}></div>
            <Row className={'suggestion__text'}>
              <Col lg={8} md={8} sm={8}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={'Mortgage amount'}
                    id={'mortgage'}
                    onValueChange={(e) => {
                      let payload = {
                        target: {
                          value: e?.floatValue || 0,
                          id: 'mortgage',
                        },
                      };
                      handleOnChange(payload);
                    }}
                    dropdownHandleChange={dropdownHandleChange}
                    autoComplete="current-text"
                    decimalScale={2}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={(values) =>
                      values.value >= 0 &&
                      values.value <= 99999999999999999999999
                    }
                    inputValues={inputValues}
                    prepend={
                      submitCurrency
                        ? { values: [submitCurrency] }
                        : { values: ['ALL'] }
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
                    label={'Percentage'}
                    id={'percentage'}
                    onValueChange={(e) => {
                      let payload = {
                        target: {
                          value: e?.floatValue || 0,
                          id: 'percentage',
                        },
                      };
                      handleOnChange(payload);
                    }}
                    dropdownHandleChange={dropdownHandleChange}
                    autoComplete="current-text"
                    decimalScale={2}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={(values) =>
                      values.value >= 0 && values.value <= 99
                    }
                    inputValues={inputValues}
                    append={{
                      values: [
                        {
                          value: 'even',
                          label: 'Even',
                        },
                        {
                          value: 'desc',
                          label: 'Descending',
                        },
                      ],
                      id: 'percentageType',
                    }}
                    prepend={{ values: ['%'] }}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={12}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={'Time period'}
                    id={'mortgageTime'}
                    onValueChange={(e) => {
                      let payload = {
                        target: {
                          value: e?.floatValue || 0,
                          id: 'mortgageTime',
                        },
                      };
                      handleOnChange(payload);
                    }}
                    dropdownHandleChange={dropdownHandleChange}
                    autoComplete="current-text"
                    decimalScale={0}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={(values) =>
                      values.value >= 0 && values.value <= 99
                    }
                    inputValues={inputValues}
                    append={{
                      values: [
                        {
                          value: 'month',
                          label: 'Months',
                        },
                        {
                          value: 'year',
                          label: 'Years',
                        },
                      ],
                      id: 'paymentPeriod',
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
                    onChange={(e) =>
                      handleOnChange({ target: { value: e, id: 'fromDate' } })
                    }
                    timeFormat={false}
                    dateFormat={'YYYY-MMM-DD'}
                    renderInput={(props) => {
                      return (
                        <Form.Control
                          {...props}
                          id={'fromDate'}
                          placeholder={formatDate(new Date(), t)}
                        />
                      );
                    }}
                  />
                </Form.Group>
              </Col>{' '}
            </Row>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4} className={'info'}>
            <div className={'rating_container'}>
              <div className={'monthly__payment'}>
                <span>Monthly payment:</span>{' '}
                <span className={'amount'}>{formatNumber(monthlyPayment)}</span>
              </div>
            </div>

            <div className={'tool_button'} onClick={handleMortgageCalculation}>
              Calculate
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
                      Payment Date
                    </th>
                    <th scope="col">Interest payment</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Total monthly</th>
                    <th className={'last__col__row'} scope="col">
                      Amount left
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mortgage.map((item) => {
                    return (
                      <tr className={'standalone__row'} key={item?.left}>
                        <td scope="row">{item.paymentDate}</td>

                        <td>{item?.percantage}</td>
                        <td>{formatNumber(item?.fromMortgageSum)}</td>
                        <td>{formatNumber(item?.total)}</td>

                        <td>{formatNumber(item?.left)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="table__footer">
                  <tr>
                    <td className={'first__foot__col'}>Sum</td>
                    <td>{`${totals.monthlyInterest.toFixed(2)}   ${
                      submitCurrency ? submitCurrency : 'ALL'
                    }`}</td>
                    <td>{`${totals.mortgageSum.toFixed(2)}   ${
                      submitCurrency ? submitCurrency : 'ALL'
                    }`}</td>{' '}
                    <td>{`${totals.total.toFixed(2)}   ${
                      submitCurrency ? submitCurrency : 'ALL'
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

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(Tools);
