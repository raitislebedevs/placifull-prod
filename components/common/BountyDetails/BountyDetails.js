import { SectionHeading, CustomFormControl } from 'components/common';
import { Row, Col, Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

const BountyDetails = (props) => {
  const { t, inputValues, handleOnChange, submitCurrency } = props;

  const bountyDays = [
    { label: t('common:bounty.oneToFive'), key: 'oneToFive' },
    { label: t('common:bounty.sixToFifteen'), key: 'sixToFifteen' },
    { label: t('common:bounty.sixteenPlus'), key: 'sixteenPlus' },
  ];

  return (
    <div className="form__section">
      <div className="input__bounty__section">
        <SectionHeading>{t('common:bounty.label')}</SectionHeading>
        <Row>
          {bountyDays.map((item) => {
            return (
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
                    defaultValue={inputValues[item.key]}
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
                      values.value >= 0 && values.value <= 100000000000
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
            );
          })}
        </Row>
      </div>
    </div>
  );
};
export default BountyDetails;
