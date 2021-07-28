import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { TransportListingService } from 'services';
import TransportValidation from './transportValidation';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { ContactHours, SocialLinks } from 'components/common';
import GeneralInformation from '../TransportForm/GeneralInformation';
import DetailInformation from '../TransportForm/DetailInformation';
import Gallery from '../TransportForm/Gallery';
import Preview from '../TransportForm/Preview';
import { ListingPayment, StripeContainer } from '../index';
import { dayCostTransport, defaultExpiryDays } from 'constants/listingDetails';
import useSubscription from 'hooks/useSubscription';
import usePostInputValues from 'hooks/usePostInputValues';
import { addDays } from 'utils/standaloneFunctions';

const TransportSubmit = (props) => {
  const { t, user } = props;
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);
  const [isStripe, setIsStripe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreview, setPreview] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [previewTransportModal, setPreviewTransportModal] = useState(false);
  const [addressPosition, setAddressPosition] = useState(null);
  const [previewItem, setPreviewItem] = useState({});
  const [submitCurrency, setsubmitCurrency] = useState();
  const [paymentModal, setPaymentModal] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
  const [handleInputSubscriptions, getSubscriptions] = useSubscription(
    user?.id,
    'transport'
  );
  useEffect(() => {
    if (addressPosition?.position) {
      setInputValues((prev) => ({
        ...prev,
        longitude: addressPosition?.position?.lng,
        latitude: addressPosition?.position?.lat,
      }));
    }
  }, [addressPosition]);

  const initial = {
    tags: [],
    transportName: '',
    transportEmail: '',
    transportBrand: '',
    transportModel: '',
    transportWebsiteLink: '',
    transportVideoLink: '',
    transportfacebookLink: '',
    transportinstagramLink: '',
    transportyoutubeLink: '',
    transporttwitterLink: '',
    fuelEconomyMesurment: 'litrePerKilometer',
    millageMesurment: 'kilometer',
    speedMesurment: 'kilometerPerHour',
  };

  const [
    inputValues,
    setInputValues,
    handleOnChange,
    handleCheckBoxChange,
    handleFeatureItemCheckbox,
  ] = usePostInputValues(initial);

  const getPayload = (inputValues) => {
    var expiryDate = addDays(new Date(), defaultExpiryDays);

    let payload = {
      name: inputValues?.transportName || null,
      currency: inputValues?.transportCurrency || null,

      transportType: inputValues?.transportType || null,
      action: inputValues?.vehicleAction || null,
      condition: inputValues?.vehicleCondition || null,

      //address Fields
      country: inputValues?.transportCountry || null,
      state: inputValues?.transportState || null,
      city: inputValues?.transportCity || null,
      description: inputValues?.transportDescription || null,
      transportBrand: inputValues?.transportBrand || null,
      transportModel: inputValues?.transportModel || null,
      year: inputValues?.productionYear || null,
      price: inputValues?.transportPrice || null,
      distance: inputValues?.millage || null,
      distanceMesurment: inputValues?.millageMesurment || null,
      maxSpeed: inputValues?.maxSpeed || null,
      speedMesurment: inputValues?.speedMesurment || null,
      fuelEconomy: inputValues?.fuelEconomy || null,
      fuelEconomyMesurment: inputValues?.fuelEconomyMesurment || null,
      numberOfSeats: inputValues?.numberOfSeats || null,
      numberOfDoors: inputValues?.numberOfDoors || null,
      engineType: inputValues?.engineType || null,

      color: inputValues?.color || null,
      gearBox: inputValues?.gearBox || null,

      videoUrl: inputValues?.transportVideoLink || null,

      phone: inputValues?.transportPhone || null,
      email: inputValues?.transportEmail || null,
      websiteLink: inputValues?.websiteLink || null,

      contactTime: inputValues?.transportContactTime || null,
      tags: inputValues?.tags || null,

      meetUpAddress: inputValues?.address || null,
      latitude: inputValues?.latitude || null,
      longitude: inputValues?.longitude || null,

      contactHours: {
        monday_open: inputValues?.transportmonday_open || null,
        monday_close: inputValues?.transportmonday_close || null,
        tuesday_open: inputValues?.transporttuesday_open || null,
        tuesday_close: inputValues?.transporttuesday_close || null,
        wednesday_open: inputValues?.transportwednesday_open || null,
        wednesday_close: inputValues?.transportwednesday_close || null,
        thursday_open: inputValues?.transportthursday_open || null,
        thursday_close: inputValues?.transportthursday_close || null,
        friday_open: inputValues?.transportfriday_open || null,
        friday_close: inputValues?.transportfriday_close || null,
        saturday_open: inputValues?.transportsaturday_open || null,
        saturday_close: inputValues?.transportsaturday_close || null,
        sunday_open: inputValues?.transportsunday_open || null,
        sunday_close: inputValues?.transportsunday_close || null,
      },

      socialLinks: {
        facebookLink: inputValues?.transportfacebookLink || null,
        instagramLink: inputValues?.transportinstagramLink || null,
        youtubeLink: inputValues?.transportyoutubeLink || null,
        twitterLink: inputValues?.transporttwitterLink || null,
      },

      //Specifications.
      insertDate: new Date(),
      user: user?.id || null,
      expiryDate: expiryDate || null,
    };
    return payload;
  };

  const handleSubmit = async (e, paymentDetails) => {
    e.preventDefault();

    setPaymentDetails(paymentDetails);
    setIsStripe(true);
  };

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const listingId = await uploadListing();
      await handleInputSubscriptions(paymentDetails, listingId);

      getSubscriptions(user.id);
      setTimeout(() => {
        router.push(`/transport/${listingId}`);
      }, 1500);
    } catch (e) {
      TostifyCustomContainer('error', t('common:toast.unknown-error'));
      return false;
    }
    setIsLoading(false);
    return true;
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    const { errors } = await TransportValidation(inputValues, t);
    if (errors) {
      for (let i = 0; i < 3; i++) {
        if (errors[i]) TostifyCustomContainer('warning', errors[i]);
      }
      return;
    }
    try {
      let localPreviewItem = getPayload(inputValues);
      localPreviewItem['listingGallery'] = inputValues?.listingGallery;
      localPreviewItem['currency'] = submitCurrency;
      let userTags = localPreviewItem?.tags;
      let previewTags = [];
      if (userTags) {
        for (let i = 0; i < userTags.length; ++i) {
          tagOptions.forEach((item, index) => {
            if (item.id == userTags[i]) previewTags.push(item);
          });
        }
      }

      localPreviewItem['Applicants'] = [];
      localPreviewItem['tags'] = previewTags;
      setPreviewItem(localPreviewItem);
      setPreviewTransportModal(true);
    } catch (e) {
      TostifyCustomContainer('error', e.message);
    }

    setPreview(false);
  };

  const uploadListing = async () => {
    let payload = getPayload(inputValues);
    //Generating the Payload message
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

    const { data, error } = await TransportListingService.CREATE(formData);
    if (error) throw error?.message;
    TostifyCustomContainer('success', t('common:toast.submit-success'));
    setIsLoading(false);
    return data.id;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      TostifyCustomContainer('info', t('common:toast.logging-required'));
      return;
    }
    const { errors } = await TransportValidation(inputValues, t);
    if (errors) {
      for (let i = 0; i < 3; i++) {
        if (errors[i]) TostifyCustomContainer('warning', errors[i]);
      }
      return;
    }

    setPaymentModal(true);
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
      <Gallery
        inputValues={inputValues}
        handleOnChange={handleOnChange}
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
      <SocialLinks
        prefix="transport"
        inputValues={inputValues}
        handleOnChange={handleOnChange}
        t={t}
      />
      <ContactHours
        prefix="transport"
        sectionHeading={t('transport-submit:form.contact-hours.heading')}
        sectionHeadingTip={t('transport-submit:form.contact-hours.heading-tip')}
        heading={t('transport-submit:form.contact-hours.accordion.heading')}
        inputValues={inputValues}
        handleOnChange={handleOnChange}
        t={t}
      />

      <div className="form__button-container">
        <Button
          variant="outline-primary"
          disabled={isPreview || isLoading}
          onClick={!isPreview ? handlePreview : null}
          size="lg"
          className="button-container__buttonOutline"
        >
          {isPreview ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" />{' '}
              {t('transport-submit:form.preview-sneak-peak')}
            </>
          ) : (
            <>{t('transport-submit:form.preview')}</>
          )}
        </Button>
        <Button
          variant="primary"
          disabled={isLoading || isPreview}
          type="submit"
          size="lg"
          className="button-container__button"
          onClick={(e) => handlePayment(e)}
        >
          {isLoading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" />{' '}
              {t('transport-submit:form.submit')}
            </>
          ) : (
            <>{t('transport-submit:form.submit')}</>
          )}
        </Button>
      </div>
      <Preview
        previewModal={previewTransportModal}
        setPreviewModal={setPreviewTransportModal}
        previewItem={previewItem}
        t={t}
      />
      <ListingPayment
        handleSubmit={handleSubmit}
        paymentModal={paymentModal}
        setPaymentModal={setPaymentModal}
        user={user}
        plan={'transport'}
        dayCost={dayCostTransport}
        t={t}
      />
      <StripeContainer
        handleDataSubmit={handleDataSubmit}
        show={isStripe}
        setIsStripe={setIsStripe}
        paymentDetails={paymentDetails}
        onHide={() => setIsStripe(false)}
      />
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(TransportSubmit);
