import React, { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Container,
  Row,
  Col,
  Accordion,
  useAccordionToggle,
  AccordionContext,
} from 'react-bootstrap';
import { FaRegDotCircle } from 'react-icons/fa';
import questions from './questions';

function AccordionToggle({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <div
      className={`accordion__header ${isCurrentEventKey ? '--active' : ''} `}
      onClick={decoratedOnClick}
    >
      <div className="header__inner">
        {children}
        <FontAwesomeIcon
          icon={isCurrentEventKey ? 'minus' : 'plus'}
          className="header__icon"
        />
      </div>
    </div>
  );
}
const TermSection = (props) => {
  const { t } = props;

  const questions_accord = questions(t);

  return (
    <Container className="terms-container">
      <div className="terms-container__content">
        <div className="terms-container__content--box">
          <h3 className="terms-container__content--heading">Introduction</h3>

          <p className="terms-container__content--text">
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         `}
          </p>
        </div>

        <div className="terms-container__content--box">
          <h3 className="terms-container__content--heading">User Agreements</h3>

          <p className="terms-container__content--text">
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         `}
          </p>

          <p className="terms-container__content--text">
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         `}
          </p>

          <p className="terms-container__content--text">
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         `}
          </p>
        </div>

        <div className="terms-container__content--box">
          <h3 className="terms-container__content--heading">Restrictions</h3>

          <p className="terms-container__content--text">
            {`You are specifically restricted from all of the following :
         `}
          </p>

          <ul className="terms-container__content--retrictions">
            <li>
              <FaRegDotCircle /> Digital Marketing Solutions for Tomorrow
            </li>
            <li>
              <FaRegDotCircle /> Digital Marketing Solutions for Tomorrow
            </li>
            <li>
              <FaRegDotCircle /> Digital Marketing Solutions for Tomorrow
            </li>
            <li>
              <FaRegDotCircle /> Digital Marketing Solutions for Tomorrow
            </li>
            <li>
              <FaRegDotCircle /> Digital Marketing Solutions for Tomorrow
            </li>
            <li>
              <FaRegDotCircle /> Digital Marketing Solutions for Tomorrow
            </li>
          </ul>
        </div>

        <div className="terms-container__content--box">
          <h3 className="terms-container__content--heading">
            Users Question {'&'} Answer:
          </h3>
          <Row className="terms-container__content--faq__box">
            <Col lg={6} xl={6} md={6}>
              <Accordion className="section__accordion">
                {questions_accord.map((question) => (
                  <div className="accordion_inner">
                    <AccordionToggle eventKey={question.key}>
                      <h6>{question.header}</h6>
                    </AccordionToggle>
                    <Accordion.Collapse eventKey={question.key}>
                      <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <p>{question.answer}</p>
                        </Col>
                      </Row>
                    </Accordion.Collapse>
                  </div>
                ))}
              </Accordion>
            </Col>
            <Col lg={6} xl={6} md={6}>
              <div className="faq__img">
                <img src="/static/images/background/imageTerm.png" />
              </div>
            </Col>
          </Row>
        </div>

        <div className="terms-container__content--box">
          <h3 className="terms-container__content--heading">
            Still have a questions?
          </h3>
          <p className="terms-container__content--text">
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry.

         `}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default TermSection;
