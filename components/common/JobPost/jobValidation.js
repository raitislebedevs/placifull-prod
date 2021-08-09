import * as Yup from 'yup';

const JobValidation = async (inputValues, t) => {
  let validationSchema = Yup.object().shape({
    vacancyOption: Yup.string().required(t('validation:common.category')),
    contractType: Yup.string().required(t('validation:common.action')),
    workingTime: Yup.string().required(t('validation:common.condition')),
    jobCountry: Yup.string().required(t('validation:common.country')),
    jobDescription: Yup.string()
      .min(10, t('validation:common.description.minLength'))
      .max(2000, t('validation:common.description.maxLength'))
      .required(t('validation:common.description.required')),

    jobRequirements: Yup.string()
      .min(10, t('validation:common.description.minLength'))
      .max(2000, t('validation:common.description.maxLength')),

    jobOffer: Yup.string()
      .min(10, t('validation:common.description.minLength'))
      .max(2000, t('validation:common.description.maxLength')),

    jobPhone: Yup.string()
      .min(6, t('validation:common.phone.minLength'))
      .max(20, t('validation:common.phone.minLength'))
      .required(t('validation:common.phone.required')),
    jobEmail: Yup.string()
      .email(t('validation:common.email.valid'))
      .required(t('validation:common.email.required')),
    officeAddress: Yup.string().required(t('validation:job.address.address')),
    longitude: Yup.string().required(t('validation:job.address.mapPoint')),

    monthlySalaryFrom: Yup.number().required(t('validation:job.monthly-from')),
    monthlySalaryTo: Yup.number().required(t('validation:job.monthly-to')),

    jobContactTimes: Yup.string().required(
      t('validation:common.contact.required')
    ),

    size: Yup.number()
      .required(t('validation:job.gallery'))
      .max(5242880, t('validation:job.logo-size')),
  });

  let schemaResult = await validationSchema
    .validate(inputValues, { abortEarly: false })
    .catch((error) => {
      return error;
    });
  return schemaResult;
};

export default JobValidation;
