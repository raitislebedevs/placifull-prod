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
import fields from './fields';
import NumberFormat from 'react-number-format';
import Datetime from 'react-datetime';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import TagServices from 'services/tagServices';
import transportFields from './transportFields';
import guidGenerator from 'utils/guidGenerator';
import { cleanObject } from 'utils/standaloneFunctions';
import locationFields from './locationFields';
import {
  SelectInputSearchForm,
  CountryInput,
  CurrencyInput,
  CustomFormSearchForm,
} from 'components/common';

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
  const [submitCurrency, setsubmitCurrency] = useState();
  const formFields = fields(t, submitCurrency);
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

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const dropdownHandleChange = (e) => {
    handleOnChange({ target: { value: e.target.value, id: e.target.id } });
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
      let serverSideFields = transportFields(t);

      for (let i = 0; i < tagOptions.length; i++) {
        serverSideFields[tagOptions[i].parentFilter]?.items.push(tagOptions[i]);
      }
      setActiveItem(serverSideFields['equipment']?.items);

      return serverSideFields;
    } catch (error) {
      return [];
    }
  }, [tagOptions]);

  useEffect(async () => {
    await initilizeTags();
  }, []);

  const initilizeTags = async () => {
    try {
      let filter = { _limit: 200, _sort: 'name:asc', type: 'transport' };
      const transport = await TagServices.FIND(filter);
      setTagOptions(transport.data);
    } catch (error) {}
  };

  const handleSubmit = (e) => {
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
          // name conventions mainly for DDL
          transportType_contains: inputValues?.transportType?.value || null,
          action_contains: inputValues?.action?.value || null,
          condition_contains: inputValues?.condition?.value || null,
          engineType_contains: inputValues?.engineType?.value || null,
          gearBox_contains: inputValues?.gearBox?.value || null,
          color_contains: inputValues?.color?.value || null,

          transportBrand_contains: inputValues?.transportBrand || null,
          transportModel_contains: inputValues?.transportModel || null,

          //Messurments

          distanceMesurment_contains: inputValues?.millageMesurment || null,
          speedMesurment_contains: inputValues?.speedMesurment || null,
          fuelEconomyMesurment_contains:
            inputValues?.fuelEconomyMesurment || null,
          //Relationship Id's year

          'country.id': inputValues?.country || null,
          'state.id': inputValues?.state || null,
          'city.id': inputValues?.city || null,
          'currency.id': inputValues?.currency || null,

          //Greatar than or equal, less than or equal comparisions
          price_gte:
            Number(inputValues?.minPrice?.replace(/[^\d.-]/g, '')) || null,
          price_lte:
            Number(inputValues?.maxPrice?.replace(/[^\d.-]/g, '')) || null,

          year_gte: inputValues?.minAge ? new Date(inputValues?.minAge) : null,
          year_lte: inputValues?.maxAge ? new Date(inputValues?.maxAge) : null,

          fuelEconomy_gte: Number(inputValues?.minUsage) || null,
          fuelEconomy_lte: Number(inputValues?.maxUsage) || null,

          maxSpeed_gte: Number(inputValues?.minSpeed) || null,
          maxSpeed_lte: Number(inputValues?.maxSpeed) || null,

          distance_gte: Number(inputValues?.minMillage) || null,
          distance_lte: Number(inputValues?.maxMillage) || null,

          //List of Tags
          tags: listTagId.length > 0 ? listTagId : null,
        }),
      };

      setFilter(filter);
    } catch (e) {
      TostifyCustomContainer('error', e.message);
      setIsFetchingListing(false);
    }
  };

  return (
    <div className="hero__search-form">
      <Container>
        <Form className="search-form__form" onSubmit={handleSubmit}>
          <Row>
            {formFields.searchForm.map((item) => {
              if (item.type == 'select') {
                return (
                  <Col
                    lg={2}
                    md={4}
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
              if (item.type == 'number') {
                return (
                  <Col
                    lg={2}
                    md={4}
                    sm={6}
                    xs={6}
                    key={item.key}
                    className="form__item"
                  >
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
                  </Col>
                );
              }
              if (item.type === 'text') {
                return (
                  <Col lg={2} md={4} sm={6} key={item.key}>
                    <div className={'search-form'}>
                      <Form.Group>
                        <Form.Control
                          id={item.key}
                          onChange={handleOnChange}
                          value={inputValues[item.key]}
                          placeholder={item.placeholder}
                        />
                      </Form.Group>
                    </div>
                  </Col>
                );
              }
              if (item.type == 'date') {
                return (
                  <Col
                    lg={2}
                    md={4}
                    sm={6}
                    xs={6}
                    key={item.key}
                    className="form__item"
                  >
                    <div className={'decorator__container datetime_container'}>
                      <Form.Group>
                        {item?.decorator}
                        <Datetime
                          value={inputValues[item.key]}
                          onChange={(e) =>
                            handleOnChange({
                              target: { value: e, id: item.key },
                            })
                          }
                          inputProps={{ className: 'datetime', readOnly: true }}
                          timeFormat={false}
                          dateFormat={'YYYY-MM'} //'YYYY'
                          closeOnClickOutside
                          closeOnSelect
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
            {formFields.lastRow.map((item) => (
              <Col
                lg={2}
                md={4}
                sm={6}
                xs={6}
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
            ))}
            <Col lg={2} md={4} sm={6} xs={6}>
              <Form.Group>
                <CurrencyInput
                  handleOnChange={handleOnChange}
                  setCurrency={setsubmitCurrency}
                  searchForm={true}
                  placeholder={t('transport:hero.form.currency')}
                  currencyId={'currency'}
                />
              </Form.Group>
            </Col>
            <Col lg={4} md={12}>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                disabled={isFetchingListing}
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
                    {t('transport:hero.form.submit')}
                  </>
                )}
              </Button>
            </Col>
          </Row>
          <Accordion className="form__accordion">
            <AccordionToggle eventKey={1}>
              {t('transport:hero.form.accordion')}
            </AccordionToggle>
            <Accordion.Collapse eventKey={1}>
              <Row>
                {tagOptions.length > 0 ? (
                  <Col lg={9} md={9}>
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
                                  {t(`transport-tags:${item.nameTag}`)}
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
                <Col lg={3}>
                  {formFields.accordionRight?.map((group) => {
                    if (group?.type === 'economy') {
                      return (
                        <div className="accordion__right" key={group.key}>
                          <div className="right__header">{group.label}:</div>
                          {group?.items?.map((item) => (
                            <Form.Group key={guidGenerator()}>
                              {item?.decorator}
                              <NumberFormat
                                customInput={CustomFormSearchForm}
                                label={item.placeholder}
                                id={item.key}
                                onValueChange={(e) => {
                                  let payload = {
                                    target: {
                                      value: e.floatValue,
                                      id: item.key,
                                    },
                                  };
                                  handleOnChange(payload);
                                }}
                                dropdownHandleChange={dropdownHandleChange}
                                autoComplete="current-text"
                                decimalScale={item.decimalpoints}
                                allowNegative={false}
                                fixedDecimalScale={true}
                                isAllowed={(values) =>
                                  values.value >= item.min &&
                                  values.value <= item.max
                                }
                                inputValues={inputValues}
                                prefix={item.prefix}
                                suffix={item.suffix}
                                append={item?.append}
                                placeholderClassName={item?.className}
                                prepend={item?.prepend}
                              />
                            </Form.Group>
                          ))}
                        </div>
                      );
                    }
                    if (group?.type === 'distance') {
                      return (
                        <div className="accordion__right" key={group.key}>
                          <div className="right__header">{group.label}:</div>
                          {group?.items?.map((item) => (
                            <Form.Group key={guidGenerator()}>
                              {item?.decorator}
                              <NumberFormat
                                customInput={CustomFormSearchForm}
                                label={item.placeholder}
                                id={item.key}
                                onValueChange={(e) => {
                                  let payload = {
                                    target: {
                                      value: e.floatValue,
                                      id: item.key,
                                    },
                                  };
                                  handleOnChange(payload);
                                }}
                                dropdownHandleChange={dropdownHandleChange}
                                autoComplete="current-text"
                                decimalScale={item.decimalpoints}
                                allowNegative={false}
                                fixedDecimalScale={true}
                                isAllowed={(values) =>
                                  values.value >= item.min &&
                                  values.value <= item.max
                                }
                                inputValues={inputValues}
                                prefix={item.prefix}
                                suffix={item.suffix}
                                append={item?.append}
                                placeholderClassName={item?.className}
                                prepend={item?.prepend}
                              />
                            </Form.Group>
                          ))}
                        </div>
                      );
                    }
                    if (group?.type === 'speed') {
                      return (
                        <div className="accordion__right" key={group.key}>
                          <div className="right__header">{group.label}:</div>
                          {group?.items?.map((item) => (
                            <Form.Group key={guidGenerator()}>
                              {item?.decorator}
                              <NumberFormat
                                customInput={CustomFormSearchForm}
                                label={item.placeholder}
                                id={item.key}
                                onValueChange={(e) => {
                                  let payload = {
                                    target: {
                                      value: e.floatValue,
                                      id: item.key,
                                    },
                                  };
                                  handleOnChange(payload);
                                }}
                                dropdownHandleChange={dropdownHandleChange}
                                autoComplete="current-text"
                                decimalScale={item.decimalpoints}
                                allowNegative={false}
                                fixedDecimalScale={true}
                                isAllowed={(values) =>
                                  values.value >= item.min &&
                                  values.value <= item.max
                                }
                                inputValues={inputValues}
                                prefix={item.prefix}
                                suffix={item.suffix}
                                append={item?.append}
                                placeholderClassName={item?.className}
                                prepend={item?.prepend}
                              />
                            </Form.Group>
                          ))}
                        </div>
                      );
                    }
                  })}
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
