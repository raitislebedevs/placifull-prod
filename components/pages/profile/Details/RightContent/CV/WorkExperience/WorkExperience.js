import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { CustomFormControl, SelectInputSubmit } from 'components/common';
import { HiOutlineUsers } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import fields from './fields';
import Datetime from 'react-datetime';

const WorkExperience = (props) => {
  const { t, handleOnWorkExpierience, expItems, setExpItems, inputValues } =
    props;
  const [clearIds, setClearIds] = useState([]);
  const workFields = fields(t);

  const addItem = () => {
    if (expItems.length >= 10) return;
    let addItems = [];
    for (let i = 0; i <= expItems.length; i++) {
      addItems.push({ id: i });
    }
    setExpItems(addItems);
  };

  const removeItem = (id) => {
    if (expItems.length == 1) return;
    setExpItems(() => {
      let removeItems = [];
      for (let i = 0; i < expItems.length - 1; i++) {
        removeItems.push({ id: i });
      }
      return removeItems;
    });

    handleOnWorkExpierience({
      remove: true,
      id,
      property: 'WorkExpierience',
    });
  };

  const getCurrentLength = (item) => {
    if (item) {
      return 2000 - item.positionDescription?.length;
    }
    return 2000;
  };

  return (
    <div className="wrapper__body">
      <Row className="wrapper__body--header ">
        <Col lg={6} className="wrapper__body--heading__col">
          <div>
            <HiOutlineUsers />{' '}
            {t('profile:right-content.cv.sections.expierience.title')}
          </div>
        </Col>
        <Col lg={6} className="wrapper__body--btn__col">
          <div className="body__button-wrapper">
            <Button
              onClick={() => addItem()}
              variant="outline-primary"
              className="button-wrapper__add"
            >
              {t('profile:right-content.cv.sections.expierience.button-add')}
            </Button>
          </div>
        </Col>
      </Row>
      {expItems.map((edu) => (
        <Row key={edu.id} id={edu.id} className="body__item">
          {workFields.map((item) => {
            if (item.type === 'text') {
              return (
                <Col lg={6} md={6} sm={6} key={item.key + edu.id}>
                  <Form.Group>
                    <CustomFormControl
                      id={item.key + edu.id}
                      value={
                        inputValues['WorkExpierience'][edu.id]
                          ? inputValues['WorkExpierience'][edu.id][item.key]
                          : ''
                      }
                      onChange={(event) =>
                        handleOnWorkExpierience({
                          property: 'WorkExpierience',
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
            if (item.type === 'textarea') {
              return (
                <Col lg={12} key={item.key}>
                  <Form.Group>
                    <CustomFormControl
                      as="textarea"
                      rows={6}
                      id={item.key}
                      value={
                        inputValues['WorkExpierience'][edu.id]
                          ? inputValues['WorkExpierience'][edu.id][item.key]
                          : ''
                      }
                      onChange={(event) =>
                        handleOnWorkExpierience({
                          property: 'WorkExpierience',
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
                      valueLength={getCurrentLength(
                        inputValues['WorkExpierience'][edu.id]
                      )}
                      maxLength={'2000'}
                      type="text"
                      style={{ resize: 'vertical', height: 'auto' }}
                      label={item.label}
                      autoComplete="current-text"
                    />
                  </Form.Group>
                </Col>
              );
            }
            if (item.type === 'select') {
              return (
                <Col lg={6} md={6} sm={6} key={item.key + edu.id}>
                  <Form.Group>
                    <SelectInputSubmit
                      id={item.key + edu.id}
                      clearIds={clearIds}
                      value={
                        item?.key === 'employmentSector'
                          ? item.options.filter(
                              (option) =>
                                option.value ===
                                inputValues['WorkExpierience'][edu.id]
                                  ?.employmentSector
                            )
                          : item.options.filter(
                              (option) =>
                                option.value ===
                                inputValues['WorkExpierience'][edu.id]
                                  ?.seniority
                            )
                      }
                      onChange={(event) => {
                        handleOnWorkExpierience({
                          property: 'WorkExpierience',
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
                      isSearchable={true}
                      isMulti={item?.isMulti}
                      options={item.options}
                      placeholder={item.label}
                    />
                  </Form.Group>
                </Col>
              );
            }
            if (item.type === 'fromTime') {
              return (
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  key={item.key + edu.id}
                  className={'decorator__container'}
                >
                  <Form.Group>
                    {item?.decorator}
                    <Datetime
                      inputProps={{ className: 'datetime', readOnly: true }}
                      value={
                        inputValues['WorkExpierience'][edu.id]
                          ? Date.parse(
                              inputValues['WorkExpierience'][edu.id][item.key]
                            )
                          : ''
                      }
                      onChange={(event) =>
                        handleOnWorkExpierience({
                          property: 'WorkExpierience',
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
                      timeFormat={false}
                      dateFormat={'YYYY-MM'}
                      closeOnClickOutside
                      closeOnSelect
                      renderInput={(props) => {
                        return (
                          <Form.Control
                            {...props}
                            id={item.key + edu.id}
                            label={item.label}
                            placeholder={item.label}
                          />
                        );
                      }}
                    />
                  </Form.Group>
                </Col>
              );
            }
            if (item.type === 'toTime') {
              return (
                <Col
                  lg={5}
                  md={5}
                  sm={5}
                  xs={12}
                  key={item.key + edu.id}
                  className={'decorator__container'}
                >
                  <Form.Group>
                    {item?.decorator}
                    <Datetime
                      inputProps={{ className: 'datetime', readOnly: true }}
                      value={
                        inputValues['WorkExpierience'][edu.id]
                          ? Date.parse(
                              inputValues['WorkExpierience'][edu.id][item.key]
                            )
                          : ''
                      }
                      onChange={(event) =>
                        handleOnWorkExpierience({
                          property: 'WorkExpierience',
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
                      timeFormat={false}
                      dateFormat={'YYYY-MM'}
                      closeOnClickOutside
                      closeOnSelect
                      renderInput={(props) => {
                        return (
                          <Form.Control
                            {...props}
                            id={item.key + edu.id}
                            label={item.label}
                            placeholder={item.label}
                          />
                        );
                      }}
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
              onClick={() => props.goNext('education')}
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
              onClick={() => props.goNext('languageSkills')}
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

export default WorkExperience;
