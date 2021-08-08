import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { CustomFormControl, SelectInputSubmit } from 'components/common';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { HiOutlineUsers } from 'react-icons/hi';
import fields from './fields';

const LanguageSkills = (props) => {
  const { t, lanItems, setLanItems, inputValues, handleOnLanguageSkills } =
    props;
  const langFields = fields(t);

  const addItem = () => {
    if (lanItems.length >= 10) return;
    let addItems = [];
    for (let i = 0; i <= lanItems.length; i++) {
      addItems.push({ id: i });
    }
    setLanItems(addItems);
  };

  const removeItem = (id) => {
    if (lanItems.length == 1) return;
    setLanItems(() => {
      let removeItems = [];
      for (let i = 0; i < lanItems.length - 1; i++) {
        removeItems.push({ id: i });
      }
      return removeItems;
    });

    handleOnLanguageSkills({
      remove: true,
      id,
      property: 'LanguageSkiills',
    });
  };

  return (
    <div className="wrapper__body">
      <Row className="wrapper__body--header ">
        <Col lg={6} className="wrapper__body--heading__col">
          <div>
            <HiOutlineUsers />{' '}
            {t('profile:right-content.cv.sections.languages.title')}
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
                'profile:right-content.cv.sections.languages.accordion.button-add'
              )}
            </Button>
          </div>
        </Col>
      </Row>
      {lanItems.map((edu) => (
        <Row key={edu.id} id={edu.id} className="body__item">
          {langFields.map((item) => {
            if (item.type === 'smallText') {
              return (
                <Col lg={8} md={8} sm={8} key={item.key + edu.id}>
                  <Form.Group>
                    <CustomFormControl
                      id={item.key + edu.id}
                      value={
                        inputValues['LanguageSkiills'][edu.id]
                          ? inputValues['LanguageSkiills'][edu.id][item.key]
                          : ''
                      }
                      onChange={(event) =>
                        handleOnLanguageSkills({
                          property: 'LanguageSkiills',
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
                      maxLength={'42'}
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
                <Col lg={11} md={11} sm={11} key={item.key + edu.id}>
                  <Form.Group>
                    <CustomFormControl
                      id={item.key + edu.id}
                      value={
                        inputValues['LanguageSkiills'][edu.id]
                          ? inputValues['LanguageSkiills'][edu.id][item.key]
                          : ''
                      }
                      onChange={(event) =>
                        handleOnLanguageSkills({
                          property: 'LanguageSkiills',
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
            if (item.type === 'select') {
              return (
                <Col lg={4} md={4} sm={4} key={item.key + edu.id}>
                  <Form.Group>
                    <SelectInputSubmit
                      id={item.key + edu.id}
                      clearIds={[]}
                      value={item.options.filter(
                        (option) =>
                          option.value ===
                          inputValues['LanguageSkiills'][edu.id]?.level
                      )}
                      onChange={(event) => {
                        handleOnLanguageSkills({
                          property: 'LanguageSkiills',
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
              onClick={() => props.goNext('Languages')}
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
              onClick={() => props.goNext('computerSkills')}
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
export default LanguageSkills;
