import { useState, useContext, useEffect, useMemo } from 'react';
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
import {
  SelectInputSearchForm,
  CountryInput,
  CurrencyInput,
} from 'components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fields from './fields';
import mainFields from './mainFields';
import locationFields from './locationFields';
import NumberFormat from 'react-number-format';
import Datetime from 'react-datetime';
import housingFields from './housingFields';
import landFields from './landFields';
import TagServices from 'services/tagServices';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import guidGenerator from 'utils/guidGenerator';
import { cleanObject } from 'utils/standaloneFunctions';

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

  const [inputValues, setInputValues] = useState({ tags: [] });
  const [activeItem, setActiveItem] = useState([]);
  const [currentCenter, setCurrentCenter] = useState(null);
  const [submitCurrency, setsubmitCurrency] = useState();
  const [tagOptions, setTagOptions] = useState([]);
  const [realEstateTags, setRealEstateTags] = useState([]);
  const [landTags, setlandTags] = useState([]);
  const [agentTags, setAgentTags] = useState([]);

  const formFields = mainFields(t);
  const inputFields = fields(t, submitCurrency);
  const [defaultValues, setDefaultValues] = useState({
    category: 'houses',
    action: 'rent',
  });
  const [selectOptions, setSelectOptions] = useState({
    country: [],
    city: [],
    state: [],
  });
  const autocompletFields = locationFields(t);
  const countryComponentIds = {
    country: 'country',
    city: 'city',
    state: 'state',
  };

  const isRendeable = (category, action) => {
    if (
      category != null &&
      (inputValues['category']?.value == null ||
        inputValues['category']?.value == '')
    )
      return category.includes(defaultValues.category);

    if (category) return category.includes(inputValues['category']?.value);

    if (
      action != null &&
      (inputValues['action']?.value == null ||
        inputValues['action']?.value == '')
    )
      return action.includes(defaultValues.action);

    if (action) return action.includes(inputValues['action']?.value);

    return true;
  };

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
    if (id === 'city') {
      setCurrentCenter({
        latitude: event?.target?.latitude,
        longitude: event?.target?.longitude,
      });
    }
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
      if (
        inputValues.category?.value === 'agents' ||
        !inputValues.category ||
        inputValues.category?.value == ''
      ) {
        setActiveItem([]);
        return [];
      }

      let serverSideFields = housingFields(t);

      if (inputValues.category?.value === 'land')
        serverSideFields = landFields(t);

      for (let i = 0; i < tagOptions.length; i++) {
        serverSideFields[tagOptions[i].parentFilter]?.items.push(tagOptions[i]);
      }

      if (inputValues.category?.value === 'land')
        setActiveItem(serverSideFields['forestLand']?.items);

      if (inputValues.category?.value !== 'land')
        setActiveItem(serverSideFields['kitchen']?.items);

      return serverSideFields;
    } catch (error) {
      return [];
    }
  }, [tagOptions]);

  useEffect(() => {
    initilizeTags();
  }, []);

  useEffect(() => {
    handleGetTags();
  }, [inputValues.category]);

  const handleGetTags = async () => {
    setTagOptions(realEstateTags);
    if (inputValues.category?.value === '') setTagOptions([]);
    if (inputValues.category?.value === 'land') setTagOptions(landTags);
    if (inputValues.category?.value === 'agents') setTagOptions(agentTags);
  };

  const initilizeTags = async () => {
    try {
      let filter = { _limit: 200, _sort: 'name:asc', type: 'realEstate' };
      const realEstateData = await TagServices.FIND(filter);
      setRealEstateTags(realEstateData.data);

      filter = { _limit: 200, _sort: 'name:asc', type: 'land' };
      const landData = await TagServices.FIND(filter);
      setlandTags(landData.data);

      filter = { _limit: 200, _sort: 'name:asc', type: 'agent' };
      const agentData = await TagServices.FIND(filter);
      setAgentTags(agentData.data);
    } catch (error) {}
  };

  const handleSubmit = (e) => {
    //e.preventDefault();
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
          transportType_contains: inputValues?.transportType?.value || null,
          action_contains: inputValues?.action?.value || null,
          condition_contains: inputValues?.condition?.value || null,
          areaMeasurement_contains: inputValues?.areaMeasurement?.value || null,

          'country.id': inputValues?.country || null,
          'state.id': inputValues?.state || null,
          'city.id': inputValues?.city || null,
          'currency.id': inputValues?.currency || null,

          price_gte:
            Number(inputValues?.minPrice?.replace(/[^\d.-]/g, '')) || null,
          price_lte:
            Number(inputValues?.maxPrice?.replace(/[^\d.-]/g, '')) || null,
          rooms_gte:
            Number(inputValues?.minRoom?.replace(/[^\d.-]/g, '')) || null,
          rooms_lte:
            Number(inputValues?.maxRoom?.replace(/[^\d.-]/g, '')) || null,
          area_gte: Number(inputValues?.minArea?.replace(/m2/g, '')) || null,
          area_lte: Number(inputValues?.maxArea?.replace(/m2/g, '')) || null,
          totalUltilities_gte:
            Number(inputValues?.minBill?.replace(/[^\d.-]/g, '')) || null,
          totalUltilities_lte:
            Number(inputValues?.maxBill?.replace(/[^\d.-]/g, '')) || null,
          tags: listTagId.length > 0 ? listTagId : null,

          moveInDate_gte: inputValues?.moveInDate
            ? new Date(inputValues?.moveInDate)
            : null,
          moveOutDate_lte: inputValues?.moveOutDate
            ? new Date(inputValues?.moveOutDate)
            : null,

          yearBuilt_gte: inputValues?.minYear
            ? new Date(inputValues?.minYear)
            : null,
          yearBuilt_lte: inputValues?.maxYear
            ? new Date(inputValues?.maxYear)
            : null,
        }),
      };

      setFilter(filter);
    } catch (e) {
      setIsFetchingListing(false);
    }
  };

  return (
    <div className="hero__search-form">
      <Container>
        <div className="search-form__form">
          <Row>
            {formFields.map((item) => {
              if (
                item.type === 'select' &&
                isRendeable(item.category, item.action)
              ) {
                return (
                  <Col lg={2} md={4} sm={6} key={item.key}>
                    <Form.Group>
                      <SelectInputSearchForm
                        id={item.key}
                        onChange={handleOnChange}
                        value={inputValues[item.key]}
                        options={item.options}
                        placeholder={item.placeholder}
                      />
                    </Form.Group>
                  </Col>
                );
              }
              if (
                item.type === 'conditionalSelect' &&
                isRendeable(item.category, item.action)
              ) {
                return (
                  <Col lg={2} md={4} sm={6} key={item.key}>
                    <Form.Group>
                      <SelectInputSearchForm
                        id={item.key}
                        onChange={handleOnChange}
                        value={inputValues[item.key]}
                        options={item.options}
                        placeholder={item.placeholder}
                      />
                    </Form.Group>
                  </Col>
                );
              }
              if (
                item.type === 'number' &&
                (inputValues.category?.value === 'land' ||
                  inputValues.category?.value === 'agent') &&
                isRendeable(item.category, item.action)
              ) {
                return (
                  <Col lg={3} md={4} sm={6} key={item.key}>
                    <Form.Group>
                      <NumberFormat
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
                        prefix={item.prefix}
                        suffix={item.suffix}
                      />
                    </Form.Group>
                  </Col>
                );
              }
              if (
                item.type === 'numberArea' &&
                isRendeable(item.category, item.action)
              ) {
                return (
                  <Col lg={2} md={4} sm={6} key={item.key}>
                    <div className={'decorator__container'}>
                      <Form.Group>
                        {inputValues['areaMeasurement']?.value === 'metter' ? (
                          <div className={'sup'}>
                            m<sup>2</sup>
                          </div>
                        ) : inputValues['areaMeasurement']?.value === 'feet' ? (
                          <div className={'sup'}>
                            ft<sup>2</sup>
                          </div>
                        ) : (
                          ''
                        )}
                        <NumberFormat
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
                        />
                      </Form.Group>
                    </div>
                  </Col>
                );
              }
              if (
                item.type === 'number' &&
                isRendeable(item.category, item.action)
              ) {
                return (
                  <Col lg={2} md={4} sm={6} key={item.key}>
                    <Form.Group>
                      <NumberFormat
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
                          item.prefix == 'currency'
                            ? `${submitCurrency ? submitCurrency : 'ALL'} `
                            : item.prefix
                        }
                        suffix={item.suffix}
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
          <Row className="last__row">
            {formFields.map((item) => {
              if (
                item.type === 'date' &&
                isRendeable(item.category, item.action)
              ) {
                return (
                  <Col
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    key={item.key}
                    className="form__item"
                  >
                    <div className={'decorator__container datetime_container'}>
                      <Form.Group>
                        {item?.decorator}
                        <Datetime
                          dateFormat
                          value={inputValues[item.key]}
                          inputProps={{ className: 'datetime', readOnly: true }}
                          onChange={(e) =>
                            handleOnChange({
                              target: { value: e, id: item.key },
                            })
                          }
                          timeFormat={false}
                          renderInput={(props) => {
                            return (
                              <Form.Control
                                {...props}
                                className="form__input"
                                id={item.key}
                                label={item.placeholder}
                                placeholder={item.placeholder}
                              />
                            );
                          }}
                        />
                      </Form.Group>
                    </div>
                  </Col>
                );
              }
            })}

            <Col lg={3} md={4} sm={12}>
              <Form.Group>
                <CurrencyInput
                  handleOnChange={handleOnChange}
                  setCurrency={setsubmitCurrency}
                  searchForm={true}
                  placeholder={t(
                    'real-estate:hero.form.search-fields.currency'
                  )}
                  currencyId={'currency'}
                />
              </Form.Group>
            </Col>
            <Col lg={3} md={4}>
              <Button
                variant="primary"
                size="lg"
                disabled={isFetchingListing}
                onClick={handleSubmit}
                className="form__button"
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
                    {t('real-estate:hero.form.submit')}
                  </>
                )}
              </Button>
            </Col>
          </Row>
          <Accordion className="form__accordion">
            <AccordionToggle eventKey={1}>
              {t('real-estate:hero.form.accordion')}
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
                                  {t(`real-estate-tags:${item.nameTag}`)}
                                </label>
                              ))}
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                ) : (
                  <Col lg={10} md={10} className={'empty__tags'}>
                    <em> {t('real-estate:no-tags')} </em>
                  </Col>
                )}
                <Col lg={2}>
                  {inputFields.accordionRight.map((group) => {
                    if (
                      group?.type === 'bills' &&
                      isRendeable(group?.category, inputValues?.action)
                    ) {
                      return (
                        <div className="accordion__right" key={group?.key}>
                          <div className="right__header">{group.label}:</div>
                          {group.items.map((item) => (
                            <NumberFormat
                              key={item.key}
                              customInput={Form.Control}
                              id={item.key}
                              className="form__input"
                              value={inputValues[item.key]}
                              placeholder={item.placeholder}
                              onChange={handleOnChange}
                              autoComplete="current-text"
                              thousandSeparator={item.thousand}
                              allowNegative={false}
                              isAllowed={(values) =>
                                values.value >= item.min &&
                                values.value <= item.max
                              }
                              prefix={
                                item.prefix == 'currency'
                                  ? `${
                                      submitCurrency ? submitCurrency : 'ALL'
                                    } `
                                  : item.prefix
                              }
                              suffix={item.suffix}
                            />
                          ))}
                        </div>
                      );
                    }
                    if (
                      group?.type === 'years' &&
                      isRendeable(group?.category, inputValues?.action)
                    ) {
                      return (
                        <div className="accordion__right" key={guidGenerator()}>
                          <div className="right__header">{group.label}:</div>

                          {group.items.map((item) => (
                            <div
                              className={'decorator__container'}
                              key={guidGenerator()}
                            >
                              <Form.Group>
                                {item?.decorator}
                                <Datetime
                                  inputProps={{
                                    className: 'datetime',
                                    readOnly: true,
                                  }}
                                  value={inputValues[item.key]}
                                  onChange={(e) =>
                                    handleOnChange({
                                      target: { value: e, id: item.key },
                                    })
                                  }
                                  timeFormat={false}
                                  dateFormat={'YYYY'} //'YYYY'
                                  closeOnClickOutside
                                  closeOnSelect
                                  renderInput={(props) => {
                                    return (
                                      <Form.Control
                                        {...props}
                                        id={item.key}
                                        label={item.placeholder}
                                        placeholder={item.placeholder}
                                      />
                                    );
                                  }}
                                />
                              </Form.Group>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    if (group?.type === 'select') {
                      return (
                        <div className="accordion__right" key={guidGenerator()}>
                          <div className="right__header">{group.label}:</div>
                          <Form.Group>
                            <SelectInputSearchForm
                              id={group.key}
                              onChange={handleOnChange}
                              value={inputValues[group.key]}
                              options={group.options}
                              placeholder={group.label}
                            />
                          </Form.Group>
                        </div>
                      );
                    }
                  })}
                </Col>
              </Row>
            </Accordion.Collapse>
          </Accordion>
        </div>
      </Container>
    </div>
  );
};

export default SearchForm;
