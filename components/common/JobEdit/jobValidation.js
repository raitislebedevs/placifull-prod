import * as Yup from 'yup';

const JobValidation = async (inputValues, t) => {
  let validationSchema = Yup.object().shape({
    vacancyOption: Yup.string().required(t('validation:common.category')),
    contractType: Yup.string().required(t('validation:common.action')),
    workingTime: Yup.string().required(t('validation:common.condition')),
    country: Yup.string().required(t('validation:common.country')),
    positionDescription: Yup.string()
      .min(10, t('validation:common.description.minLength'))
      .max(22500, t('validation:common.description.maxLength'))
      .required(t('validation:common.description.required')),

    positionRequirements: Yup.string()
      .min(10, t('validation:common.description.minLength'))
      .max(22500, t('validation:common.description.maxLength')),

    positionBenefits: Yup.string()
      .min(10, t('validation:common.description.minLength'))
      .max(22500, t('validation:common.description.maxLength')),

    phone: Yup.string()
      .min(6, t('validation:common.phone.minLength'))
      .max(20, t('validation:common.phone.minLength'))
      .required(t('validation:common.phone.required')),
    email: Yup.string()
      .email(t('validation:common.email.valid'))
      .required(t('validation:common.email.required')),
    officeAddress: Yup.string().required(t('validation:job.address.address')),
    longitude: Yup.string().required(t('validation:job.address.mapPoint')),

    monthlySalaryFrom: Yup.number().required(t('validation:job.monthly-from')),
    monthlySalaryTo: Yup.number().required(t('validation:job.monthly-to')),

    contactTime: Yup.string().required(t('validation:common.contact.required')),
  });

  let schemaResult = await validationSchema
    .validate(inputValues, { abortEarly: false })
    .catch((error) => {
      return error;
    });
  return schemaResult;
};

export default JobValidation;
