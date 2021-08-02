import { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { CustomFormControl, SelectInputSubmit } from 'components/common';
import { GiBookshelf } from 'react-icons/gi';
import { RiSaveLine, RiDeleteBin5Line } from 'react-icons/ri';
import { CurriculumVitaesService } from 'services';
import fields from './fields';
import Datetime from 'react-datetime';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';

const Education = (props) => {
  const {
    t,
    saveCv,
    setsaveCv,
    items,
    setItems,
    inputValues,
    onQualificationChange,
    handleOnEducationHistory,
  } = props;
  const [clearIds, setClearIds] = useState([]);
  const eduFields = fields(t);

  const addItem = () => {
    if (items.length >= 10) return;
    let addItems = [];
    for (let i = 0; i <= items.length; i++) {
      addItems.push({ id: i });
    }
    setItems(addItems);
  };

  const removeItem = (id) => {
    if (items.length == 1) return;
    setItems(() => {
      let removeItems = [];
      for (let i = 0; i < items.length - 1; i++) {
        removeItems.push({ id: i });
      }
      return removeItems;
    });

    handleOnEducationHistory({
      remove: true,
      id,
      property: 'EducationHistory',
    });
  };

  const handleCvUpdates = async () => {
    setsaveCv(true);
    try {
      let payload = {
        EducationHistory: inputValues?.EducationHistory || null,
      };

      const { data } = await CurriculumVitaesService.UPDATE_ME(payload);
      if (data) {
        TostifyCustomContainer('success', t('profile:toast.succes'));
      }
    } catch (error) {
      TostifyCustomContainer('error', t('profile:toast.fail'));
    }
    setsaveCv(false);
  };

  return (
    <div className="wrapper__body">
      <Row className="wrapper__body--header ">
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          className="wrapper__body--heading__col"
        >
          <div>
            <GiBookshelf />{' '}
            {t('profile:right-content.cv.sections.education.title')}
            {saveCv ? (
              <Button
                variant="outline-primary"
                className="header-wrapper__save btn-sm"
              >
                <Spinner
                  as="span"
                  animation="border"
                  variant="danger"
                  size="sm"
                  role="status"
                />
              </Button>
            ) : (
              <Button
                onClick={() => handleCvUpdates()}
                variant="outline-primary"
                className="header-wrapper__save btn-sm"
              >
                <RiSaveLine />
              </Button>
            )}
          </div>
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          className="wrapper__body--btn__col"
        >
          <div className="body__button-wrapper">
            <Button
              onClick={() => addItem()}
              variant="outline-primary"
              className="button-wrapper__add"
            >
              {t(
                'profile:right-content.cv.sections.education.accordion.button-add'
              )}
            </Button>
          </div>
        </Col>
      </Row>

      {items.map((edu) => (
        <Row key={edu.id} id={edu.id} className="body__item">
          {eduFields.map((item) => {
            if (item.type === 'text') {
              return (
                <Col lg={4} md={4} sm={6} key={item.key + edu.id}>
                  <Form.Group>
                    <CustomFormControl
                      id={item.key + edu.id}
                      value={
                        inputValues['EducationHistory'][edu.id]
                          ? inputValues['EducationHistory'][edu.id][item.key]
                          : ''
                      }
                      onChange={(event) =>
                        handleOnEducationHistory({
                          property: 'EducationHistory',
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
                      type="text"
                      label={item.label}
                      autoComplete="current-text"
                    />
                  </Form.Group>
                </Col>
              );
            }

            if (item.type === 'textHalf') {
              return (
                <Col lg={6} md={6} sm={12} key={item.key + edu.id}>
                  <Form.Group>
                    <CustomFormControl
                      id={item.key + edu.id}
                      value={
                        inputValues['EducationHistory'][edu.id]
                          ? inputValues['EducationHistory'][edu.id][item.key]
                          : ''
                      }
                      onChange={(event) =>
                        handleOnEducationHistory({
                          property: 'EducationHistory',
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
                      type="text"
                      label={item.label}
                      autoComplete="current-text"
                    />
                  </Form.Group>
                </Col>
              );
            }
            if (item.type === 'selectMulti') {
              return (
                <Col lg={12} md={12} sm={12} key={item.key + edu.id}>
                  <Form.Group>
                    <SelectInputSubmit
                      id={item.key + edu.id}
                      clearIds={clearIds}
                      value={
                        inputValues['EducationHistory'][edu.id]
                          ?.qualificationArea
                          ? inputValues['EducationHistory'][edu.id][item.key]
                          : []
                      }
                      onChange={(event) => {
                        onQualificationChange({
                          property: 'EducationHistory',
                          //index
                          index: edu.id,
                          //value
                          value: event,
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
            if (item.type === 'select') {
              return (
                <Col lg={6} md={6} sm={6} key={item.key + edu.id}>
                  <Form.Group>
                    <SelectInputSubmit
                      id={item.key + edu.id}
                      clearIds={clearIds}
                      value={item.options.filter(
                        (option) =>
                          option.value ===
                          inputValues['EducationHistory'][edu.id]?.qualification
                      )}
                      onChange={(event) => {
                        handleOnEducationHistory({
                          property: 'EducationHistory',
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
            if (item.type === 'studyFromTime') {
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
                        inputValues['EducationHistory'][edu.id]
                          ? Date.parse(
                              inputValues['EducationHistory'][edu.id][item.key]
                            )
                          : ''
                      }
                      onChange={(event) =>
                        handleOnEducationHistory({
                          property: 'EducationHistory',
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
            if (item.type === 'studyToTime') {
              return (
                <Col
                  lg={5}
                  md={4}
                  sm={5}
                  key={item.key + edu.id}
                  className={'decorator__container'}
                >
                  <Form.Group>
                    {item?.decorator}
                    <Datetime
                      inputProps={{ className: 'datetime', readOnly: true }}
                      value={
                        inputValues['EducationHistory'][edu.id]
                          ? Date.parse(
                              inputValues['EducationHistory'][edu.id][item.key]
                            )
                          : ''
                      }
                      onChange={(event) =>
                        handleOnEducationHistory({
                          property: 'EducationHistory',
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
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          className="wrapper__body--footer__left"
        >
          <div className="footer__button-wrapper">
            <Button
              onClick={() => props.goNext('personalDetails')}
              variant="outline-primary"
              className="footer-wrapper__prev"
            >
              {t('profile:right-content.prev-button')}
            </Button>
          </div>
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          className="wrapper__body--footer__right"
        >
          <div className="footer__button-wrapper">
            <Button
              onClick={() => props.goNext('workExpierience')}
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
export default Education;
