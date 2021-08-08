import { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { CustomFormControl, SelectInputSubmit } from 'components/common';
import { HiOutlineUsers } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import fields from './fields';

const TransportationLicense = (props) => {
  const {
    t,
    inputValues,
    licenseItems,
    setLicenseItems,
    handleOnTransportLicenses,
  } = props;
  const [clearIds, setClearIds] = useState([]);
  const licenseFields = fields(t);

  const addItem = () => {
    if (licenseItems.length >= 10) return;
    let addItems = [];
    for (let i = 0; i <= licenseItems.length; i++) {
      addItems.push({ id: i });
    }
    setLicenseItems(addItems);
  };

  const removeItem = (id) => {
    if (licenseItems.length == 1) return;
    setLicenseItems(() => {
      let removeItems = [];
      for (let i = 0; i < licenseItems.length - 1; i++) {
        removeItems.push({ id: i });
      }
      return removeItems;
    });

    handleOnTransportLicenses({
      remove: true,
      id,
      property: 'TransportLicenses',
    });
  };

  return (
    <div className="wrapper__body">
      <Row className="wrapper__body--header ">
        <Col lg={8} className="wrapper__body--heading__col">
          <div>
            <HiOutlineUsers />{' '}
            {t('profile:right-content.cv.sections.licenses.title')}
          </div>
        </Col>
        <Col lg={4} className="wrapper__body--btn__col">
          <div className="body__button-wrapper">
            <Button
              onClick={() => addItem()}
              variant="outline-primary"
              className="button-wrapper__add"
            >
              {t(
                'profile:right-content.cv.sections.licenses.accordion.button-add'
              )}
            </Button>
          </div>
        </Col>
      </Row>
      {licenseItems.map((edu) => (
        <Row key={edu.id} id={edu.id} className="body__item">
          {licenseFields.map((item) => {
            if (item.type === 'textSmall') {
              return (
                <Col lg={3} md={3} sm={6} key={item.key + edu.id}>
                  <Form.Group>
                    <CustomFormControl
                      id={item.key + edu.id}
                      value={
                        inputValues['TransportLicenses'][edu.id]
                          ? inputValues['TransportLicenses'][edu.id][item.key]
                          : ''
                      }
                      onChange={(event) =>
                        handleOnTransportLicenses({
                          property: 'TransportLicenses',
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
                      maxLength={'33'}
                      type="text"
                      label={item.label}
                      autoComplete="current-text"
                    />
                  </Form.Group>
                </Col>
              );
            }
            if (item.type === 'text') {
              return (
                <Col lg={4} md={4} sm={6} key={item.key + edu.id}>
                  <Form.Group>
                    <CustomFormControl
                      id={item.key + edu.id}
                      value={
                        inputValues['TransportLicenses'][edu.id]
                          ? inputValues['TransportLicenses'][edu.id][item.key]
                          : ''
                      }
                      onChange={(event) =>
                        handleOnTransportLicenses({
                          property: 'TransportLicenses',
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
                      maxLength={'33'}
                      type="text"
                      label={item.label}
                      autoComplete="current-text"
                    />
                  </Form.Group>
                </Col>
              );
            }
            if (item.type === 'select') {
              return (
                <Col lg={4} md={4} sm={4} key={item.key + edu.id}>
                  <Form.Group>
                    <SelectInputSubmit
                      id={item.key + edu.id}
                      clearIds={clearIds}
                      value={item.options.filter(
                        (option) =>
                          option.value ===
                          inputValues['TransportLicenses'][edu.id]
                            ?.yearExpierience
                      )}
                      onChange={(event) => {
                        handleOnTransportLicenses({
                          property: 'TransportLicenses',
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
                      isMulti={item?.isMulti}
                      options={item.options}
                      placeholder={item.label}
                    />
                  </Form.Group>
                </Col>
              );
            }
          })}
          <Col xs={12} sm={1} md={1} lg={1} xl={1}>
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
        </Row>
      ))}
      <Row className="wrapper__body--footer">
        <Col lg={6} className="wrapper__body--footer__left">
          <div className="footer__button-wrapper">
            <Button
              onClick={() => props.goNext('computerSkills')}
              variant="outline-primary"
              className="footer-wrapper__prev"
            >
              {t('profile:right-content.prev-button')}
            </Button>
          </div>
        </Col>
        <Col lg={6} className="wrapper__body--footer__right">
          <div className="footer__button-wrapper">
            <Button
              onClick={() => props.goNext('workExpactations')}
              variant="outline-primary"
              className="footer-wrapper__next"
            >
              {t('profile:right-content.next-button')}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TransportationLicense;
