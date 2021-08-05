import * as Yup from 'yup';

const TransportValidation = async (inputValues, t) => {
  let validationSchema = Yup.object().shape({
    transportName: Yup.string().required(t('validation:common.name')),
    transportCurrency: Yup.string().required(
      t('validation:common.currency.required')
    ),

    transportType: Yup.string().required(t('validation:transport.type')),
    vehicleAction: Yup.string().required(t('validation:common.action')),
    vehicleCondition: Yup.string().required(t('validation:common.condition')),
    transportCountry: Yup.string().required(t('validation:common.country')),
    transportDescription: Yup.string()
      .min(10, t('validation:common.description.minLength'))
      .max(2000, t('validation:common.description.maxLength'))
      .required(t('validation:common.description.required')),
    transportBrand: Yup.string()
      .min(0, t('validation:transport.brand.minLength'))
      .max(25, t('validation:transport.brand.minLength'))
      .required(t('validation:transport.brand.required')),
    transportModel: Yup.string()
      .min(0, t('validation:transport.model.minLength'))
      .max(25, t('validation:transport.model.minLength'))
      .required(t('validation:transport.model.required')),
    transportPrice: Yup.string()
      .max(9999999, t('validation:common.price.maxLength'))
      .min(0, t('validation:common.price.minLength'))
      .required(t('validation:common.price.required')),

    engineType: Yup.string().required(t('validation:transport.engine')),
    gearBox: Yup.string().required(t('validation:transport.gear')),

    longitude: Yup.string().required(
      t('validation:transport.address.mapPoint')
    ),
    address: Yup.string().required(t('validation:transport.address.address')),

    transportPhone: Yup.string()
      .min(6, t('validation:common.phone.minLength'))
      .max(20, t('validation:common.phone.minLength'))
      .required(t('validation:common.phone.required')),
    transportEmail: Yup.string()
      .email(t('validation:common.email.valid'))
      .required(t('validation:common.email.required')),
    transportContactTime: Yup.string().required(
      t('validation:common.contact.required')
    ),
    listingGallery: Yup.array().min(1, t('validation:common.gallery')),
  });

  let schemaResult = await validationSchema
    .validate(inputValues, { abortEarly: false })
    .catch((error) => {
      return error;
    });
  return schemaResult;
};

export default TransportValidation;
