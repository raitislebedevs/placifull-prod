import { useEffect, useState } from 'react';
import { SelectInputSubmit, SelectInputSearchForm } from 'components/common';
import { CurrencyServices } from 'services';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
/**
 *
 * @param {setSubmitCurrency} props will set the CCY field to the choosen CCY,
 * this needs to be defined in the component where this component is rendered
 *
 * @returns {setSubmitCurrency} Will return the currency choosen for the particular input.
 */

const CurrencyInput = (props) => {
  const {
    t,
    handleOnChange,
    setCurrency,
    initialSelect,
    currencyId,
    isMulti,
    searchForm,
    isMandatory,
  } = props;
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [loaders, setLoaders] = useState([]);

  const [selectOptions, setSelectOptions] = useState({
    currency: [],
  });

  const handleCurrencyChange = async (e) => {
    if (e) {
      handleOnChange({ target: e });
      setCurrency(e.fullValue.symbol);
      setSelectedCurrency(e);
    }
  };

  const handleGetCurrencies = async () => {
    const emptyValue = {
      fullValue: {},
      id: currencyId,
      label: (
        <>
          {isMandatory ? (
            <>
              {t('common:currency.currency-label')}
              <sup className={'mandatory__field'}>*</sup>{' '}
            </>
          ) : (
            t('common:currency.currency-label')
          )}
        </>
      ),
      value: '',
    };
    try {
      setLoaders((prev) => [...prev, 'currency']);
      let filter = { _limit: 200, _sort: 'popularity:desc' };
      let { data, error } = await CurrencyServices.FIND(filter);
      if (error) {
        return TostifyCustomContainer(
          'error',
          t('common:toast.messages.error'),
          error.message
        );
      }
      if (data) {
        data = data.map((item) => ({
          value: item.id,
          label: `${item.symbol} - ${item.code}`,
          fullValue: item,
          id: currencyId,
        }));
        data = [emptyValue, ...data];

        setSelectOptions((prev) => ({
          ...prev,
          currency: data,
        }));
      }
      handleCurrencyChange(data.find((item) => item.fullValue === {}));
      setLoaders((prev) => prev.filter((item) => item !== 'currency'));
    } catch (error) {
      return TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        error.message
      );
    }
  };

  const handleInitialValue = () => {
    let initialCurrency = selectOptions.currency.filter(
      (ccy) => ccy?.value === initialSelect
    )[0];

    setSelectedCurrency(initialCurrency);
    setCurrency(initialCurrency?.fullValue?.symbol);
  };

  useEffect(() => {
    handleGetCurrencies();
  }, []);

  useEffect(() => {
    handleInitialValue();
  }, [selectOptions]);

  if (searchForm) {
    return (
      <SelectInputSearchForm
        id={currencyId}
        onChange={handleCurrencyChange}
        isLoading={loaders.includes('currency')}
        isMulti={isMulti}
        isSearchable={true}
        maxLength={10}
        value={selectedCurrency}
        options={loaders.includes('currency') ? [] : selectOptions['currency']}
        placeholder={
          <>
            {isMandatory ? (
              <>
                {t('common:currency.currency-label')}
                <sup className={'mandatory__field'}>*</sup>
              </>
            ) : (
              t('common:currency.currency-label')
            )}
          </>
        }
      />
    );
  }
  return (
    <SelectInputSubmit
      id={currencyId}
      onChange={handleCurrencyChange}
      isLoading={loaders.includes('currency')}
      isMulti={isMulti}
      isSearchable={true}
      maxLength={10}
      value={selectedCurrency}
      options={loaders.includes('currency') ? [] : selectOptions['currency']}
      placeholder={
        <>
          {isMandatory ? (
            <>
              {t('common:currency.currency-label')}
              <sup className={'mandatory__field'}>*</sup>
            </>
          ) : (
            t('common:currency.currency-label')
          )}
        </>
      }
    />
  );
};

CurrencyInput.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

CurrencyInput.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(CurrencyInput);
