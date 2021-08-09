//Base Required for The page functionality
import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
//Inner Submit Page Components & Other Custom made components
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import RealEstateValidation from './realEstateValidation';
import { RealEstateListingServices } from 'services';
import { ContactHours, SocialLinks } from 'components/common';
import GeneralInformation from '../RealEstateForm/GeneralInformation';
import DetailInformation from '../RealEstateForm/DetailInformation';
import Gallery from '../RealEstateForm/Gallery';
import Preview from '../RealEstateForm/Preview';
import moment from 'moment';
import { defaultExpiryDays, dayCostRealEstate } from 'constants/listingDetails';
import { ListingPayment, SpinnerModal, StripeContainer } from '../index';
import useSubscription from 'hooks/useSubscription';
import usePostInputValues from 'hooks/usePostInputValues';
import { useRouter } from 'next/router';
import { addDays } from 'utils/standaloneFunctions';

const RealEstatePost = (props) => {
  const { t, user } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isStripe, setIsStripe] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [submitCurrency, setsubmitCurrency] = useState();
  const [addressPosition, setAddressPosition] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [previewItem, setPreviewItem] = useState({});
  const [paymentModal, setPaymentModal] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
  const [handleInputSubscriptions, getSubscriptions] = useSubscription(
    user?.id,
    'realEstate'
  );
  const initial = {
    tags: [],
    name: '',
    address: '',
    realEstateEmail: '',
    description: '',
    websiteLink: '',
    videoLink: '',
    facebookLink: '',
    instagramLink: '',
    youtubeLink: '',
    twitterLink: '',
    areaMeasurement: 'metter',
  };
  const [
    inputValues,
    setInputValues,
    handleOnChange,
    handleCheckBoxChange,
    handleFeatureItemCheckbox,
  ] = usePostInputValues(initial);

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
    var expiryDate = addDays(new Date(), defaultExpiryDays);
    let payload = {
      isPromotable: paymentDetails?.isPromoted || false,
      name: inputValues?.name || null,
      description: inputValues?.description || null,
      price: inputValues?.price || null,
      rooms: inputValues?.rooms || null,
      area: inputValues?.area || null,
      bathCount: inputValues?.baths || null,
      yearBuilt: inputValues?.yearBuilt || null,
      insertDate: new Date(),
      contactHours: {
        monday_open: inputValues?.monday_open || null,
        monday_close: inputValues?.monday_close || null,
        tuesday_open: inputValues?.tuesday_open || null,
        tuesday_close: inputValues?.tuesday_close || null,
        wednesday_open: inputValues?.wednesday_open || null,
        wednesday_close: inputValues?.wednesday_close || null,
        thursday_open: inputValues?.thursday_open || null,
        thursday_close: inputValues?.thursday_close || null,
        friday_open: inputValues?.friday_open || null,
        friday_close: inputValues?.friday_close || null,
        saturday_open: inputValues?.saturday_open || null,
        saturday_close: inputValues?.saturday_close || null,
        sunday_open: inputValues?.sunday_open || null,
        sunday_close: inputValues?.sunday_close || null,
      },

      socialLinks: {
        facebookLink: inputValues?.facebookLink || null,
        instagramLink: inputValues?.instagramLink || null,
        youtubeLink: inputValues?.youtubeLink || null,
        twitterLink: inputValues?.twitterLink || null,
      },

      //Listing contact info
      phone: inputValues?.phone || null,
      email: inputValues?.realEstateEmail || null,
      websiteLink: inputValues?.websiteLink || null,
      currency: inputValues?.currency || null,
      tags: inputValues?.tags || null,
      category: inputValues?.category || null,
      action: inputValues?.action || null,
      condition: inputValues?.condition || null,
      contactTime: inputValues?.contactTimes || null,

      //address Fields
      country: inputValues?.country || null,
      state: inputValues?.state || null,
      city: inputValues?.city || null,
      fullAddress: inputValues?.address || null,
      zipCode: inputValues?.zipCode || null,

      latitude: inputValues?.latitude || null,
      longitude: inputValues?.longitude || null,

      //End of Address fields

      videoLink: inputValues?.videoLink || null,
      areaMeasurement: inputValues?.areaMeasurement || null,

      //Listing Rent Details
      moveInDate:
        inputValues?.moveInDate ||
        (inputValues?.action == 'rent' && new Date()) ||
        null,
      moveOutDate: inputValues?.moveOutDate || null,

      ultilitiesPrice: {
        coldWater: inputValues?.coldWater || null,
        hotWater: inputValues?.hotWater || null,
        electricity: inputValues?.electricity || null,
        garbage: inputValues?.garbage || null,
        propertyManagement: inputValues?.propertyManagement || null,
        heating: inputValues?.heating || null,
        parking: inputValues?.parking || null,
        others: inputValues?.others || null,
      },
      totalUltilities: inputValues?.totalUltilities || null,

      expiryDate: expiryDate || null,
      user: user?.id || null,
    };
    return payload;
  };

  const handleSubmit = async (e, paymentDetails) => {
    e.preventDefault();

    setPaymentDetails(paymentDetails);
    if (paymentDetails.totalCost) setIsStripe(true);

    console.log(paymentDetails);
  };

  const handleDataSubmit = async (e) => {
    e.preventDefault();

    if (!paymentDetails.totalCost) setIsProcessing(true);

    setIsLoading(true);
    try {
      const listingId = await uploadListing();
      await handleInputSubscriptions(paymentDetails, listingId);

      //Getting the latest data back
      TostifyCustomContainer(
        'success',
        t('common:toast.messages.success'),
        t('common:toast.submit-success')
      );
      getSubscriptions(user.id);
      setTimeout(() => {
        router.push(`/real-estate/${listingId}`);
      }, 1500);
    } catch (e) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('common:toast.server-error')
      );
      return false;
    }
    setIsLoading(false);
    setIsProcessing(false);
    return true;
  };

  //Uploads listing to the database.
  const uploadListing = async () => {
    let payload = PopulatePayload(inputValues);

    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));
    if (inputValues?.listingGallery) {
      inputValues?.listingGallery.forEach((file) => {
        if (file.preview) {
          delete file.preview;
        }
        formData.append(`files.listingGallery`, file);
      });
    }
    const { data, error } = await RealEstateListingServices.CREATE(formData);
    if (error) throw error?.message;

    return data.id;
  };

  // Opens up the first model, if validation is ok.
  const handlePayment = async (e) => {
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
      return;
    }
    setPaymentModal(true);
  };

  // Opportunity to look at the listing preview
  const handlePreview = async (e) => {
    e.preventDefault();
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
      return;
    }
    try {
      let localPreviewItem = PopulatePayload(inputValues);
      localPreviewItem['listingGallery'] = inputValues?.listingGallery;
      localPreviewItem['currency'] = submitCurrency;

      if (inputValues?.action == 'rent') {
        localPreviewItem['moveInDate'] =
          inputValues?.moveInDate && moment(inputValues?.moveInDate || null);
        localPreviewItem['moveOutDate'] =
          inputValues?.moveOutDate && moment(inputValues?.moveOutDate || null);
      }

      let userTags = localPreviewItem?.tags;
      let previewTags = [];
      if (userTags) {
        for (let i = 0; i < userTags.length; ++i) {
          tagOptions.forEach((item, index) => {
            if (item.id == userTags[i]) previewTags.push(item);
          });
        }
      }
      localPreviewItem['tags'] = previewTags;
      setPreviewItem(localPreviewItem);
      setPreviewModal(true);
    } catch (e) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        e.message
      );
    }
  };

  return (
    <div className="submit-container__form">
      <GeneralInformation
        inputValues={inputValues}
        handleOnChange={handleOnChange}
        setInputValues={setInputValues}
        submitCurrency={submitCurrency}
        setsubmitCurrency={setsubmitCurrency}
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
        tagOptions={tagOptions}
        setTagOptions={setTagOptions}
        t={t}
      />
      <Gallery
        inputValues={inputValues}
        handleOnChange={handleOnChange}
        t={t}
      />
      <SocialLinks
        prefix={''}
        inputValues={inputValues}
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
        handleOnChange={handleOnChange}
        t={t}
      />

      <div className="form__button-container">
        <Button
          variant="outline-primary"
          disabled={isLoading}
          onClick={!previewModal ? handlePreview : null}
          size="lg"
          className="button-container__buttonOutline"
        >
          {previewModal ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" />{' '}
              {t('real-estate-submit:form.preview-sneak-peak')}
            </>
          ) : (
            <>{t('real-estate-submit:form.preview')}</>
          )}
        </Button>
        <Button
          variant="primary"
          disabled={isLoading}
          type="submit"
          size="lg"
          className="button-container__button"
          onClick={(e) => handlePayment(e)}
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
      <Preview
        previewModal={previewModal}
        setPreviewModal={setPreviewModal}
        previewItem={previewItem}
        t={t}
      />
      <ListingPayment
        handleDataSubmit={handleDataSubmit}
        setPaymentModal={setPaymentModal}
        dayCost={dayCostRealEstate}
        handleSubmit={handleSubmit}
        paymentModal={paymentModal}
        plan={'realEstate'}
        user={user}
        t={t}
      />
      <SpinnerModal show={isProcessing} onHide={() => setIsProcessing(false)} />
      <StripeContainer
        show={isStripe}
        setIsStripe={setIsStripe}
        paymentDetails={paymentDetails}
        onHide={() => setIsStripe(false)}
        handleDataSubmit={handleDataSubmit}
      />
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(RealEstatePost);
