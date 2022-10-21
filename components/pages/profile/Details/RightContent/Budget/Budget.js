import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import {
  CustomFormControl,
  CurrencyInput,
  SelectInputSubmit,
} from 'components/common';
import { formatNumber } from 'utils/standaloneFunctions';

function Budget(props) {
  const { user, t } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [inputValues, setInputValues] = useState({});
  const [submitCurrency, setSubmitCurrency] = useState('ALL');
  const options = [
    {
      value: 'week',
      label: 'Week',
      id: 'period',
    },
    {
      value: 'month',
      label: 'Month',
      id: 'period',
    },
    {
      value: 'year',
      label: 'Year',
      id: 'period',
    },
    {
      value: 'all',
      label: 'By years',
      id: 'period',
    },
  ];
  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  return (
    <div className="budget__container">
      <div className="budget__heading">Budget planner [To be created]</div>
      {isLoading ? (
        <div className="loader">
          <Spinner
            as="span"
            animation="grow"
            variant="danger"
            size="md"
            role="status"
          />
        </div>
      ) : (
        <>
          <div className="summary__info">
            <Row>
              <Col xl={3} lg={3} md={4} sm={6} xs={6}>
                <div className="account__name">Summary</div>
              </Col>
              <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                <div className="ballance__info">Ballance</div>
                <div>$ 852.25</div>
              </Col>
              <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                <div className="ballance__info">Spend</div>
                <div>$ 852.25</div>
              </Col>
              <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                <div className="ballance__info">Saved</div>
                <div>$ 852.25</div>
              </Col>
              <Col xl={3} lg={3} md={4} sm={6} xs={6}>
                <Form.Group>
                  <CurrencyInput
                    handleOnChange={handleOnChange}
                    setCurrency={setSubmitCurrency}
                    currencyId={'budgetCurrency'}
                    initialSelect={inputValues?.budgetCurrency}
                    isMandatory={true}
                  />
                </Form.Group>
              </Col>
              <Col xl={3} lg={3} md={4} sm={6} xs={6}></Col>
              <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                <div className="button__container">
                  <Button variant="info">Transfer</Button>
                </div>
              </Col>
              <Col xl={3} lg={3} md={4} sm={6} xs={6}>
                <div className="button__container">
                  <Button variant="info">Reocurring exp.</Button>
                </div>
              </Col>
              <Col xl={3} lg={3} md={4} sm={6} xs={6}>
                <div className="button__container">
                  <Button variant="info">Import csv...</Button>
                </div>
              </Col>
              <Col lg={4} md={4} sm={6}>
                <Form.Group>
                  <SelectInputSubmit
                    id={'period'}
                    onChange={handleOnChange}
                    maxLength={10}
                    value={options.filter(
                      (option) => option.value === inputValues['period']
                    )}
                    options={options}
                    placeholder={'Period'}
                    isSearchable={true}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="account__container">
            <div className="account__info">
              <Row>
                <Col xl={4} lg={4} md={4} sm={6} xs={6}>
                  <div className="account__name"> Swedbank [EUR]</div>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                  <div className="ballance__info">Ballance</div>
                  <div>$ 852.25</div>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                  <div className="ballance__info">Spend</div>
                  <div>$ 852.25</div>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                  <div className="ballance__info">Saved</div>
                  <div>$ 852.25</div>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                  <div className="button__container">
                    <Button>Edit</Button>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="table__overflow">
              <table className="table__Listing">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Nr.</th>
                    <th scope="col" className="area__column">
                      Area
                    </th>
                    <th scope="col">January</th>
                    <th scope="col">February</th>
                    <th scope="col">March</th>
                    <th scope="col">April</th>
                    <th scope="col">May</th>
                    <th scope="col">June</th>
                    <th scope="col">July</th>
                    <th scope="col">August</th>
                    <th scope="col">September</th>
                    <th scope="col">Oktober</th>
                    <th scope="col">November</th>
                    <th scope="col">December</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={'standalone__row'}>
                    <td scope="col">1</td>
                    <td scope="col">Fruits & Vegitables</td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                  </tr>
                  <tr className={'standalone__row'}>
                    <td scope="col">2</td>
                    <td scope="col">Home utilitis</td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className={'footer__row'}>
                    <td scope="col"></td>
                    <td scope="col">Spent</td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                  </tr>
                  <tr className={'footer__row'}>
                    <td scope="col"></td>
                    <td scope="col">Budget</td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                  </tr>
                  <tr className={'footer__row'}>
                    <td scope="col"></td>
                    <td scope="col">Saved</td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                  </tr>
                  <tr className={'standalone__row summary__row'}>
                    <td scope="col"></td>
                    <td scope="col">Total spent</td>
                    <td scope="col" className="summary__amount">
                      $ {formatNumber(620.54)}
                    </td>

                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                  </tr>
                  <tr className={'standalone__row'}>
                    <td scope="col"></td>
                    <td scope="col">Total saved</td>
                    <td scope="col" className="summary__amount">
                      $ {formatNumber(8520.54)}
                    </td>

                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="account__actions">
              <Row>
                <Col xl={3} lg={3} md={4} sm={6} xs={6}>
                  <div className="button__container">
                    <Button variant="danger">+ Expense</Button>
                  </div>
                </Col>
                <Col xl={3} lg={3} md={4} sm={6} xs={6}>
                  <div className="button__container">
                    <Button variant="success">+ Income</Button>
                  </div>
                </Col>
                <Col lg={4} md={4} sm={6}>
                  <div className="fx__rate">
                    <Form.Group>
                      <NumberFormat
                        customInput={CustomFormControl}
                        label={'FX rate'}
                        id={'percentage'}
                        value={inputValues.percentage}
                        onChange={handleOnChange}
                        autoComplete="current-text"
                        thousandSeparator={true}
                        decimalScale={8}
                        allowNegative={false}
                        thousandsGroupStyle="thousand"
                        fixedDecimalScale={true}
                        isAllowed={(values) =>
                          values.value > 0 && values.value <= 999999999
                        }
                        prepend={{ values: [submitCurrency] }}
                      />
                    </Form.Group>
                  </div>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                  <div className="button__container">
                    <Button variant="info">Budget</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div className="account__container">
            <div className="account__info">
              <Row>
                <Col xl={4} lg={4} md={4} sm={6} xs={6}>
                  <div className="account__name">Revoult [EUR]</div>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                  <div className="ballance__info">Ballance</div>
                  <div>$ 852.25</div>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                  <div className="ballance__info">Spend</div>
                  <div>$ 852.25</div>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                  <div className="ballance__info">Saved</div>
                  <div>$ 852.25</div>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                  <div className="button__container">
                    <Button>Edit</Button>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="table__overflow">
              <table className="table__Listing">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Nr.</th>
                    <th scope="col" className="area__column">
                      Area
                    </th>
                    <th scope="col">January</th>
                    <th scope="col">February</th>
                    <th scope="col">March</th>
                    <th scope="col">April</th>
                    <th scope="col">May</th>
                    <th scope="col">June</th>
                    <th scope="col">July</th>
                    <th scope="col">August</th>
                    <th scope="col">September</th>
                    <th scope="col">Oktober</th>
                    <th scope="col">November</th>
                    <th scope="col">December</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={'standalone__row'}>
                    <td scope="col">1</td>
                    <td scope="col">Fruits & Vegitables</td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                  </tr>
                  <tr className={'standalone__row'}>
                    <td scope="col">2</td>
                    <td scope="col">Home utilitis</td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(25.66)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className={'footer__row'}>
                    <td scope="col"></td>
                    <td scope="col">Spent</td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(51.12)}
                    </td>
                  </tr>
                  <tr className={'footer__row'}>
                    <td scope="col"></td>
                    <td scope="col">Budget</td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(60.0)}
                    </td>
                  </tr>
                  <tr className={'footer__row'}>
                    <td scope="col"></td>
                    <td scope="col">Saved</td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                    <td scope="col" className="spent__amount">
                      $ {formatNumber(8.88)}
                    </td>
                  </tr>
                  <tr className={'standalone__row summary__row'}>
                    <td scope="col"></td>
                    <td scope="col">Total spent</td>
                    <td scope="col" className="summary__amount">
                      $ {formatNumber(620.54)}
                    </td>

                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                  </tr>
                  <tr className={'standalone__row'}>
                    <td scope="col"></td>
                    <td scope="col">Total saved</td>
                    <td scope="col" className="summary__amount">
                      $ {formatNumber(8520.54)}
                    </td>

                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                    <td scope="col"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="account__actions">
              <Row>
                <Col xl={3} lg={3} md={4} sm={6} xs={6}>
                  <div className="button__container">
                    <Button variant="danger">+ Expense</Button>
                  </div>
                </Col>
                <Col xl={3} lg={3} md={4} sm={6} xs={6}>
                  <div className="button__container">
                    <Button variant="success">+ Income</Button>
                  </div>
                </Col>
                <Col lg={4} md={4} sm={6}>
                  <div className="fx__rate">
                    <Form.Group>
                      <NumberFormat
                        customInput={CustomFormControl}
                        label={'FX rate'}
                        id={'percentage'}
                        value={inputValues.percentage}
                        onChange={handleOnChange}
                        autoComplete="current-text"
                        thousandSeparator={true}
                        decimalScale={8}
                        allowNegative={false}
                        thousandsGroupStyle="thousand"
                        fixedDecimalScale={true}
                        isAllowed={(values) =>
                          values.value > 0 && values.value <= 999999999
                        }
                        prepend={{ values: [submitCurrency] }}
                      />
                    </Form.Group>
                  </div>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} xs={6}>
                  <div className="button__container">
                    <Button variant="info">Budget</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Budget;
