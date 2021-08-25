import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import tabFields from './tabFields';
import Education from './Education';
import PersonalDetails from './PersonalDetails';
import WorkExperience from './WorkExperience';
import LanguageSkills from './LanguageSkills';
import ComputerSkills from './ComputerSkills';
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import TransportationLicense from './TransportationLicense';
import WorkExpectations from './WorkExpectations';
import { RiSaveLine } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { CurriculumVitaesService } from 'services';
import { CurriculamVitaes, CurrencyInput } from 'components/common';
import { useRouter } from 'next/router';

const CV = (props) => {
  const { t, user, isSmall } = props;
  const router = useRouter();
  const [active, setActive] = useState('personalDetails');
  const [curriculumVitaes, setCurriculumVitaes] = useState(
    user.curriculumVitae
  );
  // CV component states
  const [education, setEducation] = useState([]);
  const [items, setItems] = useState([
    {
      id: 0,
    },
  ]);
  const [expierience, setExpierience] = useState([]);
  const [expItems, setExpItems] = useState([
    {
      id: 0,
    },
  ]);
  const [languages, setLanguages] = useState([]);
  const [lanItems, setLanItems] = useState([
    {
      id: 0,
    },
  ]);

  const [pcSkills, setPcSkills] = useState([]);
  const [pcItems, setPcItems] = useState([
    {
      id: 0,
    },
  ]);

  const [transportLicense, setTransportLicense] = useState([]);
  const [licenseItems, setLicenseItems] = useState([
    {
      id: 0,
    },
  ]);

  const [expectation, setExpectation] = useState([]);
  const [workExpItems, setWorkExpItems] = useState([
    {
      id: 0,
    },
  ]);

  //Action State
  const [cvModal, setCvModal] = useState(false);

  const tabFieldInput = tabFields(t);
  //Initilizing values
  const personalDetail = curriculumVitaes?.PersonalDetails;
  const educationDetail = curriculumVitaes?.EducationHistory;
  const workExpierience = curriculumVitaes?.WorkExpierience;
  const languageSkills = curriculumVitaes?.LanguageSkiills;
  const computerSkills = curriculumVitaes?.ComputerSkiills;
  const transportLicenses = curriculumVitaes?.TransportLicenses;
  const workExpectations = curriculumVitaes?.WorkExpectations;
  const published = curriculumVitaes?.published;

  const [saveCv, setsaveCv] = useState(false);
  const [submitCurrency, setsubmitCurrency] = useState();
  const [inputValues, setInputValues] = useState({
    cvFirstName: personalDetail?.cvFirstName || '',
    cvLasttName: personalDetail?.cvLasttName || '',
    cvPhoneNumber: personalDetail?.cvPhoneNumber || '',
    aboutMe: personalDetail?.aboutMe || '',
    cvPersonalEmail: personalDetail?.cvPersonalEmail || '',
    cvProfession: personalDetail?.cvProfession || '',
    country: personalDetail?.country || '',
    state: personalDetail?.state || '',
    city: personalDetail?.city || '',
    birthDay: personalDetail?.birthDay || '',
    gender: personalDetail?.gender || '',
    showAge: personalDetail?.showAge || '',
    isPublished: published || false,
    //Array Components
    EducationHistory: educationDetail || [],
    WorkExpierience: workExpierience || [],
    LanguageSkiills: languageSkills || [],
    ComputerSkiills: computerSkills || [],
    TransportLicenses: transportLicenses || [],
    WorkExpectations: workExpectations || [],
  });

  const getcv = async (id) => {
    try {
      const { data, error } = await CurriculumVitaesService.GET(id);
      if (data) {
        setCurriculumVitaes(data);
      }
    } catch (error) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('error:profile.cv-notfound')
      );
    }
  };

  useEffect(() => {
    getcv(user?.curriculumVitae?.id);
    CvProperties(educationDetail, setEducation, setItems);
    CvProperties(workExpierience, setExpierience, setExpItems);
    CvProperties(languageSkills, setLanguages, setLanItems);
    CvProperties(computerSkills, setPcSkills, setPcItems);
    CvProperties(transportLicenses, setTransportLicense, setLicenseItems);
    CvProperties(workExpectations, setExpectation, setWorkExpItems);
  }, []);

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const CvProperties = (property, setProperty, setState) => {
    if (property?.length) {
      setProperty(property);
      let initItems = [];
      for (let i = 0; i < property.length; i++) {
        initItems.push({ id: i });
      }
      setState(initItems);
    }
  };

  const handleCvPropertyUpdate = (event, element, setState) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    const eventId = event?.property;
    const index = event?.index;

    if (event?.remove) {
      let elements = [...element];
      elements[id] = {};
      elements.splice(id, 1);
      setState(elements);
      setInputValues({ ...inputValues, [eventId]: elements });

      return;
    }

    let elements = [...element];
    let item = { ...elements[index], [id]: value };
    elements[index] = item;
    setState(elements);
    setInputValues({ ...inputValues, [eventId]: elements });
  };

  const handleOnEducationHistory = (event) => {
    handleCvPropertyUpdate(event, education, setEducation);
  };

  const handleOnWorkExpierience = (event) => {
    handleCvPropertyUpdate(event, expierience, setExpierience);
  };

  const handleOnLanguageSkills = (event) => {
    handleCvPropertyUpdate(event, languages, setLanguages);
  };

  const handleOnComputerSkills = (event) => {
    handleCvPropertyUpdate(event, pcSkills, setPcSkills);
  };

  const handleOnTransportLicenses = (event) => {
    handleCvPropertyUpdate(event, transportLicense, setTransportLicense);
  };

  const handleOnWorkExpectations = (event) => {
    handleCvPropertyUpdate(event, expectation, setExpectation);
  };

  const onQualificationChange = (event) => {
    const eventId = event?.property;
    const index = event?.index;
    var qualification = [];

    event?.value.forEach((element) => {
      qualification.push({
        id: element?.id,
        label: element?.label,
        value: element?.value,
      });
    });

    handleOnEducationHistory({
      target: {
        id: event.value[0]?.id || 'qualificationArea',
        value: qualification,
      },
      property: eventId,
      index: index,
    });
  };

  const getPayload = () => {
    let payload = {
      currency: inputValues?.currency || null,
      PersonalDetails: {
        cvFirstName: inputValues?.cvFirstName || null,
        cvLasttName: inputValues?.cvLasttName || null,
        cvPhoneNumber: inputValues?.cvPhoneNumber || null,
        cvProfession: inputValues?.cvProfession || null,
        aboutMe: inputValues?.aboutMe || null,
        cvPersonalEmail: inputValues?.cvPersonalEmail || null,
        country: inputValues?.country || null,
        state: inputValues?.state || null,
        city: inputValues?.city || null,
        birthDay: inputValues?.birthDay || null,
        gender: inputValues?.gender || null,
        showAge: inputValues?.showAge || null,
        published: inputValues?.isPublished || false,
      },
      LanguageSkiills: inputValues?.LanguageSkiills || null,
      WorkExpierience: inputValues?.WorkExpierience || null,
      EducationHistory: inputValues?.EducationHistory || null,
      ComputerSkiills: inputValues?.ComputerSkiills || null,
      TransportLicenses: inputValues?.TransportLicenses || null,
      WorkExpectations: inputValues?.WorkExpectations || null,
      published: inputValues?.isPublished || false,
    };

    return payload;
  };

  const handleCvUpdates = async () => {
    setsaveCv(true);
    try {
      let payload = getPayload();
      const { data } = await CurriculumVitaesService.UPDATE_ME(payload);
      if (data) {
        TostifyCustomContainer(
          'success',
          t('common:toast.messages.success'),
          t('profile:toast.succes')
        );
        setTimeout(() => {
          router.reload(window.location.pathname);
        }, 500);
      }
    } catch (error) {
      TostifyCustomContainer('error', t('common:toast.messages.error'), error);
    }
    setsaveCv(false);
  };

  return (
    <div className="right-content__cv">
      <Row>
        <Col lg={5} xl={5} md={7} sm={12} xs={12} className="cv__heading">
          {t('profile:right-content.cv.title')}
        </Col>
        <Col
          xl={4}
          lg={4}
          md={6}
          sm={12}
          xs={12}
          className="preview-cv__container"
        >
          <div onClick={() => setCvModal(true)} className="preview__cv">
            <FaEye /> {t('profile:overview.button-label.preview')}
          </div>
        </Col>
        <Col lg={3} md={6} sm={6} xs={6}>
          <Form.Group>
            <CurrencyInput
              handleOnChange={handleOnChange}
              initialSelect={user.curriculumVitae?.currency}
              setCurrency={setsubmitCurrency}
              placeholder={t('common:currency.currency-label')}
              currencyId={'currency'}
            />
          </Form.Group>
        </Col>
        {isSmall && (
          <Col lg={3} md={6} sm={6} xs={6}>
            {saveCv ? (
              <div className="save__all__button">
                <RiSaveLine />{' '}
                <Spinner
                  as="span"
                  animation="border"
                  variant="danger"
                  size="sm"
                  role="status"
                />
              </div>
            ) : (
              <div
                onClick={() => handleCvUpdates()}
                className="save__all__button"
              >
                <RiSaveLine /> {t('profile:overview.button-label.save-all')}
              </div>
            )}
          </Col>
        )}
      </Row>
      {!isSmall && (
        <Row className="right-content__cv--header">
          {tabFieldInput.map((item) => {
            return (
              <Col
                lg={3}
                xl={3}
                md={4}
                sm={6}
                xs={12}
                className={`cv__section-wrapper ${
                  active == item.key ? '--active' : ''
                }`}
                onClick={() => setActive(item.key)}
                key={item.key}
              >
                <div className="section-wrapper__accordion-container">
                  <div className="accordion-container__wrapper">
                    <div>{item.header}</div>
                  </div>
                </div>
              </Col>
            );
          })}

          <Col lg={3} xl={3} md={4} sm={6} xs={12}>
            {saveCv ? (
              <div className="save__all__button">
                <RiSaveLine />{' '}
                <Spinner
                  as="span"
                  animation="border"
                  variant="danger"
                  size="sm"
                  role="status"
                />
              </div>
            ) : (
              <>
                <div
                  onClick={() => handleCvUpdates()}
                  className="save__all__button"
                >
                  <RiSaveLine /> {t('profile:overview.button-label.save-all')}
                </div>
              </>
            )}
          </Col>
        </Row>
      )}

      <Row className="right-content__cv--body">
        {active == 'personalDetails' ? (
          <PersonalDetails
            t={t}
            saveCv={saveCv}
            setsaveCv={setsaveCv}
            handleOnChange={handleOnChange}
            setInputValues={setInputValues}
            submitCurrency={submitCurrency}
            setsubmitCurrency={setsubmitCurrency}
            inputValues={inputValues}
            goNext={(key) => setActive(key)}
            personalDetail={personalDetail}
          />
        ) : (
          ''
        )}
        {active == 'education' ? (
          <Education
            t={t}
            saveCv={saveCv}
            setsaveCv={setsaveCv}
            items={items}
            setItems={setItems}
            inputValues={inputValues}
            onQualificationChange={onQualificationChange}
            handleOnEducationHistory={handleOnEducationHistory}
            goNext={(key) => setActive(key)}
          />
        ) : (
          ''
        )}

        {active == 'workExpierience' ? (
          <WorkExperience
            t={t}
            expItems={expItems}
            saveCv={saveCv}
            setsaveCv={setsaveCv}
            setExpItems={setExpItems}
            inputValues={inputValues}
            handleOnWorkExpierience={handleOnWorkExpierience}
            goNext={(key) => setActive(key)}
          />
        ) : (
          ''
        )}
        {active == 'languageSkills' ? (
          <LanguageSkills
            t={t}
            saveCv={saveCv}
            setsaveCv={setsaveCv}
            lanItems={lanItems}
            setLanItems={setLanItems}
            inputValues={inputValues}
            handleOnLanguageSkills={handleOnLanguageSkills}
            goNext={(key) => setActive(key)}
          />
        ) : (
          ''
        )}
        {active == 'computerSkills' ? (
          <ComputerSkills
            t={t}
            saveCv={saveCv}
            setsaveCv={setsaveCv}
            pcItems={pcItems}
            setPcItems={setPcItems}
            inputValues={inputValues}
            handleOnComputerSkills={handleOnComputerSkills}
            goNext={(key) => setActive(key)}
          />
        ) : (
          ''
        )}
        {active == 'transportationLicenses' ? (
          <TransportationLicense
            t={t}
            saveCv={saveCv}
            setsaveCv={setsaveCv}
            inputValues={inputValues}
            licenseItems={licenseItems}
            setLicenseItems={setLicenseItems}
            handleOnTransportLicenses={handleOnTransportLicenses}
            goNext={(key) => setActive(key)}
          />
        ) : (
          ''
        )}

        {active == 'workExpactations' ? (
          <WorkExpectations
            t={t}
            saveCv={saveCv}
            setsaveCv={setsaveCv}
            inputValues={inputValues}
            workExpItems={workExpItems}
            submitCurrency={submitCurrency}
            setWorkExpItems={setWorkExpItems}
            handleOnWorkExpectations={handleOnWorkExpectations}
            goNext={(key) => setActive(key)}
          />
        ) : (
          ''
        )}
      </Row>
      <CurriculamVitaes
        show={cvModal}
        setShowCv={setCvModal}
        curriculamVitaes={getPayload()}
        currency={inputValues?.currency || user.curriculumVitae?.currency}
        onHide={() => setCvModal(false)}
      />
    </div>
  );
};
export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(CV);
