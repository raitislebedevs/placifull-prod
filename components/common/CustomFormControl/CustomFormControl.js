import { useRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Dropdown from 'react-dropdown';

const CustomFormControl = (props) => {
  const {
    label,
    prepend,
    append,
    placeholderClassName,
    dropdownHandleChange,
    inputValues,
    tReady, //remove from rest to not have an error
    ...rest
  } = props;
  const inputEl = useRef(null);
  const onClickHandler = () => {
    inputEl.current.focus();
  };

  return (
    <>
      {!prepend ? (
        <div
          onClick={() => onClickHandler()}
          className={`form-label-inline ${
            props.value ? 'form-label-inline--has-text' : ''
          }`}
        >
          {label}
        </div>
      ) : (
        ''
      )}
      <InputGroup className="desc__textarea">
        {prepend && (
          <InputGroup.Prepend>
            <Dropdown
              arrowClassName={
                prepend.values.length < 2 ? 'd-none' : 'Dropdown-arrow'
              }
              disabled={prepend.values.length < 2}
              options={prepend?.values}
              id={prepend.id}
              value={
                inputValues?.[prepend.id]
                  ? inputValues[prepend.id]
                  : prepend?.values[0]
              }
              onChange={(e) =>
                dropdownHandleChange({
                  target: { value: e.value, id: prepend.id },
                })
              }
              placeholderClassName={placeholderClassName}
              className="Dropdown-prepend"
            />
          </InputGroup.Prepend>
        )}
        <div
          className={`form-control-container  ${
            append ? 'form-control-container--has-append' : ''
          }`}
        >
          {prepend ? (
            <div
              onClick={() => onClickHandler()}
              className={`form-label-inline ${
                props.value ? 'form-label-inline--has-text' : ''
              }`}
            >
              {label}
            </div>
          ) : (
            ''
          )}
          <Form.Control {...rest} ref={inputEl} />
        </div>
        {append && (
          <InputGroup.Append>
            <Dropdown
              arrowClassName={
                append.values.length < 2 ? 'd-none' : 'Dropdown-arrow'
              }
              disabled={append.values.length < 2}
              options={append.values}
              id={append.id}
              value={
                inputValues?.[append.id]
                  ? inputValues[append.id]
                  : append?.values[0]
              }
              onChange={(e) => {
                dropdownHandleChange({
                  target: { value: e.value, id: append.id },
                });
              }}
              placeholderClassName={placeholderClassName}
              className="Dropdown-append"
            />
          </InputGroup.Append>
        )}
      </InputGroup>
    </>
  );
};

export default CustomFormControl;
