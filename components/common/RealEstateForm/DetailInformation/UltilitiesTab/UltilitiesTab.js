import { useEffect, useMemo, useState } from 'react';
import fields from './fields';
import { Row, Col, Form } from 'react-bootstrap';
import { CustomFormControl } from 'components/common';
import NumberFormat from 'react-number-format';

const UltilitiesTab = (props) => {
  const {
    t,
    inputValues,
    handleOnChange,
    submitCurrency,
    initialNumberValues,
  } = props;
  const fieldsInput = fields(t);
  // Compute total ultilities fee. Only run when the fields that sum the total change
  // I'm using checkDependencies here and pass into useMemo to prevent it from running(render) when other inputValues fields change
  const checkDependencies = fieldsInput.map((item) => inputValues[item.key]);

  const total = useMemo(() => {
    let sum = 0;
    fieldsInput.map((item) => {
      if (inputValues[item.key] && !isNaN(inputValues[item.key])) {
        sum += inputValues[item.key];
      }
    });

    return sum;
  }, checkDependencies);

  useEffect(() => {
    if (total || total === 0) {
      handleOnChange({ target: { value: total, id: 'totalUltilities' } });
    }
  }, [total]);

  return (
    <div className="tabs__wrapper">
      <Row>
        {fieldsInput.map((item) => (
          <Col
            lg={4}
            md={4}
            sm={6}
            xs={12}
            key={item.key}
            className="form__item"
          >
            <Form.Group>
              <NumberFormat
                customInput={CustomFormControl}
                id={item.key}
                className="form__input"
                defaultValue={initialNumberValues[item.key]}
                label={item.label}
                thousandSeparator={true}
                decimalScale={2}
                allowNegative={false}
                fixedDecimalScale={true}
                thousandsGroupStyle="thousand"
                onValueChange={(values) => {
                  let payload = {
                    target: {
                      id: item.key,
                      value: values.floatValue || 0,
                    },
                  };
                  handleOnChange(payload);
                }}
                autoComplete="current-text"
                isAllowed={(values) =>
                  values.value >= item.min && values.value <= item.max
                }
                prefix={
                  submitCurrency
                    ? submitCurrency + ' '
                    : t('real-estate-submit:form.no-currency') + ' '
                }
                suffix={item.suffix}
              />
            </Form.Group>
          </Col>
        ))}
        <Col lg={4} md={4} sm={6} xs={12} className="form__item">
          <Form.Group>
            <NumberFormat
              customInput={CustomFormControl}
              id="total"
              className="form__input"
              value={total}
              defaultValue={initialNumberValues.totalUltilities}
              label={t('real-estate-common:utilities.total')}
              autoComplete="current-text"
              thousandSeparator={true}
              decimalScale={2}
              allowNegative={false}
              fixedDecimalScale={true}
              thousandsGroupStyle="thousand"
              isAllowed={() => false}
              prefix={
                submitCurrency
                  ? submitCurrency + ' '
                  : t('real-estate-submit:form.no-currency') + ' '
              }
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default UltilitiesTab;
