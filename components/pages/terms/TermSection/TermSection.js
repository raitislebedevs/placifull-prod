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
                The content of the pages of this website is for your general
                information and use only. It is subject to change without
                notice.
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                Neither we nor any third parties provide any warranty or
                guarantee as to the accuracy, timeliness, performance,
                completeness or suitability of the information and materials
                found or offered on this website for any particular purpose. You
                acknowledge that such information and materials may contain
                inaccuracies or errors and we expressly exclude liability for
                any such inaccuracies or errors to the fullest extent permitted
                by Latvian law.
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                Your use of any information or materials on this website is
                entirely at your own risk, for which we shall not be liable. It
                shall be your own responsibility to ensure that any products,
                services or information available through this website meet your
                specific requirements.
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                Unauthorised use of this website may give rise to a claim for
                damages and/or be a criminal offence.
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                From time to time this website may also include links to other
                websites. These links are provided for your convenience to
                provide further information. They do not signify that we endorse
                the website(s). We have no responsibility for the content of the
                linked website(s).
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                By publishing your CV you are allowing anyone to view these
                details. If by any chance these are
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                Support will be provided only in English and/or Latvian. If you
                contact us in any other language we won't respond.
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                User is prohibited to contact us in a hustile and threatening
                manner. Any communication will be instantly stopped and customer
                won't be helped if any problems were expierienced.
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                Main communication language is English/Latvian. All other
                Languages are just for the user convienience and should not be
                used when communcating with Placifull.
              </p>
            </li>
            <li>
              <p className="terms-container__content--text">
                <FaRegDotCircle />
                Your use of this website and any dispute arising out of such use
                of the website is subject to the laws of Latvia
              </p>
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
            {`Please contact us from the contact page, and we will get back to you as soon as possible. In short we want to do what ever we can to make this site better
         `}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default withTranslation('terms')(TermSection);
