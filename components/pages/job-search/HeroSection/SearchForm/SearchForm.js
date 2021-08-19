import { useState, useContext, useMemo, useEffect } from 'react';
import {
  Container,
  Form,
  Button,
  Spinner,
  Row,
  Col,
  Accordion,
  useAccordionToggle,
  AccordionContext,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';
import {
  SelectInputSearchForm,
  CountryInput,
  CurrencyInput,
} from 'components/common';
import TagServices from 'services/tagServices';
import { cleanObject } from 'utils/standaloneFunctions';
import LanguageService from 'services/languageService';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import guidGenerator from 'utils/guidGenerator';
import jobVacancyOption from 'components//fields/jobVacancyOption';
import locationNotMandatory from 'components//fields/locationNotMandatory';
import jobSearchFields from 'components//fields/jobSearchFields';

function AccordionToggle({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <div className="accordion__header" onClick={decoratedOnClick}>
      {children}
      <FontAwesomeIcon
        icon={isCurrentEventKey ? 'minus' : 'plus'}
        className="header__icon"
      />
    </div>
  );
}

const SearchForm = (props) => {
  const { t, setFilter, isFetchingListing, setIsFetchingListing } = props;
  const [inputValues, setInputValues] = useState({});
  const [tagOptions, setTagOptions] = useState([]);
  const [activeItem, setActiveItem] = useState([]);
  const [languages, setLanguages] = useState();
  const [submitCurrency, setsubmitCurrency] = useState();
  const inputFields = jobVacancyOption(t);
  const [selectOptions, setSelectOptions] = useState({
    country: [],
    city: [],
    state: [],
  });
  const autocompletFields = locationNotMandatory(t);
  autocompletFields[2].size.sm = 12;
  const countryComponentIds = {
    country: 'country',
    city: 'city',
    state: 'state',
  };

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const handleCheckBoxChange = (event) => {
    const value = event?.target?.checked;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const tagFields = useMemo(() => {
    tagOptions.map((tag) => {
      inputValues[`${tag.nameTag}`] = null;
    });

    try {
      let serverSideFields = jobSearchFields(t);

      for (let i = 0; i < tagOptions.length; i++) {
        serverSideFields[tagOptions[i].parentFilter]?.items.push(tagOptions[i]);
      }
      setActiveItem(serverSideFields['licenses']?.items);
      return serverSideFields;
    } catch (error) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        'Could not Populate Tags'
      );
      return [];
    }
  }, [tagOptions]);

  useEffect(async () => {
    await initilizeTags();
    await getlanguages();
  }, []);

  const onLanguageChange = (event, id) => {
    var languageList = [];

    event?.forEach((element) => {
      languageList.push(element?.value);
    });

    handleOnChange({ id, languageList });
  };

  const getlanguages = async () => {
    let englishName = [];
    let nativeName = [];
    try {
      const result = await LanguageService.FIND({
        _limit: 300,
      });

      result?.data.forEach((element) => {
        englishName.push({
          value: element?.name,
          label: element?.name,
          id: 'languagesEnglish',
        });
        nativeName.push({
          value: element?.nativeName,
          label: element?.nativeName,
          id: 'languagesNative',
        });
      });
      setLanguages({ englishName, nativeName });
    } catch (e) {
      console.log(e.message);
    }
  };

  const initilizeTags = async () => {
    try {
      let filter = { _limit: 200, _sort: 'name:asc', type: 'job' };
      const jobTags = await TagServices.FIND(filter);
      setTagOptions(jobTags.data);
    } catch (error) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        'Could not retrieve Tags'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFetchingListing(true);
    try {
      let listTagId = [];
      tagOptions.map((tag) => {
        if (inputValues[`${tag.nameTag}`]) {
          listTagId.push(tag.id);
        }
      });
      let filter = {
        ...cleanObject({
          vacancyOption_contains: inputValues?.vacancyOption?.value || null,
          contractType_contains: inputValues?.contractType?.value || null,
          workingTime_contains: inputValues?.workingTime?.value || null,
          'country.id': inputValues?.country || null,
          'state.id': inputValues?.state || null,
          'city.id': inputValues?.city || null,
          'currency.id': inputValues?.jobCurrency || null,

          enLanguages: inputValues?.languagesEnglish?.languageList || null,
          nativeLanguages: inputValues?.languagesNative?.languageList || null,
          tags: listTagId.length > 0 ? listTagId : null,

          annualSalaryFrom_gte:
            Number(inputValues?.annualSalaryFrom?.replace(/[^\d.-]/g, '')) ||
            null,
          annualSalaryTo_lte:
            Number(inputValues?.annualSalaryTo?.replace(/[^\d.-]/g, '')) ||
            null,

          monthlySalaryFrom_gte:
            Number(inputValues?.monthlySalaryFrom?.replace(/[^\d.-]/g, '')) ||
            null,
          monthlySalaryTo_lte:
            Number(inputValues?.monthlySalaryTo?.replace(/[^\d.-]/g, '')) ||
            null,

          hourlySalaryFrom_gte:
            Number(inputValues?.hourlySalaryFrom?.replace(/[^\d.-]/g, '')) ||
            null,
          hourlySalaryTo_lte:
            Number(inputValues?.hourlySalaryTo?.replace(/[^\d.-]/g, '')) ||
            null,
        }),
      };

      setFilter(filter);
    } catch (e) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('common:toast.unknown-error')
      );
      setIsFetchingListing(false);
    }
  };

  return (
    <div className="hero__search-form">
      <Container>
        <Form className="search-form__form" onSubmit={handleSubmit}>
          <Row>
            {inputFields.searchForm.map((item) => {
              if (item.type === 'select') {
                return (
                  <Col
                    lg={3}
                    md={6}
                    sm={6}
                    xs={12}
                    key={item.key}
                    className="form__item"
                  >
                    <SelectInputSearchForm
                      id={item.key}
                      onChange={handleOnChange}
                      value={inputValues[item.key]}
                      options={item.options}
                      placeholder={item.placeholder}
                    />
                  </Col>
                );
              }
              if (item.type === 'currency') {
                return (
                  <Col key={item.key} lg={3} md={6} sm={6}>
                    <Form.Group>
                      <CurrencyInput
                        handleOnChange={handleOnChange}
                        setCurrency={setsubmitCurrency}
                        searchForm={true}
                        placeholder={t('job-search:form.currency')}
                        currencyId={item.key}
                      />
                    </Form.Group>
                  </Col>
                );
              }

              if (item.type === 'autocomplete') {
                return (
                  <CountryInput
                    key={item.key}
                    autoComplete={autocompletFields}
                    inputValues={inputValues}
                    handleOnChange={handleOnChange}
                    setInputValues={setInputValues}
                    inputIds={countryComponentIds}
                    selectOptions={selectOptions}
                    setSelectOptions={setSelectOptions}
                    searchForm={true}
                  />
                );
              }
            })}
          </Row>
          <Row></Row>
          <Row className="last__row">
            {inputFields.languages.map((item) => (
              <Col
                lg={4}
                md={6}
                sm={12}
                xs={12}
                key={item.key}
                className="form__item"
              >
                <SelectInputSearchForm
                  id={item.type}
                  onChange={(event) => onLanguageChange(event, item.key)}
                  options={
                    item.type === 'native'
                      ? languages?.nativeName
                      : languages?.englishName
                  }
                  placeholder={item.placeholder}
                  isMulti={true}
                  isSearchable={true}
                />
              </Col>
            ))}
            <Col lg={4} md={12}>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="form__button"
                disabled={isFetchingListing}
              >
                {isFetchingListing ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                  />
                ) : (
                  <>
                    {' '}
                    <FontAwesomeIcon
                      icon="search"
                      className="button__icon"
                    />{' '}
                    {t('job-search:form.submit')}
                  </>
                )}
              </Button>
            </Col>
          </Row>
          <Accordion className="form__accordion">
            <AccordionToggle eventKey={1}>
              {t('job-search:form.accordion.label')}
            </AccordionToggle>
            <Accordion.Collapse eventKey={1}>
              <Row>
                {tagOptions.length > 0 ? (
                  <Col lg={10} md={10}>
                    <Row>
                      <Col lg={3} md={3}>
                        <div className="accordion__category__container">
                          {Object?.keys(tagFields).map((category) => (
                            <Row key={guidGenerator()}>
                              <Col lg={12} md={12}>
                                <div
                                  className={`accordion__category__option`}
                                  key={tagFields[category].label}
                                >
                                  <div
                                    className={`category__header ${
                                      activeItem[0]?.parentFilter === category
                                        ? 'category__header--active'
                                        : ''
                                    }`}
                                    onClick={() =>
                                      setActiveItem(tagFields[category].items)
                                    }
                                  >
                                    {tagFields[category].label}:
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          ))}
                        </div>
                      </Col>

                      <Col lg={9} md={9}>
                        <Row>
                          <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            className="accordion__category"
                          >
                            <div className="category__items-wrapper">
                              {activeItem.map((item) => (
                                <label
                                  key={guidGenerator()}
                                  className={`items-wrapper__item ${
                                    inputValues[item.nameTag]
                                      ? 'items-wrapper__item--active'
                                      : ''
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={inputValues[item.nameTag]}
                                    onChange={handleCheckBoxChange}
                                    id={item.nameTag}
                                  />
                                  <FontAwesomeIcon
                                    icon={
                                      inputValues[item.nameTag]
                                        ? 'check'
                                        : 'plus'
                                    }
                                    className="item__icon"
                                  />{' '}
                                  {t(`job-tags:${item.nameTag}`)}
                                </label>
                              ))}
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                ) : (
                  <> </>
                )}
                <Col lg={2}>
                  {inputFields.accordionRight.map((itemLabel) => (
                    <div className="accordion__right" key={itemLabel.key}>
                      <div className="right__header">{itemLabel.label}:</div>
                      {itemLabel.items.map((item) => (
                        <NumberFormat
                          key={item.key}
                          customInput={Form.Control}
                          id={item.key}
                          className="form__input"
                          value={inputValues[item.key]}
                          placeholder={item.placeholder}
                          onChange={handleOnChange}
                          autoComplete="current-text"
                          thousandSeparator={true}
                          allowNegative={false}
                          isAllowed={(values) =>
                            values.value >= item.min && values.value <= item.max
                          }
                          prefix={
                            item.prefix === 'currency'
                              ? `${submitCurrency ? submitCurrency : 'ALL'} `
                              : item.prefix
                          }
                        />
                      ))}
                    </div>
                  ))}
                </Col>
              </Row>
            </Accordion.Collapse>
          </Accordion>
        </Form>
      </Container>
    </div>
  );
};

export default SearchForm;
