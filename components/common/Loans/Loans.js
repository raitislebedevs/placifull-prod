import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { AiOutlineSetting } from 'react-icons/ai';
import { CustomFormControl, SelectInputSubmit } from 'components/common';
import { formatNumber } from 'utils/standaloneFunctions';
import { AccountSettingsModal } from '../index';
import AppLineGraphics from '../AppLineGraphics/AppLineGraphics';
import AppPieGraphics from '../AppPieGraphics/AppPieGraphics';
import { useTheme } from '@mui/material/styles';

function Loans(props) {
  const { user, t } = props;
  const theme = useTheme();
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);
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

  const processSettings = () => {
    console.log('Settings Processed');
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      <div className="account__frame">
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
            <div className="budget__heading">
              <div>Loan Info</div>
              <div
                className="settings__button"
                onClick={() => setIsSettingsOpened(!isSettingsOpened)}
              >
                <AiOutlineSetting />
              </div>
            </div>
            <div className="summary__info">
              <Row>
                <Col xl={3} lg={3} md={4} sm={4} xs={4}>
                  <div className="account__name">Summary</div>
                </Col>
                <Col xl={9} lg={9} md={8} sm={8} xs={8}>
                  <Row>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                      <div className="ballance__info">Loan amount</div>
                      <div>$ 96 000.00</div>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                      <div className="ballance__info">Paid off amount</div>
                      <div>$ 34 085.65</div>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                      <div className="ballance__info">Paid in interest</div>
                      <div>$ 6 452.65</div>
                    </Col>
                    <Col lg={3} md={6} sm={6}>
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
                </Col>
              </Row>
            </div>
            <div>
              <AppLineGraphics
                title="Monthly Summary"
                subheader="(+43.24%) saved from last month"
                currency={'$'}
                chartLabels={[
                  '01/01/2003',
                  '02/01/2003',
                  '03/01/2003',
                  '04/01/2003',
                  '05/01/2003',
                  '06/01/2003',
                  '07/01/2003',
                  '08/01/2003',
                  '09/01/2003',
                  '10/01/2003',
                  '11/01/2003',
                ]}
                chartData={[
                  {
                    name: 'Base payment',
                    type: 'column',
                    fill: 'gradient',
                    data: [
                      0, 4000, 4000, 4000, 4000, 4000, 4000, 1000, 2000, 2300,
                      2500,
                    ],
                  },
                  {
                    name: 'Interest Payment',
                    type: 'column',
                    fill: 'gradient',
                    data: [
                      2222, 2185, 2085, 1976, 1867, 2386, 2001, 856, 856, 856,
                      788,
                    ],
                  },
                ]}
              />
            </div>
          </>
        )}
      </div>
      <AccountSettingsModal
        showModal={isSettingsOpened}
        handleModalClose={() => {
          setIsSettingsOpened(!isSettingsOpened);
        }}
        setSubmitCurrency={setSubmitCurrency}
        handleOnChange={handleOnChange}
        processSubmit={processSettings}
        headerText={'Account Settings'}
        submitText={'Submit'}
        cancelText={'Cancel'}
      />
    </>
  );
}

export default Loans;
