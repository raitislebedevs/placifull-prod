import { useState } from 'react';

const useJobPost = (initial) => {
  const [inputValues, setInputValues] = useState(initial);

  const handleOnChange = (event) => {
    if (event?.hourlySalaryFrom) {
      setInputValues({
        ...inputValues,
        hourlySalaryFrom: event.hourlySalaryFrom,
        monthlySalaryFrom: event.monthlySalaryFrom,
        annualSalaryFrom: event.annualSalaryFrom,
      });
      if (event?.hourlySalaryTo) {
        setInputValues({
          ...inputValues,
          hourlySalaryTo: event.hourlySalaryTo,
          monthlySalaryTo: event.monthlySalaryTo,
          annualSalaryTo: event.annualSalaryTo,
        });
        return;
      }
      return;
    }

    if (event?.hourlySalaryTo) {
      setInputValues({
        ...inputValues,
        hourlySalaryTo: event.hourlySalaryTo,
        monthlySalaryTo: event.monthlySalaryTo,
        annualSalaryTo: event.annualSalaryTo,
      });
      if (event?.hourlySalaryFrom) {
        setInputValues({
          ...inputValues,
          hourlySalaryFrom: event.hourlySalaryFrom,
          monthlySalaryFrom: event.monthlySalaryFrom,
          annualSalaryFrom: event.annualSalaryFrom,
        });
        return;
      }
      return;
    }
    const value =
      event?.target?.value ?? event?.value ?? event?.languageList ?? event;
    const id = event?.target?.id ?? event?.id ?? event[0]?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const handleCheckBoxChange = (event) => {
    const value = event?.target?.checked;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const handleFeatureItemCheckbox = (event) => {
    if (event?.target?.checked) {
      setInputValues((prev) => ({
        ...inputValues,
        tags: [...prev.tags, event?.target?.id],
      }));
    } else {
      setInputValues((prev) => ({
        ...inputValues,
        tags: [...prev.tags.filter((item) => item !== event?.target?.id)],
      }));
    }
  };

  return [
    inputValues,
    setInputValues,
    handleOnChange,
    handleCheckBoxChange,
    handleFeatureItemCheckbox,
  ];
};

export default useJobPost;
