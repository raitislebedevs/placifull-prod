import { CustomFormControl } from 'components/common';
import { Row, Col, Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { useEffect, useState } from 'react';

const SalaryTab = (props) => {
  const { t, handleOnChange, submitCurrency } = props;
  const [salary, setSalary] = useState({});
  const salaryFields = [
    {
      key: 'hourlySalaryFrom',
      type: 'currency',
      label: t('job-common:salary.hourly-rate-from'),
      min: 0,
      max: 99999,
    },
    {
      key: 'monthlySalaryFrom',
      type: 'currency',
      label: (
        <>
          {t('job-common:salary.monthly-from')}
          <sup className={'mandatory__field'}>*</sup>
        </>
      ),
      min: 0,
      max: 999999999999999,
    },
    {
      key: 'annualSalaryFrom',
      type: 'currency',
      label: t('job-common:salary.annual-from'),

      min: 0,
      max: 999999999999999,
    },
    {
      key: 'hourlySalaryTo',
      type: 'currency',
      label: t('job-common:salary.hourly-rate-to'),

      min: 0,
      max: 99999,
    },
    {
      key: 'monthlySalaryTo',
      type: 'currency',
      label: (
        <>
          {t('job-common:salary.monthly-to')}
          <sup className={'mandatory__field'}>*</sup>
        </>
      ),
      min: 0,
      max: 999999999999999,
    },

    {
      key: 'annualSalaryTo',
      type: 'currency',
      label: t('job-common:salary.annual-to'),
      min: 0,
      max: 999999999999999,
    },
  ];

  const changeToHourly = (hourlyTo) => {
    setSalary({
      ...salary,
      hourlySalaryTo: hourlyTo,
      annualSalaryTo: (hourlyTo * 8 * 21 * 12).toFixed(0),
      monthlySalaryTo: (hourlyTo * 8 * 21).toFixed(0),
    });
  };

  const changeFromHourly = (hourlyFrom) => {
    setSalary({
      ...salary,
      hourlySalaryFrom: hourlyFrom,
      annualSalaryFrom: (hourlyFrom * 8 * 21 * 12).toFixed(0),
      monthlySalaryFrom: (hourlyFrom * 8 * 21).toFixed(0),
    });
  };

  const handleOnSalaryChange = (e) => {
    if (isNaN(e.target.value)) e.target.value = 0;

    let salaryValue = e.target.value;
    let salaryid = e.target.id;

    if (salaryid === 'hourlySalaryFrom') {
      changeFromHourly(salaryValue);
    }

    if (salaryid === 'hourlySalaryTo') {
      changeToHourly(salaryValue);
    }
  };

  useEffect(() => {
    handleOnChange(salary);
  }, [salary]);

  return (
    <div className="tabs__wrapper">
      <Row>
        {salaryFields.map((item) => {
          if (item.type === 'currency') {
            return (
              <Col lg={4} md={4} sm={6} key={item.key}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={item.label}
                    id={item.key}
                    value={salary[item.key]}
                    onValueChange={(e) => {
                      let payload = {
                        target: {
                          value: e.floatValue,
                          id: item.key,
                        },
                      };
                      handleOnSalaryChange(payload);
                    }}
                    autoComplete="current-text"
                    thousandSeparator={true}
                    decimalScale={item.decimalpoints}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={(values) =>
                      values.value >= item.min && values.value <= item.max
                    }
                    prepend={
                      submitCurrency
                        ? { values: [submitCurrency] }
                        : { values: [t('job-submit:form.no-currency')] }
                    }
                  />
                </Form.Group>
              </Col>
            );
          }
        })}
      </Row>
    </div>
  );
};

export default SalaryTab;
