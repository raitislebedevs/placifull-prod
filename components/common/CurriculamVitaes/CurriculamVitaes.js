import { Row, Col, Button } from 'react-bootstrap';
import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import { FaCircle } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { IoMaleFemaleOutline, IoLocationOutline } from 'react-icons/io5';
import { AiOutlineMail, AiOutlineCalendar } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import Rating from 'react-rating';
import { formatMonth, formatNumber } from 'utils/standaloneFunctions';
import { useEffect, useState } from 'react';
import guidGenerator from 'utils/guidGenerator';
import Container from 'node_modules/react-bootstrap/esm/Container';
import { CurrencyServices } from 'services';
import * as React from 'react';

const CurriculamVitaes = (props) => {
  const { t, curriculamVitaes, setShowCv, currency, tReady } = props;
  const [cvCurrency, setCvCurrency] = useState('');

  const {
    PersonalDetails,
    LanguageSkiills,
    TransportLicenses,
    WorkExpectations,
    WorkExpierience,
    EducationHistory,
    ComputerSkiills,
  } = curriculamVitaes;

  const getRatingValue = (level) => {
    switch (level) {
      case 'a1':
        return 1;
      case 'a2':
        return 2;
      case 'b1':
        return 3;
      case 'b2':
        return 4;
      case 'c1':
        return 5;
      case 'c2':
        return 6;
      case 'native':
        return 7;
      default:
        return 0;
    }
  };

  const handleInitialValue = async () => {
    let filter = { id: currency };
    let { data, error } = await CurrencyServices.FIND(filter);
    if (data) {
      setCvCurrency(data[0]?.symbol_native);
    }
  };

  useEffect(() => {
    if (currency?.length >= 1) {
      return handleInitialValue();
    }

    setCvCurrency(currency);
  }, [currency]);

  useEffect(() => {
    WorkExpierience?.sort((a, b) => {
      let dateA = new Date(a.fromDate),
        dateB = new Date(b.fromDate);
      return dateB - dateA;
    }),
      EducationHistory?.sort((a, b) => {
        let dateA = new Date(a.fromYear),
          dateB = new Date(b.fromYear);
        return dateB - dateA;
      });
  }, []);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="xl"
      keyboard={false}
      className="preview__cv__container"
    >
      <div className={'close_button_container'}>
        <Container>
          <Row>
            <Col
              className="preview__cv__intro"
              lg={4}
              xl={4}
              md={12}
              sm={12}
              xs={12}
            >
              <div className={'cv__name'}>
                {PersonalDetails?.cvFirstName} {PersonalDetails?.cvLasttName}
              </div>
              <div className={'cv__role'}>{PersonalDetails?.cvProfession}</div>
              <div className={'contact__seperator'}> </div>
              <div className={'cv__personal__info'}>
                <AiOutlineMail className={'cv__icon'} />{' '}
                <span> {PersonalDetails?.cvPersonalEmail}</span>
              </div>
              <div className={'cv__personal__info'}>
                <FiPhone className={'cv__icon'} />{' '}
                <span> {PersonalDetails?.cvPhoneNumber}</span>
              </div>
              <div className={'cv__personal__info'}>
                <AiOutlineCalendar className={'cv__icon'} />{' '}
                <span> {PersonalDetails?.birthDay}</span>
              </div>
              <div className={'cv__personal__info'}>
                <IoMaleFemaleOutline className={'cv__icon'} />{' '}
                <span>{t(`cv:gender.${PersonalDetails?.gender}`)} </span>
              </div>
              <div className={'cv__personal__info'}>
                <IoLocationOutline className={'cv__icon'} />{' '}
                <span>
                  {`${PersonalDetails?.country}, ${PersonalDetails?.state}, ${PersonalDetails?.city}`}
                </span>
              </div>
              <div className={'cv__section'}>
                <div className={'section__header'}>
                  {t('cv:labels.about-me')}
                </div>
                <div className={'section__body'}>
                  {PersonalDetails?.aboutMe}
                </div>
              </div>
              <div className={'cv__section'}>
                <div className={'section__header'}>
                  {t('cv:labels.languages')}
                </div>
                <div className={'section__body'}>
                  {LanguageSkiills?.map((item) => {
                    return (
                      <div className={'item__container'} key={guidGenerator()}>
                        <span>{item?.languageName}</span>
                        <span className={'cv__ratings'}>
                          <Rating
                            stop={7}
                            initialRating={getRatingValue(item?.level)}
                            className="real-estate-item-card__ratings"
                            readonly
                            fullSymbol={<FaCircle className={'full__circle'} />}
                            emptySymbol={
                              <FaCircle className={'empty__circle'} />
                            }
                          />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={'cv__section'}>
                <div className={'section__header'}>
                  {t('cv:labels.computer-skills')}
                </div>
                <div className={'section__body'}>
                  {ComputerSkiills?.map((item) => {
                    return (
                      <div className={'item__container'} key={guidGenerator()}>
                        <span>{item?.skill}:</span>
                        <span className={'cv__ratings'}>
                          {t(`cv:expierience.${item?.yearExpierience}`)} {', '}{' '}
                          {t(
                            `cv:knowladge-gained.${item?.expierienceGathered}`
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col
              className="preview__cv__detail"
              lg={8}
              xl={8}
              md={12}
              sm={12}
              xs={12}
            >
              {EducationHistory?.length > 0 && (
                <div className="detail__section" key={guidGenerator()}>
                  <div className="detail__header">
                    {t('cv:labels.education')}
                  </div>
                  <div className="body__section">
                    {EducationHistory?.map((item) => {
                      return (
                        <div key={guidGenerator()}>
                          <div className="body__header">
                            {' '}
                            {item?.studyArea},{' '}
                            {t(`cv:qualification.${item?.qualification}`)}{' '}
                          </div>
                          <Row className="body__content">
                            <Col className="left__content">
                              {item?.schoolName}
                            </Col>
                            <Col className="right__content">
                              <div className="center">
                                {t(`cv:avarage-grade`)}:
                                {` ${item?.avarageGrade}`}
                              </div>
                              <div className="center">
                                {item?.fromYear &&
                                  formatMonth(item?.fromYear, t)}{' '}
                                -{' '}
                                {item?.toYear
                                  ? formatMonth(item?.toYear, t)
                                  : t(`cv:present`)}
                              </div>
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {WorkExpierience?.length > 0 && (
                <div className="detail__section" key={guidGenerator()}>
                  <div className="detail__header">
                    {t('cv:labels.expierience')}
                  </div>
                  <div className="body__section">
                    {WorkExpierience?.map((item) => {
                      return (
                        <div key={guidGenerator()}>
                          <div className="body__header">
                            {' '}
                            {item?.companyName}
                          </div>
                          <Row className="body__content">
                            <Col className="left__content">
                              {' '}
                              {item?.positionName}
                            </Col>
                            <Col className="right__content">
                              <div className="center">
                                {' '}
                                {item?.fromDate &&
                                  formatMonth(item?.fromDate, t)}{' '}
                                -{' '}
                                {item?.toDate
                                  ? formatMonth(item?.toDate, t)
                                  : t(`cv:present`)}
                              </div>
                            </Col>
                          </Row>
                          <Row className={'content__description'}>
                            {item?.positionDescription}
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {TransportLicenses?.length > 0 && (
                <div className="detail__section" key={guidGenerator()}>
                  <div className="detail__header">
                    {t('cv:labels.licenses')}
                  </div>
                  <div className="body__section">
                    {TransportLicenses?.map((item) => {
                      return (
                        <div key={guidGenerator()}>
                          <div className="body__header">
                            {item?.issueCountry}
                          </div>
                          <Row className="body__content">
                            <Col className="left__content">
                              {t(`cv:license-category`)}: {item?.licence}
                            </Col>
                            <Col className="right__content">
                              <div className="center">
                                {t(`cv:expierience.${item?.yearExpierience}`)}{' '}
                                {t(`cv:expierience.label`)}{' '}
                              </div>
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {WorkExpectations?.length > 0 && (
                <div className="detail__section" key={guidGenerator()}>
                  <div className="detail__header">
                    {t('cv:labels.expectations')}
                  </div>
                  <div className="body__section">
                    {WorkExpectations?.map((item) => {
                      return (
                        <div key={guidGenerator()}>
                          {' '}
                          <div className="body__header"> {item?.position}</div>
                          <Row className="body__content">
                            <Col className="left__content">
                              <div>
                                {t(
                                  `job-common:work-area.options.${item?.vacancyOption}`
                                )}
                              </div>
                            </Col>
                            <Col className="right__content">
                              {item?.hourlyRate && (
                                <div className="center">
                                  {t(`job-common:salary.hourly-rate-from`)}:{' '}
                                  {`${cvCurrency} `}
                                  {formatNumber(item.hourlyRate)}
                                </div>
                              )}
                              {item?.monthly && (
                                <div className="center">
                                  {t(`job-common:salary.monthly-from`)}:{' '}
                                  {`${cvCurrency} `}
                                  {formatNumber(item.monthly)}
                                </div>
                              )}
                              {item?.yearly && (
                                <div className="center">
                                  {t(`job-common:salary.annual-from`)}:{' '}
                                  {`${cvCurrency} `}
                                  {formatNumber(item.yearly)}
                                </div>
                              )}
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
        <div className={'cv_close_button'}>
          <Button onClick={() => setShowCv(false)}>X</Button>
        </div>
      </div>
    </Modal>
  );
};

// CurriculamVitaes.getInitialProps = async () => ({
//   namespacesRequired: ['job-common', 'cv', 'common'],
// });

// CurriculamVitaes.propTypes = {
//   t: PropTypes.func.isRequired,
// };

export default withTranslation(['job-common', 'cv', 'common'])(
  CurriculamVitaes
);
