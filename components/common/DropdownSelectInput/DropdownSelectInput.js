import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: '100%',
    cursor: 'pointer',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: 'none',
    border: '1px solid #dee2e6',
    height: '48px',
    ':hover': {
      ...provided[':hover'],
      border: '1px solid  #b1b1b1',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: '0.375rem',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'dimgrey',
    fontSize: '14px',
    whiteSpace: 'pre',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    width: 20,
    transform: 'translateX(-10px)',
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
    padding: 6,
    cursor: 'pointer',
    ':active': {
      ...provided[':active'],
      backgroundColor: state.isSelected ? '#a52a2a' : 'rgba(124,32,32,0.2)',
    },
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    ':hover': {
      ...provided[':hover'],
      backgroundColor: state.isSelected ? '#a52a2a' : 'rgba(124,32,32,0.1)',
      color: state.isSelected ? 'white' : '#a52a2a',
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'dimgrey',
    fontSize: '14px',
  }),
};

const DropdownSelectInput = (props) => {
  const { value, onChange, options, defaultValue, id, placeholder } = props;
  return (
    <Select
      defaultValue={defaultValue}
      isSearchable={false}
      onChange={onChange}
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      instanceId={id}
    />
  );
};

export default DropdownSelectInput;
