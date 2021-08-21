import { useEffect } from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: 'none',
    // height: '50px',
    backgroundColor: '#444444',
    boxShadow: 'inset 0px 0px 0px 30px rgba(0, 0, 0, 0.23);',
    paddingLeft: '10px',
    paddingRight: '10px',
    minHeight: '50px',
    boxShadow: 'inset 0px 0px 0px 30px rgba(0, 0, 0, 0.23);',
    ':hover': {
      ...provided[':hover'],
      backgroundColor: 'brown',
    },
    //border: state.isFocused ? '1px solid #a52a2a' : '1px solid #ebedf0',
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'lightgray',
    fontSize: '14px',
    whiteSpace: 'pre',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    width: 20,
    transform: 'translateX(-10px)',
  }),
  loadingIndicator: (provided) => ({
    ...provided,
    position: 'absolute',
    right: '10px',
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
    color: 'lightgray',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : '#707070',
    backgroundColor: state.isSelected ? '#a52a2a' : 'white',
    fontSize: '13px',
    fontWeight: 'bold',
    padding: 6,
    cursor: 'pointer',
    ':active': {
      ...provided[':active'],
      backgroundColor: state.isSelected ? '#a52a2a' : 'rgba(124,32,32,0.2)',
    },
    borderBottom: '1px solid rgba(0, 0, 50, 0.1)',
    ':hover': {
      ...provided[':hover'],
      backgroundColor: state.isSelected ? '#a52a2a' : 'rgba(124,32,32,0.1)',
      color: state.isSelected ? 'white' : '#a52a2a',
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'lightgray',
    fontSize: '14px',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    display: state.isMulti && state.hasValue ? 'none' : 'flex',
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    ':hover': {
      backgroundColor: '#a52a2a',
      color: 'white',
    },
  }),
};

const SelectInputSearchForm = (props) => {
  const {
    value,
    onChange,
    options,
    defaultValue,
    id,
    maxLength,
    placeholder,
    isSearchable,
    isLoading,
    isMulti,
    clearIds,
  } = props;
  let selectRef = null;
  const clearValue = () => {
    selectRef.select.clearValue();
  };
  useEffect(() => {
    if (clearIds?.includes(id)) {
      clearValue();
    }
  }, [clearIds]);

  if (value) {
    return (
      <Select
        ref={(ref) => {
          selectRef = ref;
        }}
        value={value}
        defaultValue={defaultValue}
        isLoading={isLoading || false}
        isSearchable={isSearchable || false}
        onChange={onChange}
        options={options}
        onInputChange={(inputValue) =>
          inputValue.length <= maxLength
            ? inputValue
            : inputValue.substr(0, maxLength)
        }
        isMulti={isMulti}
        styles={customStyles}
        placeholder={placeholder}
        instanceId={id}
      />
    );
  }
  return (
    <Select
      ref={(ref) => {
        selectRef = ref;
      }}
      defaultValue={defaultValue}
      isLoading={isLoading || false}
      isSearchable={isSearchable || false}
      onChange={onChange}
      isMulti={isMulti}
      options={options}
      onInputChange={(inputValue) =>
        inputValue.length <= maxLength
          ? inputValue
          : inputValue.substr(0, maxLength)
      }
      styles={customStyles}
      placeholder={placeholder}
      instanceId={id}
    />
  );
};

export default SelectInputSearchForm;
