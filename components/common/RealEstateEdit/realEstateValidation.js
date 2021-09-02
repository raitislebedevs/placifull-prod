import * as Yup from 'yup';

const RealEstateValidation = async (inputValues, t) => {
  let RealEstateSchema = Yup.object().shape({
    name: Yup.string().required(t('real-estate-validation:name')),
    category: Yup.string().required(t('real-estate-validation:type')),
    condition: Yup.string().required(t('real-estate-validation:condition')),
    country: Yup.string().required(t('real-estate-validation:country')),
    currency: Yup.string().required(
      t('real-estate-validation:currency.required')
    ),
    longitude: Yup.string().required(
      t('real-estate-validation:address.mapPoint')
    ),
    fullAddress: Yup.string().required(
      t('real-estate-validation:address.address')
    ),
    description: Yup.string()
      .min(10, t('real-estate-validation:description.minLength'))
      .max(1250, t('real-estate-validation:description.maxLength'))
      .required(t('real-estate-validation:description.required')),
    action: Yup.string().required(t('real-estate-validation:action')),
    price: Yup.string()
      .min(0, t('real-estate-validation:price.minLength'))
      .max(20, t('real-estate-validation:price.maxLength'))
      .required(t('real-estate-validation:price.required')),
    phone: Yup.string()
      .min(6, t('real-estate-validation:phone.minLength'))
      .max(20, t('real-estate-validation:phone.minLength'))
      .required(t('real-estate-validation:phone.required')),
    email: Yup.string()
      .email(t('real-estate-validation:email.valid'))
      .required(t('real-estate-validation:email.required')),
    contactTime: Yup.string().required(
      t('real-estate-validation:contact.required')
    ),
  });

  let schemaResult = await RealEstateSchema.validate(inputValues, {
    abortEarly: false,
  }).catch((error) => {
    return error;
  });
  return schemaResult;
};

export default RealEstateValidation;
