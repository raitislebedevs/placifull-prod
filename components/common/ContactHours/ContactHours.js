import { useContext, useEffect } from 'react';
import {
  Form,
  Row,
  Col,
  Accordion,
  useAccordionToggle,
  AccordionContext,
} from 'react-bootstrap';
import { SectionHeading } from 'components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fields from './fields';

function AccordionToggle({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <div className="accordion__header" onClick={decoratedOnClick}>
      <div className="header__left">
        <FontAwesomeIcon icon={['far', 'clock']} className="left__icon" />
        {children}
      </div>
      <FontAwesomeIcon
        icon={isCurrentEventKey ? 'minus' : 'plus'}
        className="header__icon"
      />
    </div>
  );
}

const ContactHours = (props) => {
  const {
    t,
    handleOnChange,
    prefix,
    setInputValues,
    inputValues,
    sectionHeading,
    initialItem,
    sectionHeadingTip,
    heading,
  } = props;
  const fieldsInput = fields(t);

  useEffect(() => {
    if (inputValues?.jobContactTimes === 'officeHours') {
      setInputValues({
        ...inputValues,
        monday_open: '09:00',
        monday_close: '18:00',
        tuesday_open: '09:00',
        tuesday_close: '18:00',
        wednesday_open: '09:00',
        wednesday_close: '18:00',
        thursday_open: '09:00',
        thursday_close: '18:00',
        friday_open: '09:00',
        friday_close: '18:00',
        saturday_open: '',
        saturday_close: '',
        sunday_open: '',
        sunday_close: '',
      });
      return;
    }

    if (inputValues?.contactTimes === 'workingDays') {
      setInputValues({
        ...inputValues,
        monday_open: '09:00',
        monday_close: '20:00',
        tuesday_open: '09:00',
        tuesday_close: '20:00',
        wednesday_open: '09:00',
        wednesday_close: '20:00',
        thursday_open: '09:00',
        thursday_close: '20:00',
        friday_open: '09:00',
        friday_close: '20:00',
        saturday_open: '',
        saturday_close: '',
        sunday_open: '',
        sunday_close: '',
      });
      return;
    }

    if (inputValues?.contactTimes === 'anyTime') {
      setInputValues({
        ...inputValues,
        monday_open: '09:00',
        monday_close: '21:00',
        tuesday_open: '09:00',
        tuesday_close: '21:00',
        wednesday_open: '09:00',
        wednesday_close: '21:00',
        thursday_open: '09:00',
        thursday_close: '21:00',
        friday_open: '09:00',
        friday_close: '21:00',
        saturday_open: '09:00',
        saturday_close: '21:00',
        sunday_open: '09:00',
        sunday_close: '21:00',
      });
      return;
    }

    setInputValues({
      ...inputValues,
      monday_open: '',
      monday_close: '',
      tuesday_open: '',
      tuesday_close: '',
      wednesday_open: '',
      wednesday_close: '',
      thursday_open: '',
      thursday_close: '',
      friday_open: '',
      friday_close: '',
      saturday_open: '',
      saturday_close: '',
      sunday_open: '',
      sunday_close: '',
    });
  }, [inputValues?.contactTimes]);

  useEffect(() => {
    if (inputValues?.transportContactTime === 'officeHours') {
      setInputValues({
        ...inputValues,
        transportmonday_open: '09:00',
        transportmonday_close: '18:00',
        transporttuesday_open: '09:00',
        transporttuesday_close: '18:00',
        transportwednesday_open: '09:00',
        transportwednesday_close: '18:00',
        transportthursday_open: '09:00',
        transportthursday_close: '18:00',
        transportfriday_open: '09:00',
        transportfriday_close: '18:00',
        transportsaturday_open: '',
        transportsaturday_close: '',
        transportsunday_open: '',
        transportsunday_close: '',
      });
      return;
    }

    if (inputValues?.transportContactTime === 'workingDays') {
      setInputValues({
        ...inputValues,
        transportmonday_open: '09:00',
        transportmonday_close: '20:00',
        transporttuesday_open: '09:00',
        transporttuesday_close: '20:00',
        transportwednesday_open: '09:00',
        transportwednesday_close: '20:00',
        transportthursday_open: '09:00',
        transportthursday_close: '20:00',
        transportfriday_open: '09:00',
        transportfriday_close: '20:00',
        transportsaturday_open: '',
        transportsaturday_close: '',
        transportsunday_open: '',
        transportsunday_close: '',
      });
      return;
    }

    if (inputValues?.transportContactTime === 'anyTime') {
      setInputValues({
        ...inputValues,
        transportmonday_open: '09:00',
        transportmonday_close: '21:00',
        transporttuesday_open: '09:00',
        transporttuesday_close: '21:00',
        transportwednesday_open: '09:00',
        transportwednesday_close: '21:00',
        transportthursday_open: '09:00',
        transportthursday_close: '21:00',
        transportfriday_open: '09:00',
        transportfriday_close: '21:00',
        transportsaturday_open: '09:00',
        transportsaturday_close: '21:00',
        transportsunday_open: '09:00',
        transportsunday_close: '21:00',
      });
      return;
    }

    setInputValues({
      ...inputValues,
      transportmonday_open: '',
      transportmonday_close: '',
      transporttuesday_open: '',
      transporttuesday_close: '',
      transportwednesday_open: '',
      transportwednesday_close: '',
      transportthursday_open: '',
      transportthursday_close: '',
      transportfriday_open: '',
      transportfriday_close: '',
      transportsaturday_open: '',
      transportsaturday_close: '',
      transportsunday_open: '',
      transportsunday_close: '',
    });
  }, [inputValues?.transportContactTime]);

  useEffect(() => {
    if (inputValues?.jobContactTimes === 'officeHours') {
      setInputValues({
        ...inputValues,
        jobmonday_open: '09:00',
        jobmonday_close: '18:00',
        jobtuesday_open: '09:00',
        jobtuesday_close: '18:00',
        jobwednesday_open: '09:00',
        jobwednesday_close: '18:00',
        jobthursday_open: '09:00',
        jobthursday_close: '18:00',
        jobfriday_open: '09:00',
        jobfriday_close: '18:00',
        jobsaturday_open: '',
        jobsaturday_close: '',
        jobsunday_open: '',
        jobsunday_close: '',
      });
      return;
    }

    if (inputValues?.jobContactTimes === 'workingDays') {
      setInputValues({
        ...inputValues,
        jobmonday_open: '09:00',
        jobmonday_close: '20:00',
        jobtuesday_open: '09:00',
        jobtuesday_close: '20:00',
        jobwednesday_open: '09:00',
        jobwednesday_close: '20:00',
        jobthursday_open: '09:00',
        jobthursday_close: '20:00',
        jobfriday_open: '09:00',
        jobfriday_close: '20:00',
        jobsaturday_open: '',
        jobsaturday_close: '',
        jobsunday_open: '',
        jobsunday_close: '',
      });
      return;
    }

    if (inputValues?.jobContactTimes === 'anyTime') {
      setInputValues({
        ...inputValues,
        jobmonday_open: '09:00',
        jobmonday_close: '21:00',
        jobtuesday_open: '09:00',
        jobtuesday_close: '21:00',
        jobwednesday_open: '09:00',
        jobwednesday_close: '21:00',
        jobthursday_open: '09:00',
        jobthursday_close: '21:00',
        jobfriday_open: '09:00',
        jobfriday_close: '21:00',
        jobsaturday_open: '09:00',
        jobsaturday_close: '21:00',
        jobsunday_open: '09:00',
        jobsunday_close: '21:00',
      });
      return;
    }

    setInputValues({
      ...inputValues,
      jobmonday_open: '',
      jobmonday_close: '',
      jobtuesday_open: '',
      jobtuesday_close: '',
      jobwednesday_open: '',
      jobwednesday_close: '',
      jobthursday_open: '',
      jobthursday_close: '',
      jobfriday_open: '',
      jobfriday_close: '',
      jobsaturday_open: '',
      jobsaturday_close: '',
      jobsunday_open: '',
      jobsunday_close: '',
    });
  }, [inputValues?.jobContactTimes]);

  return (
    <div className="form__section contactHour__section">
      <SectionHeading>
        <>
          {sectionHeading}{' '}
          <span className="section__heading-tip">({sectionHeadingTip})</span>
        </>
      </SectionHeading>
      <Accordion className="section__accordion">
        <AccordionToggle eventKey={1}>{heading}</AccordionToggle>
        <Accordion.Collapse eventKey={1}>
          <>
            {fieldsInput.map((section) => (
              <Row key={prefix + section.key}>
                <Col lg={4} md={4} sm={4} xs={12}>
                  <div className="accordion__day-label">{section.label}</div>
                </Col>
                {section.options.map((item) => (
                  <Col lg={4} md={4} sm={4} xs={6} key={prefix + item.key}>
                    <Form.Group>
                      <Form.Control
                        onChange={handleOnChange}
                        className="form__input"
                        id={prefix + item.key}
                        type="time"
                        value={inputValues[prefix + item.key]}
                        label={item.placeholder}
                        placeholder={item.placeholder}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            ))}
          </>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
};

export default ContactHours;
