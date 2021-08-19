import React, { useContext } from 'react';
import { withTranslation } from 'i18n';
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
          <h3 className="terms-container__content--heading">
            {t('terms:header')}
          </h3>

          <p className="terms-container__content--text">
            {t('terms:introduction.first')}
          </p>
          <p className="terms-container__content--text">
            {t('terms:introduction.second')}
          </p>
        </div>

        <div className="terms-container__content--box">
          <h3 className="terms-container__content--heading">
            {t('terms:user-aggrements.title')}
          </h3>
          {t('terms:user-aggrements.intro')}
          <ul className="terms-container__content--retrictions">
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-one')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-two')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-three')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-four.rule')}
              </p>
              <ol>
                <li>
                  {' '}
                  {t('terms:user-aggrements.rules.rule-four.point-one')}{' '}
                </li>
                <li>
                  {' '}
                  {t('terms:user-aggrements.rules.rule-four.point-two')}{' '}
                </li>
                <li>
                  {' '}
                  {t('terms:user-aggrements.rules.rule-four.point-three')}{' '}
                </li>
                <li>
                  {' '}
                  {t('terms:user-aggrements.rules.rule-four.point-four')}{' '}
                </li>
              </ol>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-five')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-six')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-seven')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-eight')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-nine')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-ten')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-eleven')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-twele')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:user-aggrements.rules.rule-thriteen')}
              </p>
            </li>
          </ul>
        </div>

        <div className="terms-container__content--box">
          <h3 className="terms-container__content--heading">
            {t('terms:privacy-policy.title')}
          </h3>
          {t('terms:privacy-policy.intro')}
          <ul className="terms-container__content--retrictions">
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:privacy-policy.rules.rule-one')}
              </p>
            </li>

            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:privacy-policy.rules.rule-two')}
              </p>
            </li>

            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:privacy-policy.rules.rule-three')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:privacy-policy.rules.rule-four')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:privacy-policy.rules.rule-five')}
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                {t('terms:privacy-policy.rules.rule-six')}
              </p>
            </li>
          </ul>
        </div>

        <div className="terms-container__content--box">
          <h3 className="terms-container__content--heading"></h3>
          <Row className="terms-container__content--faq__box">
            <Col lg={6} xl={6} md={6}>
              <Accordion className="section__accordion">
                {questions_accord.map((question) => (
                  <div key={question.key} className="accordion_inner">
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
                <img src="https://placifull-static.s3.eu-central-1.amazonaws.com/imageTerm.webp" />
              </div>
            </Col>
          </Row>
        </div>

        <div className="terms-container__content--box">
          <h3 className="terms-container__content--heading">
            {t('terms:end.title')}
          </h3>
          <p className="terms-container__content--text">
            {t('terms:end.goodbye-text')}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default withTranslation('terms')(TermSection);
