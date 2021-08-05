import { useEffect, useState, Fragment } from 'react';
import { SelectInputSubmit, SelectInputSearchForm } from 'components/common';
import { CountryServices, StateServices, CityServices } from 'services';
import { Col, Form } from 'react-bootstrap';
import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';

/**
 *
 * @param {autoComplete} DefinedFields Passed from parent. Defined Field, keys and responsive sizes
 * which are being defined in the parent.  *
 * @param {inputValues} Payload Passed from parent. Will end up defining the payload which will be send
 * to the server. This is needed, to determine if the state of Country/State/City has
 * changed.
 * @param {selectOptions} InitialArrays Passed from parent.
 * Array elements for the population of the location. These need to be defined
 * Uniqly in one page render.
 * @param {inputIds} HtmlIds Passed from parent. Will correspond to the inputvalues
 * genereted Payload.
 * @param {locationValue,setLocationValue,initialValues} Saved_Values Passed from parent. If DDL has initial values this is a must, for selecting these in the DDL.
 * initialValues will procide the inital values for the countries and settings.
 *
 * @requires props All prop elements are required.
 *
 * @returns {Country/State/City} Will return the currency choosen for the particular input.
 */

const CountryInput = (props) => {
  const {
    handleOnChange,
    autoComplete,
    inputValues,
    setInputValues,
    inputIds,
    selectOptions,
    setSelectOptions,
    searchForm,
    locationValue,
    setLocationValue,
    initialValues,
    onlyCountry,
    t,
  } = props;
  const [clearIds, setClearIds] = useState([]);
  const [loaders, setLoaders] = useState([]);
  const { country, state, city } = inputIds;

  const handleChangeLocation = async (e) => {
    if (e && !onlyCountry) {
      handleOnChange({ target: e });
      if (e.id === country) {
        setInputValues((prev) => ({ ...prev, [state]: '', [city]: '' }));
        setClearIds([state, city]);
      } else if (e.id == state) {
        setInputValues((prev) => ({ ...prev, [city]: '' }));
        setClearIds([city]);
      } else {
        setClearIds([]);
      }
    }
  };

  const handleGetCountries = async () => {
    try {
      const emptyValue = {
        id: country,
        label: autoComplete[0].label,
        value: '',
      };
      setLoaders((prev) => [...prev, country]);
      let filter = { _limit: 300, _sort: 'name:asc' };
      let { data } = await CountryServices.FIND(filter);

      if (data) {
        data = data.map((item) => ({
          value: item.id,
          label: getCountryName(item),
          id: country,
        }));
        data = [emptyValue, ...data];
        setSelectOptions((prev) => ({
          ...prev,
          [country]: data,
        }));

        setLoaders((prev) => prev.filter((item) => item !== country));
      }
    } catch (error) {
      return TostifyCustomContainer('error', error.message);
    }
  };

  const getCountryName = (item) => {
    if (item.native) {
      return `${item.native}/${item.name}`;
    }
    if (item.native == item.name) {
      return item.name;
    }
    return item.name;
  };

  const handleGetStates = async () => {
    try {
      const emptyValue = {
        id: state,
        label: autoComplete[1].label,
        value: '',
      };
      setLoaders((prev) => [...prev, state]);
      let filter = {
        _limit: 500,
        _sort: 'name:asc',
        country: inputValues[country] || initialValues[country].id,
      };
      let { data, error } = await StateServices.FIND(filter);
      if (error) {
        return TostifyCustomContainer('error', t('common:toast.country-error'));
      }

      if (data?.length == 0) {
        data = [
          {
            value: 'noState',
            label: t('common:location.no-states'),
            id: state,
          },
        ];
        setSelectOptions((prev) => ({
          ...prev,
          [state]: data,
        }));
        TostifyCustomContainer(
          'info',
          t('common:location.states-not-registerd')
        );
        return setLoaders((prev) => prev.filter((item) => item !== state));
      }

      if (data) {
        data = data.map((item) => ({
          value: item.id,
          label: item.name,
          id: state,
        }));
        data = [emptyValue, ...data];
        setSelectOptions((prev) => ({
          ...prev,
          [state]: data,
        }));
      }
      setLoaders((prev) => prev.filter((item) => item !== state));
    } catch (error) {
      return TostifyCustomContainer('error', error.message);
    }
  };

  const handleGetCities = async () => {
    try {
      const emptyValue = {
        id: city,
        label: autoComplete[2].label,
        value: '',
      };
      setLoaders((prev) => [...prev, city]);
      let filter = {
        _limit: 500,
        _sort: 'name:asc',
        state: inputValues[state] || initialValues[state].id,
      };
      let { data, error } = await CityServices.FIND(filter);

      if (data?.length == 0 || error) {
        data = [
          {
            value: 'noCity',
            label: t('common:location.no-city'),
            id: city,
          },
        ];
        setSelectOptions((prev) => ({
          ...prev,
          [city]: data,
        }));
        TostifyCustomContainer('info', t('common:location.cities-registerd'));
        return setLoaders((prev) => prev.filter((item) => item !== city));
      }

      if (data) {
        data = data.map((item) => ({
          value: item.id,
          label: item.name,
          id: city,
        }));
        data = [emptyValue, ...data];
        setSelectOptions((prev) => ({
          ...prev,
          [city]: data,
        }));
      }
      setLoaders((prev) => prev.filter((item) => item !== city));
    } catch (error) {
      return TostifyCustomContainer('error', t('common:toast.location-error'));
    }
  };

  useEffect(() => {
    handleGetCountries();
  }, []);

  useEffect(() => {
    if (initialValues?.country) {
      setLocationValue((prev) => ({
        ...prev,
        country: selectOptions.country.filter(
          (option) => option.value === initialValues.country.id
        ),
      }));
      if (initialValues.state) handleGetStates();
    }
    if (initialValues?.state) {
      setLocationValue((prev) => ({
        ...prev,
        state: selectOptions.state.filter(
          (option) => option.value === initialValues.state.id
        ),
      }));
      if (initialValues.city) handleGetCities();
    }

    if (initialValues?.city) {
      setLocationValue((prev) => ({
        ...prev,
        city: selectOptions.city.filter(
          (option) => option.value === initialValues.city.id
        ),
      }));
    }
  }, [selectOptions.country]);

  useEffect(() => {
    if (inputValues[country] && !onlyCountry) {
      handleGetStates();
    }
  }, [inputValues[country]]);

  useEffect(() => {
    if (inputValues[state] && !onlyCountry) {
      handleGetCities();
    }
  }, [inputValues[state]]);
  if (searchForm) {
    return (
      <>
        {autoComplete.map((item) => {
          return (
            <Fragment key={item.key}>
              {item.show && (
                <Col lg={item.size.lg} md={item.size.md} sm={item.size.sm}>
                  <Form.Group>
                    <SelectInputSearchForm
                      id={item.key}
                      clearIds={clearIds}
                      onChange={handleChangeLocation}
                      isLoading={loaders.includes(item.key)}
                      isSearchable={true}
                      maxLength={10}
                      options={
                        loaders.includes(item.key)
                          ? []
                          : selectOptions[item.key]
                      }
                      placeholder={item.label}
                    />
                  </Form.Group>
                </Col>
              )}
            </Fragment>
          );
        })}
      </>
    );
  }
  if (initialValues) {
    return (
      <>
        {autoComplete.map((item) => {
          return (
            <Fragment key={item.key}>
              {item.show && (
                <Col lg={item.size.lg} md={item.size.md} sm={item.size.sm}>
                  <Form.Group>
                    <SelectInputSubmit
                      id={item.key}
                      clearIds={clearIds}
                      onChange={handleChangeLocation}
                      isLoading={loaders.includes(item.key)}
                      isSearchable={true}
                      maxLength={10}
                      value={!inputValues[item.key] && locationValue[item.key]}
                      options={
                        loaders.includes(item.key)
                          ? []
                          : selectOptions[item.key]
                      }
                      placeholder={item.label}
                    />
                  </Form.Group>
                </Col>
              )}
            </Fragment>
          );
        })}
      </>
    );
  }
  return (
    <>
      {autoComplete.map((item) => {
        return (
          <Fragment key={item.key}>
            {item.show && (
              <Col lg={item.size.lg} md={item.size.md} sm={item.size.sm}>
                <Form.Group>
                  <SelectInputSubmit
                    id={item.key}
                    clearIds={clearIds}
                    maxLength={10}
                    onChange={handleChangeLocation}
                    isLoading={loaders.includes(item.key)}
                    isSearchable={true}
                    options={
                      loaders.includes(item.key) ? [] : selectOptions[item.key]
                    }
                    placeholder={item.label}
                  />
                </Form.Group>
              </Col>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

CountryInput.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

CountryInput.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(CountryInput);
