import { useContext } from 'react';
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
    sectionHeading,
    sectionHeadingTip,
    heading,
  } = props;
  const fieldsInput = fields(t);

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
