import { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { CustomFormControl, SelectInputSubmit } from 'components/common';
import { RiSaveLine, RiDeleteBin5Line } from 'react-icons/ri';
import { HiOutlineUsers } from 'react-icons/hi';
import { CurriculumVitaesService } from 'services';
import fields from './fields';

const ComputerSkills = (props) => {
  const {
    t,
    pcItems,
    setPcItems,
    saveCv,
    setsaveCv,
    inputValues,
    handleOnComputerSkills,
  } = props;
  const pcFields = fields(t);
  const [clearIds, setClearIds] = useState([]);

  const addItem = () => {
    if (pcItems.length >= 20) return;
    let addItems = [];
    for (let i = 0; i <= pcItems.length; i++) {
      addItems.push({ id: i });
    }
    setPcItems(addItems);
  };

  const removeItem = (id) => {
    if (pcItems.length == 1) return;
    setPcItems(() => {
      let removeItems = [];
      for (let i = 0; i < pcItems.length - 1; i++) {
        removeItems.push({ id: i });
      }
      return removeItems;
    });

    handleOnComputerSkills({
      remove: true,
      id,
      property: 'ComputerSkiills',
    });
  };

  const handleCvUpdates = async () => {
    setsaveCv(true);
    try {
      let payload = {
        ComputerSkiills: inputValues?.ComputerSkiills || null,
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
        <Col lg={6} className="wrapper__body--heading__col">
          <div>
            <HiOutlineUsers />{' '}
            {t('profile:right-content.cv.sections.computer.title')}
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
        <Col lg={6} className="wrapper__body--btn__col">
          <div className="body__button-wrapper">
            <Button
              onClick={() => addItem()}
              variant="outline-primary"
              className="button-wrapper__add"
            >
              {t(
                'profile:right-content.cv.sections.computer.accordion.button-add'
              )}
            </Button>
          </div>
        </Col>
      </Row>
      {pcItems.map((edu) => (
        <Row key={edu.id} id={edu.id} className="body__item">
          {pcFields.map((item) => {
            if (item.type === 'smallText') {
              return (
                <Col lg={4} md={4} sm={6} key={item.key + edu.id}>
                  <Form.Group>
                    <CustomFormControl
                      id={item.key + edu.id}
                      value={
                        inputValues['ComputerSkiills'][edu.id]
                          ? inputValues['ComputerSkiills'][edu.id][item.key]
                          : ''
                      }
                      onChange={(event) =>
                        handleOnComputerSkills({
                          property: 'ComputerSkiills',
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
            if (item.type === 'selectExp') {
              return (
                <Col lg={4} md={4} sm={6} key={item.key + edu.id}>
                  <Form.Group>
                    <SelectInputSubmit
                      id={item.key + edu.id}
                      clearIds={clearIds}
                      value={item.options.filter(
                        (option) =>
                          option.value ===
                          inputValues['ComputerSkiills'][edu.id]
                            ?.expierienceGathered
                      )}
                      onChange={(event) => {
                        handleOnComputerSkills({
                          property: 'ComputerSkiills',
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
            if (item.type === 'selectYear') {
              return (
                <Col lg={4} md={4} sm={6} key={item.key + edu.id}>
                  <Form.Group>
                    <SelectInputSubmit
                      id={item.key + edu.id}
                      clearIds={clearIds}
                      value={item.options.filter(
                        (option) =>
                          option.value ===
                          inputValues['ComputerSkiills'][edu.id]
                            ?.yearExpierience
                      )}
                      onChange={(event) => {
                        handleOnComputerSkills({
                          property: 'ComputerSkiills',
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

            if (item.type === 'text') {
              return (
                <Col lg={11} md={11} sm={11} key={item.key + edu.id}>
                  <Form.Group>
                    <CustomFormControl
                      id={item.key + edu.id}
                      value={
                        inputValues['ComputerSkiills'][edu.id]
                          ? inputValues['ComputerSkiills'][edu.id][item.key]
                          : ''
                      }
                      onChange={(event) =>
                        handleOnComputerSkills({
                          property: 'ComputerSkiills',
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
              onClick={() => props.goNext('languageSkills')}
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
              onClick={() => props.goNext('transportationLicenses')}
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

export default ComputerSkills;
