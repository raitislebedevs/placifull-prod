//Base Required for The page functionality
import { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
//Inner Submit Page Components & Other Custom made components
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import RealEstateValidation from './realEstateValidation';
import { RealEstateListingServices, FileServices } from 'services';
import Gallery from '../RealEstateForm/Gallery';
import { ContactHours, SocialLinks } from 'components/common';
import GeneralInformation from '../RealEstateForm/GeneralInformation';
import DetailInformation from '../RealEstateForm/DetailInformation';

const RealEstateEdit = (props) => {
  const { t, user, item, tags } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [submitCurrency, setsubmitCurrency] = useState();
  const [addressPosition, setAddressPosition] = useState(null);
  const [tagOptions, setTagOptions] = useState([]);
  const [inputValues, setInputValues] = useState({
    name: item?.name || '',
    price: item?.price || null,
    category: item?.category || null,
    action: item?.action || null,
    condition: item?.condition || null,
    currency: item?.currency?.id || null,
    contactHours: item?.contactHours || null,
    contactTimes: item?.contactTime || null,

    rooms: item?.rooms || null,
    area: item?.area || null,
    baths: item?.bathCount || null,
    apartmentInFloor: item?.inFloor || null,
    floorCount: item?.floors || null,
    yearBuilt: item?.yearBuilt || null,
    price: item?.price || null,

    country: item?.country.id || null,
    state: item?.state.id || null,
    city: item?.city.id || null,
    fullAddress: item?.fullAddress || null,
    zipCode: item?.zipCode || null,
    latitude: item?.latitude || null,
    longitude: item?.longitude || null,
    description: item?.description || null,
    address: item?.fullAddress || null,
    realEstateEmail: item?.email || null,

    tags: tags,
    coldWater: item?.ultilitiesPrice?.coldWater || null,
    hotWater: item?.ultilitiesPrice?.hotWater || null,
    electricity: item?.ultilitiesPrice?.electricity || null,
    garbage: item?.ultilitiesPrice?.garbage || null,
    propertyManagement: item?.ultilitiesPrice?.propertyManagement || null,
    heating: item?.ultilitiesPrice?.heating || null,
    parking: item?.ultilitiesPrice?.parking || null,
    others: item?.ultilitiesPrice?.others || null,
    totalUltilities: item?.totalUltilities || null,
  });

  const [initTags, setInitTags] = useState(tags);

  const getCountryName = (item) => {
    if (item.native) {
      return `${item.native}/${item.name}`;
    }
    if (item.native == item.name) {
      return item.name;
    }
    return item.name;
  };

  const initialLocationValues = {
    country: {
      init: true,
      id: 'country',
      label: getCountryName(item?.country),
      value: item?.country?.id,
    },
    state: {
      id: 'state',
      label: item?.state.name,
      value: item?.state.id,
    },
    city: {
      id: 'city',
      label: item?.city.name,
      value: item?.city.id,
    },
  };

  const initialNumberValues = {
    rooms: item?.rooms || null,
    area: item?.area || null,
    baths: item?.bathCount || null,
    apartmentInFloor: item?.inFloor || null,
    floorCount: item?.floors || null,
    yearBuilt: item?.yearBuilt || null,
    price: item?.price || null,
  };

  let initialRichText = item?.description;

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
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

  useEffect(() => {
    if (addressPosition?.position) {
      setInputValues((prev) => ({
        ...prev,
        longitude: addressPosition?.position?.lng,
        latitude: addressPosition?.position?.lat,
      }));
    }
  }, [addressPosition]);

  const PopulatePayload = (inputValues) => {
    let payload = {
      name: inputValues?.name || item?.name || null,
      description: inputValues?.description || item?.description || null,
      price: inputValues?.price || item?.price || null,
      rooms: inputValues?.rooms || item?.rooms || null,
      area: inputValues?.area || item?.area || null,
      bathCount: inputValues?.baths || item?.bathCount || null,
      yearBuilt: inputValues?.yearBuilt || item?.yearBuilt || null,
      insertDate: item.insertDate,
      contactHours: {
        monday_open:
          inputValues?.monday_open || item?.contactHours.monday_open || null,
        monday_close:
          inputValues?.monday_close || item?.contactHours.monday_close || null,
        tuesday_open:
          inputValues?.tuesday_open || item?.contactHours.tuesday_open || null,
        tuesday_close:
          inputValues?.tuesday_close ||
          item?.contactHours.tuesday_close ||
          null,
        wednesday_open:
          inputValues?.wednesday_open ||
          item?.contactHours.wednesday_open ||
          null,
        wednesday_close:
          inputValues?.wednesday_close ||
          item?.contactHours.wednesday_close ||
          null,
        thursday_open:
          inputValues?.thursday_open ||
          item?.contactHours.thursday_open ||
          null,
        thursday_close:
          inputValues?.thursday_close ||
          item?.contactHours.thursday_close ||
          null,
        friday_open:
          inputValues?.friday_open || item?.contactHours.friday_open || null,
        friday_close:
          inputValues?.friday_close || item?.contactHours.friday_close || null,
        saturday_open:
          inputValues?.saturday_open ||
          item?.contactHours.saturday_open ||
          null,
        saturday_close:
          inputValues?.saturday_close ||
          item?.contactHours.saturday_close ||
          null,
        sunday_open:
          inputValues?.sunday_open || item?.contactHours.sunday_open || null,
        sunday_close:
          inputValues?.sunday_close || item?.contactHours.sunday_close || null,
      },

      socialLinks: {
        facebookLink:
          inputValues?.facebookLink || item?.socialLinks.facebookLink || null,
        instagramLink:
          inputValues?.instagramLink || item?.socialLinks.instagramLink || null,
        youtubeLink:
          inputValues?.youtubeLink || item?.socialLinks.youtubeLink || null,
        twitterLink:
          inputValues?.twitterLink || item?.socialLinks.twitterLink || null,
      },

      //Listing contact info
      phone: inputValues?.phone || item?.phone || null,
      email: inputValues?.realEstateEmail || item?.email || null,
      websiteLink: inputValues?.websiteLink || item?.websiteLink || null,
      currency: inputValues?.currency || item?.currency || null,
      tags: inputValues?.tags || item?.tags || null,
      category: inputValues?.category || item?.category || null,
      action: inputValues?.action || item?.action || null,
      condition: inputValues?.condition || item?.condition || null,
      contactTime: inputValues?.contactTimes || item?.contactTime || null,

      //address Fields
      country: inputValues?.country || item?.country.id || null,
      state: inputValues?.state || item?.state.id || null,
      city: inputValues?.city || item?.city.id || null,
      fullAddress: inputValues?.address || item?.fullAddress || null,
      zipCode: inputValues?.zipCode || item?.zipCode || null,

      latitude: inputValues?.latitude || item?.latitude || null,
      longitude: inputValues?.longitude || item?.longitude || null,

      //End of Address fields

      videoLink: inputValues?.videoLink || item?.videoLink || null,
      areaMeasurement:
        inputValues?.areaMeasurement || item?.areaMeasurement || null,

      inFloor: inputValues?.apartmentInFloor || item?.inFloor || null,
      floors: inputValues?.floorCount || item?.floors || null,
      //Listing Rent Details
      moveInDate:
        inputValues?.moveInDate ||
        (inputValues?.action == 'rent' && new Date()) ||
        item?.moveInDate ||
        null,
      moveOutDate: inputValues?.moveOutDate || item?.moveOutDate || null,

      ultilitiesPrice: {
        coldWater: inputValues?.coldWater || item?.coldWater || null,
        hotWater: inputValues?.hotWater || item?.hotWater || null,
        electricity: inputValues?.electricity || item?.electricity || null,
        garbage: inputValues?.garbage || item?.garbage || null,
        propertyManagement:
          inputValues?.propertyManagement || item?.propertyManagement || null,
        heating: inputValues?.heating || item?.heating || null,
        parking: inputValues?.parking || item?.parking || null,
        others: inputValues?.others || item?.others || null,
      },
      totalUltilities:
        inputValues?.totalUltilities || item?.totalUltilities || null,
      user: user?.id || item.user || null,
    };
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let payload = PopulatePayload(inputValues);

      e.preventDefault();

      if (!user?.id) {
        TostifyCustomContainer(
          'info',
          t('common:toast.messages.info'),
          t('common:toast.logging-required')
        );
        return;
      }
      const { errors } = await RealEstateValidation(inputValues, t);
      if (errors) {
        for (let i = 0; i < 3; i++) {
          if (errors[i])
            TostifyCustomContainer(
              'warning',
              t('common:toast.messages.warning'),
              errors[i]
            );
        }
        setIsLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append('data', JSON.stringify(payload));
      if (inputValues?.listingGallery) {
        await item?.listingGallery.forEach(async (element) => {
          console.log(element);
          await FileServices.DELETE_FILE(element.id);
        });

        // inputValues?.listingGallery.forEach((file) => {
        //   formData.append(`files.listingGallery`, file);
        // });
      }
      const { data, error } = await RealEstateListingServices.UPDATE(
        item.id,
        formData
      );
      if (error) throw error?.message;
    } catch (e) {
      setIsLoading(false);
      return TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('common:toast.server-error')
      );
    }
    TostifyCustomContainer(
      'success',
      t('common:toast.messages.success'),
      t('common:toast.submit-success')
    );
    setIsLoading(false);
  };

  return (
    <Form className="submit-container__form" onSubmit={handleSubmit}>
      <GeneralInformation
        inputValues={inputValues}
        handleOnChange={handleOnChange}
        setInputValues={setInputValues}
        submitCurrency={submitCurrency}
        initialValues={initialLocationValues}
        setsubmitCurrency={setsubmitCurrency}
        initialRichText={initialRichText}
        initialItem={item}
        initialNumberValues={initialNumberValues}
        t={t}
      />
      <DetailInformation
        inputValues={inputValues}
        addressPosition={addressPosition}
        setAddressPosition={setAddressPosition}
        handleCheckBoxChange={handleCheckBoxChange}
        handleFeatureItemCheckbox={handleFeatureItemCheckbox}
        handleOnChange={handleOnChange}
        submitCurrency={submitCurrency}
        initialNumberValues={initialNumberValues}
        tagOptions={tagOptions}
        initTags={initTags}
        initialCoordinates={{
          longitude: item?.longitude,
          latitude: item?.latitude,
        }}
        initialAddress={item?.fullAddress}
        setTagOptions={setTagOptions}
        initialItem={item}
        t={t}
      />
      <Gallery
        inputValues={inputValues}
        handleOnChange={handleOnChange}
        initialItem={item}
        t={t}
      />
      <SocialLinks
        prefix={''}
        inputValues={inputValues}
        initialItem={item}
        handleOnChange={handleOnChange}
        t={t}
      />
      <ContactHours
        prefix={''}
        sectionHeading={t('real-estate-submit:form.contact-hours.heading')}
        sectionHeadingTip={t(
          'real-estate-submit:form.contact-hours.heading-tip'
        )}
        heading={t('real-estate-submit:form.contact-hours.accordion.heading')}
        inputValues={inputValues}
        initialItem={item}
        setInputValues={setInputValues}
        handleOnChange={handleOnChange}
        t={t}
      />
      <div className="form__button-container">
        <Button
          variant="primary"
          disabled={isLoading}
          type="submit"
          size="lg"
          className="button-container__button"
        >
          {isLoading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" />{' '}
              {t('real-estate-submit:form.submit-confirm')}
            </>
          ) : (
            <>{t('real-estate-submit:form.submit')}</>
          )}
        </Button>
      </div>
    </Form>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(RealEstateEdit);
