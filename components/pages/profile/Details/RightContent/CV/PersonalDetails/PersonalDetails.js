import { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { CustomFormControl, SelectInputSubmit } from 'components/common';
import { HiOutlineUsers } from 'react-icons/hi';
import fields from './fields';
import Datetime from 'react-datetime';

const PersonalDetails = (props) => {
  const { t, handleOnChange, inputValues, personalDetail } = props;
  const inputFields = fields(t);
  const [isCVPublished, setIsCVPublished] = useState(inputValues.isPublished);

  useEffect(() => {
    let payload = { id: 'isPublished', value: isCVPublished };
    handleOnChange(payload);
  }, [isCVPublished]);

  useEffect(() => {}, []);

  return (
    <div className="wrapper__body ">
      <Row className="wrapper__body--header mb-4">
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="wrapper__body--heading__col"
        >
          <div>
            <HiOutlineUsers />{' '}
            {t('profile:right-content.cv.sections.personal-details.form.title')}
            {isCVPublished ? (
              <Button
                variant="success"
                className="header-wrapper__save btn-sm"
                onClick={() => setIsCVPublished(!isCVPublished)}
              >
                {t(
                  'profile:right-content.cv.sections.personal-details.form.cv-published'
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setIsCVPublished(!isCVPublished)}
                variant="outline-success"
                className="header-wrapper__save btn-sm"
              >
                {t(
                  'profile:right-content.cv.sections.personal-details.form.cv-hidden'
                )}
              </Button>
            )}
          </div>
        </Col>
      </Row>
      <Row className="body__item">
        {inputFields.map((item) => {
          if (item.type === 'text') {
            return (
              <Col xs={12} sm={12} md={6} lg={6} xl={6} key={item.key}>
                <Form.Group>
                  <CustomFormControl
                    id={item.key}
                    maxLength={'42'}
                    onChange={handleOnChange}
                    value={inputValues[item.key]}
                    type="text"
                    label={item.label}
                    className={'cv__field'}
                    autoComplete="current-text"
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'textFull') {
            return (
              <Col xs={12} sm={12} md={12} lg={12} xl={12} key={item.key}>
                <Form.Group>
                  <CustomFormControl
                    id={item.key}
                    onChange={handleOnChange}
                    value={inputValues[item.key]}
                    type="text"
                    valueLength={75 - inputValues[item.key]?.length}
                    maxLength={'75'}
                    label={item.label}
                    className={'cv__field'}
                    autoComplete="current-text"
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'select') {
            return (
              <Col lg={4} md={4} sm={6} key={item.key}>
                <Form.Group>
                  <SelectInputSubmit
                    id={item.key}
                    clearIds={[]}
                    value={item.options.filter(
                      (option) => option.value === inputValues[item.key]
                    )}
                    onChange={handleOnChange}
                    options={item.options}
                    placeholder={item.label}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'dateTime') {
            return (
              <Col
                lg={4}
                md={4}
                sm={12}
                key={item.key}
                className={'birthday_container'}
              >
                <Datetime
                  inputProps={{ className: 'datetime' }}
                  value={
                    inputValues[item.key] ||
                    (personalDetail?.birthDay &&
                      Date.parse(personalDetail[item.key]))
                  }
                  onChange={(e) =>
                    handleOnChange({ target: { value: e, id: item.key } })
                  }
                  timeFormat={false}
                  dateFormat={true}
                  renderInput={(props) => {
                    return (
                      <Form.Control
                        {...props}
                        id={item.key}
                        label={item.label}
                        placeholder={item.label}
                      />
                    );
                  }}
                />
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
                    onChange={handleOnChange}
                    value={inputValues[item.key]}
                    type="text"
                    valueLength={2000 - inputValues[item.key]?.length}
                    maxLength={'2000'}
                    style={{ resize: 'vertical', height: 'auto' }}
                    label={item.label}
                    autoComplete="current-text"
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'location') {
            return (
              <Col xs={12} sm={12} md={4} lg={4} xl={4} key={item.key}>
                <Form.Group>
                  <CustomFormControl
                    id={item.key}
                    onChange={handleOnChange}
                    value={inputValues[item.key]}
                    type="text"
                    label={item.label}
                    autoComplete="current-text"
                  />
                </Form.Group>
              </Col>
            );
          }
        })}
      </Row>
      <Row className="wrapper__body--footer">
        <Col lg={12} className="wrapper__body--footer__right">
          <div className="footer__button-wrapper">
            <Button
              onClick={() => props.goNext('education')}
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

export default PersonalDetails;
