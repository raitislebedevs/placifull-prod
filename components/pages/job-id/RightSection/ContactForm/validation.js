import * as Yup from 'yup';

const validation = async (inputValues, t) => {
  let ContactSchema = Yup.object().shape({
    fullName: Yup.string().required(t('validation:common.email.full-name')),
    phoneNumber: Yup.string()
      .min(6, t('validation:common.phone.minLength'))
      .max(20, t('validation:common.phone.maxLength'))
      .required(t('validation:common.phone.required')),
    emailId: Yup.string()
      .email(t('validation:common.email.valid'))
      .required(t('validation:common.email.required')),
    message: Yup.string().required(t('validation:common.email.message')),
  });

  let schemaResult = await ContactSchema.validate(inputValues, {
    abortEarly: false,
  }).catch((error) => {
    return error;
  });
  return schemaResult;
};

export default validation;
