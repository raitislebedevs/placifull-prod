import * as Yup from 'yup';

const RealEstateValidation = async (inputValues, t) => {
  let RealEstateSchema = getRealEstateSchema(inputValues?.category, t);

  let schemaResult = await RealEstateSchema.validate(inputValues, {
    abortEarly: false,
  }).catch((error) => {
    return error;
  });
  return schemaResult;
};

const getRealEstateSchema = (category, t) => {
  let isCategory = ['exclusive', 'houses', 'apartments', 'farmhouse'].indexOf(
    category
  );

  if (!category || isCategory != -1) {
    return Yup.object().shape({
      name: Yup.string().required(t('validation:common.name')),
      currency: Yup.string().required(t('validation:common.currency.required')),

      category: Yup.string().required(t('validation:common.category')),
      condition: Yup.string().required(t('validation:common.condition')),
      action: Yup.string().required(t('validation:common.action')),

      rooms: Yup.string().required(t('validation:real-estate.rooms')),
      area: Yup.string().required(t('validation:real-estate.area')),
      baths: Yup.string().required(t('validation:real-estate.baths')),

      country: Yup.string().required(t('validation:common.country')),
      city: Yup.string().optional(t('validation:common.city')),

      description: Yup.string()
        .min(10, t('validation:common.description.minLength'))
        .max(5750, t('validation:common.description.maxLength'))
        .required(t('validation:common.description.required')),

      price: Yup.string()
        .min(0, t('validation:common.price.minLength'))
        .max(20, t('validation:common.price.maxLength'))
        .required(t('validation:common.price.required')),

      longitude: Yup.string().required(
        t('validation:real-estate.address.mapPoint')
      ),
      address: Yup.string().required(
        t('validation:real-estate.address.address')
      ),

      phone: Yup.string()
        .min(6, t('validation:common.phone.minLength'))
        .max(20, t('validation:common.phone.minLength'))
        .required(t('validation:common.phone.required')),
      realEstateEmail: Yup.string()
        .email(t('validation:common.email.valid'))
        .required(t('validation:common.email.required')),
      contactTimes: Yup.string().required(
        t('validation:common.contact.required')
      ),
      listingGallery: Yup.array().min(1, t('validation:common.gallery')),
    });
  }
  return Yup.object().shape({
    name: Yup.string().required(t('validation:common.name')),
    currency: Yup.string().required(t('validation:common.currency.required')),

    category: Yup.string().required(t('validation:common.category')),
    condition: Yup.string().required(t('validation:common.condition')),
    action: Yup.string().required(t('validation:common.action')),

    country: Yup.string().required(t('validation:common.country')),
    city: Yup.string().optional(t('validation:common.city')),

    description: Yup.string()
      .min(10, t('validation:common.description.minLength'))
      .max(1000, t('validation:common.description.maxLength'))
      .required(t('validation:common.description.required')),

    price: Yup.string()
      .min(0, t('validation:common.price.minLength'))
      .max(20, t('validation:common.price.maxLength'))
      .required(t('validation:common.price.required')),

    longitude: Yup.string().required(
      t('validation:real-estate.address.mapPoint')
    ),
    address: Yup.string().required(t('validation:real-estate.address.address')),

    phone: Yup.string()
      .min(6, t('validation:common.phone.minLength'))
      .max(20, t('validation:common.phone.minLength'))
      .required(t('validation:common.phone.required')),
    realEstateEmail: Yup.string()
      .email(t('validation:common.email.valid'))
      .required(t('validation:common.email.required')),
    contactTimes: Yup.string().required(
      t('validation:common.contact.required')
    ),
    listingGallery: Yup.array().min(1, t('validation:common.gallery')),
  });
};

export default RealEstateValidation;
