import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { CustomFormControl, SelectInputSubmit } from 'components/common';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { HiOutlineUsers } from 'react-icons/hi';
import fields from './fields';
import NumberFormat from 'react-number-format';
import guidGenerator from 'utils/guidGenerator';

const WorkExpectations = (props) => {
  const {
    t,
    inputValues,
    workExpItems,
    setWorkExpItems,
    submitCurrency,
    handleOnWorkExpectations,
  } = props;

  const formFields = fields(t);
  const [clearIds, setClearIds] = useState([]);

  const addItem = () => {
    if (workExpItems.length >= 20) return;
    let addItems = [];
    for (let i = 0; i <= workExpItems.length; i++) {
      addItems.push({ id: i });
    }
    setWorkExpItems(addItems);
  };

  const removeItem = (id) => {
    if (workExpItems.length == 1) return;
    setWorkExpItems(() => {
      let removeItems = [];
      for (let i = 0; i < workExpItems.length - 1; i++) {
        removeItems.push({ id: i });
      }
      return removeItems;
    });

    handleOnWorkExpectations({
      remove: true,
      id,
      property: 'WorkExpectations',
    });
  };

  return (
    <div className="wrapper__body">
      <Row className="wrapper__body--header ">
        <Col lg={6} className="wrapper__body--heading__col">
          <div>
            <HiOutlineUsers />{' '}
            {t('profile:right-content.cv.sections.expectations.title')}
          </div>
        </Col>
        <Col lg={6} className="wrapper__body--btn__col">
          <div className="body__button-wrapper">
            <Button
              onClick={() => addItem()}
              variant="outline-primary"
              className="button-wrapper__add"
            >
              {t(
                'profile:right-content.cv.sections.expectations.accordion.button-add'
              )}
            </Button>
          </div>
        </Col>
      </Row>
      {workExpItems.map((edu) => (
        <Row key={edu.id} id={edu.id} className="body__item">
          {formFields.map((item) => {
            if (item.type === 'text') {
              return (
                <Col lg={11} md={11} sm={11} key={item.key + edu.id}>
                  <Form.Group>
                    <CustomFormControl
                      id={item.key + edu.id}
                      value={
                        inputValues['WorkExpectations'][edu.id]
                          ? inputValues['WorkExpectations'][edu.id][item.key]
                          : ''
                      }
                      onChange={(event) =>
                        handleOnWorkExpectations({
                          property: 'WorkExpectations',
                          //index
                          index: edu.id,
                          //value
                          target: {
                            value:
                              event?.target?.value ?? event?.value ?? event,
                            id: item.key,
                          },
                        })
                      }
                      maxLength={'57'}
                      type="text"
                      label={item.label}
                      autoComplete="current-text"
                    />
                  </Form.Group>
                </Col>
              );
            }
            if (item.type === 'number') {
              return (
                <Col
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  key={item.key + edu.id}
                  className="form__item"
                >
                  <Form.Group>
                    <NumberFormat
                      customInput={CustomFormControl}
                      id={item.key + edu.id}
                      value={
                        inputValues['WorkExpectations'][edu.id]
                          ? inputValues['WorkExpectations'][edu.id][item.key]
                          : ''
                      }
                      className="form__input"
                      label={item.label}
                      thousandSeparator={true}
                      decimalScale={2}
                      allowNegative={false}
                      fixedDecimalScale={true}
                      thousandsGroupStyle="thousand"
                      onValueChange={(event) => {
                        handleOnWorkExpectations({
                          property: 'WorkExpectations',
                          //index
                          index: edu.id,
                          //value
                          target: {
                            value: event?.floatValue || 0,
                            id: item.key,
                          },
                        });
                      }}
                      autoComplete="current-text"
                      isAllowed={(values) =>
                        values.value >= item.min && values.value <= item.max
                      }
                      prepend={
                        submitCurrency
                          ? { values: [submitCurrency] }
                          : { values: [t('common:currency.no-currency')] }
                      }
                    />
                  </Form.Group>
                </Col>
              );
            }
            if (item.type === 'selectVacancy') {
              return (
                <Col lg={6} md={6} sm={6} key={item.key + edu.id}>
                  <Form.Group>
                    <SelectInputSubmit
                      id={item.key + edu.id}
                      clearIds={clearIds}
                      value={item.options.filter(
                        (option) =>
                          option.value ===
                          inputValues['WorkExpectations'][edu.id]?.vacancyOption
                      )}
                      onChange={(event) => {
                        handleOnWorkExpectations({
                          property: 'WorkExpectations',
                          //index
                          index: edu.id,
                          //value
                          target: {
                            value:
                              event?.target?.value ?? event?.value ?? event,
                            id: item.key,
                          },
                        });
                      }}
                      maxLength={10}
                      isSearchable={true}
                      options={item.options}
                      placeholder={item.label}
                    />
                  </Form.Group>
                </Col>
              );
            }
            if (item.type === 'deleteButton') {
              return (
                <Col xs={12} sm={1} md={1} lg={1} xl={1} key={guidGenerator()}>
                  <div className="body__button-wrapper body__button-wrapper--delete">
                    <Button
                      variant="outline-primary"
                      size={'sm'}
                      onClick={() => removeItem(edu.id)}
                    >
                      <RiDeleteBin5Line />
                    </Button>
                  </div>
                </Col>
              );
            }
            if (item.type === 'selectSeniority') {
              return (
                <Col lg={6} md={6} sm={6} key={item.key + edu.id}>
                  <Form.Group>
                    <SelectInputSubmit
                      id={item.key + edu.id}
                      clearIds={clearIds}
                      value={item.options.filter(
                        (option) =>
                          option.value ===
                          inputValues['WorkExpectations'][edu.id]?.seniority
                      )}
                      onChange={(event) => {
                        handleOnWorkExpectations({
                          property: 'WorkExpectations',
                          //index
                          index: edu.id,
                          //value
                          target: {
                            value:
                              event?.target?.value ?? event?.value ?? event,
                            id: item.key,
                          },
                        });
                      }}
                      maxLength={7}
                      isSearchable={true}
                      isMulti={item?.isMulti}
                      options={item.options}
                      placeholder={item.label}
                    />
                  </Form.Group>
                </Col>
              );
            }
          })}
        </Row>
      ))}
      <Row className="wrapper__body--footer">
        <Col lg={12} className="wrapper__body--footer__left">
          <div className="footer__button-wrapper">
            <Button
              onClick={() => props.goNext('transportationLicenses')}
              variant="outline-primary"
              className="footer-wrapper__prev"
            >
              {t('profile:right-content.prev-button')}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default WorkExpectations;
