import { useState, useEffect } from 'react';
import Flags from 'country-flag-icons/react/3x2';
import Select, { components } from 'react-select';
import { i18n, withTranslation } from 'i18n';
import languages from './languages.js';
import LanguageService from 'services/languageService.js';
const ipLocation = require('iplocation');

const Option = ({ children, value, ...props }) => {
  const CountryFlag = Flags[value.flag];
  return (
    <components.Option {...props}>
      <CountryFlag className="select-flags" /> {children}
    </components.Option>
  );
};

const SingleValue = ({ children, getValue, ...props }) => {
  const flag = getValue()[0].value.flag;
  const CountryFlag = Flags[flag];
  return (
    <components.SingleValue {...props}>
      <CountryFlag className="select-flags" /> {children}
    </components.SingleValue>
  );
};

const LanguageSelect = (props) => {
  const { showNavbarLight } = props;

  const getLocalLanguage = async () => {
    if (localStorage.getItem('countryCode')) {
      return true;
    }
    const local = await LanguageService.LOCAL();
    if (!local?.IPv4) {
      return true;
    }
    const result = await ipLocation(local.IPv4);
    localStorage.setItem('countryCode', result?.country?.code.toLowerCase());

    let localLanguage = languages.filter((item) => {
      if (result?.country?.code.toLowerCase() === item.value.lang) return item;
    })[0];

    if (localLanguage) {
      setLanguage(localLanguage);
      return i18n.changeLanguage(localLanguage.value.lang);
    }

    const languageCode = result.country.languages.filter((language) => {
      let localFound = languages.filter((item) => {
        if (language.substring(0, 2) === item.value.lang) return item;
      })[0];

      return localFound;
    })[0];

    localLanguage = languages.filter((item) => {
      if (languageCode.toLowerCase() === item.value.lang) return item;
    })[0];
    if (localLanguage) {
      setLanguage(localLanguage);
      return i18n.changeLanguage(localLanguage.value.lang);
    }
    return true;
  };

  const [language, setLanguage] = useState(languages[0]);

  useEffect(async () => {
    const currentLanguage = languages.find(
      (lang) => lang.value.lang === i18n.language
    );
    const noLanguages = await getLocalLanguage();
    if (noLanguages === true) {
      setLanguage(currentLanguage);
    }
  }, []);

  const handleLanguageChange = (e) => {
    setLanguage(e);
    i18n.changeLanguage(e.value.lang);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      width: 150,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      cursor: 'pointer',
    }),
    indicatorSeparator: () => {},
    indicatorsContainer: (provided) => ({
      ...provided,
      width: 20,
      transform: 'translateX(-8px)',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      marginTop: 0,
      borderRadius: 0,
      boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.15)',
    }),
    menuList: (provided) => ({
      ...provided,
      paddingBottom: 0,
    }),
    input: (provided) => ({
      ...provided,
      userSelect: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : '#707070',
      backgroundColor: state.isSelected ? '#a52a2a' : 'white',
      fontSize: '13px',
      fontWeight: 'bold',
      padding: 10,
      cursor: 'pointer',
      ':active': {
        ...provided[':active'],
        backgroundColor: state.isSelected
          ? '#a52a2a'
          : 'rgba(255, 255, 255, 0.75)',
      },
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      ':hover': {
        ...provided[':hover'],
        backgroundColor: state.isSelected
          ? '#a52a2a'
          : 'rgba(255, 255, 255, 0.75)',
        color: state.isSelected ? 'white' : '#a52a2a',
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: showNavbarLight ? '#686262' : 'rgba(255, 255, 255, 0.75)',
      fontSize: '13px',
    }),
  };

  return (
    <Select
      components={{ Option, SingleValue }}
      defaultValue={languages[0]}
      isSearchable={false}
      value={language}
      onChange={handleLanguageChange}
      options={languages}
      styles={customStyles}
      instanceId="languageSelect"
    />
  );
};

export default withTranslation('navbar')(LanguageSelect);
