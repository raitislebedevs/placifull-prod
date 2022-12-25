import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { CustomFormControl } from 'components/common';
import { CurrencyInput } from 'components/common';
import { RiCalendar2Line } from 'react-icons/ri';
import Datetime from 'react-datetime';
import { formatNumber } from 'utils/standaloneFunctions';
import { useState } from 'react';

function SalaryCalculator(props) {
  const { t } = props;
  const [submitCurrency, setSubmitCurrency] = useState('');
  const [inputValues, setInputValues] = useState({});
  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };
  const dropdownHandleChange = (e) => {
    handleOnChange({ target: { value: e.target.value, id: e.target.id } });
  };

  return (
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
          <h3 className={'suggestion_title'}>{t('tools:salary.heading')}</h3>
          <div className={'separator'}></div>
          <Row className={'suggestion__text'}>
            <Col lg={4} md={4} sm={4}>
              <Form.Group>
                <NumberFormat
                  customInput={CustomFormControl}
                  label={t('tools:salary.bruto')}
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
                    values.value >= 0 && values.value <= 99999999999999999999999
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
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} lg={4} xl={4} className={'info'}>
          <div className={'tool_button'}>{t('tools:mortgage.submit')}</div>
        </Col>
      </Row>
    </Container>
  );
}

export default SalaryCalculator;
