import { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { TransportListingService, FileServices } from 'services';
import TransportValidation from './transportValidation';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { ContactHours, SocialLinks } from 'components/common';
import GeneralInformation from '../TransportForm/GeneralInformation';
import DetailInformation from '../TransportForm/DetailInformation';
import Gallery from '../TransportForm/Gallery';

const TransportEdit = (props) => {
  const { t, user, item, tags } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [addressPosition, setAddressPosition] = useState(null);
  const [submitCurrency, setsubmitCurrency] = useState();
  const [tagOptions, setTagOptions] = useState([]);

  const [inputValues, setInputValues] = useState({
    transportName: item?.name || null,
    transportCurrency: item?.currency?.id || null,
    transportType: item?.transportType || null,
    vehicleAction: item?.action || null,
    vehicleCondition: item?.condition || null,
    currency: item?.currency?.id || null,
    contactHours: item?.contactHours || null,
    transportContactTime: item?.contactTime || null,
    transportPrice: item?.price || null,
    address: item?.meetUpAddress || null,
    latitude: item?.latitude || null,
    longitude: item?.longitude || null,
    transportDescription: item?.description || null,
    transportEmail: item?.email || null,
    transportDescription: item?.description || null,
    transportBrand: item?.transportBrand || null,
    transportModel: item?.transportModel || null,
    engineType: item?.engineType || null,
    color: item?.color || null,
    gearBox: item?.gearBox || null,
    tags: tags || null,
  });

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
    transportCountry: {
      init: true,
      id: 'transportCountry',
      label: getCountryName(item?.country),
      value: item?.country?.id,
    },
    transportState: {
      id: 'transportState',
      label: item?.state.name,
      value: item?.state.id,
    },
    transportCity: {
      id: 'transportCity',
      label: item?.city.name,
      value: item?.city.id,
    },
  };

  const initilizedValues = {
    transportBrand: item?.transportBrand || null,
    transportModel: item?.transportModel || null,
    productionYear: item?.year || null,
    transportPrice: item?.price || null,
    millage: item?.distance || null,
    millageMesurment: item?.distanceMesurment || null,
    maxSpeed: item?.maxSpeed || null,
    speedMesurment: item?.speedMesurment || null,
    fuelEconomy: item?.fuelEconomy || null,
    fuelEconomyMesurment: item?.fuelEconomyMesurment || null,
    numberOfSeats: item?.numberOfSeats || null,
    numberOfDoors: item?.numberOfDoors || null,

    transportVideoLink: item?.videoUrl || null,
    transportEmail: item?.email || null,
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

  const getPayload = () => {
    let payload = {
      isPromotable: item?.isPromotable,
      name: inputValues?.transportName || item?.name || null,
      currency: inputValues?.transportCurrency || item?.currency || null,

      transportType: inputValues?.transportType || item?.transportType || null,
      action: inputValues?.vehicleAction || item?.action || null,
      condition: inputValues?.vehicleCondition || item?.condition || null,

      //address Fields
      country: inputValues?.transportCountry || item?.country.id || null,
      state: inputValues?.transportState || item?.state.id || null,
      city: inputValues?.transportCity || item?.city.id || null,
      description:
        inputValues?.transportDescription || item?.description || null,
      transportBrand:
        inputValues?.transportBrand || item?.transportBrand || null,
      transportModel:
        inputValues?.transportModel || item?.transportModel || null,
      year: inputValues?.productionYear || item?.year || null,
      price: inputValues?.transportPrice || item?.price || null,
      distance: inputValues?.millage || item?.distance || null,
      distanceMesurment:
        inputValues?.millageMesurment || item?.distanceMesurment || null,
      maxSpeed: inputValues?.maxSpeed || item?.maxSpeed || null,
      speedMesurment:
        inputValues?.speedMesurment || item?.speedMesurment || null,
      fuelEconomy: inputValues?.fuelEconomy || item?.fuelEconomy || null,
      fuelEconomyMesurment:
        inputValues?.fuelEconomyMesurment || item?.fuelEconomyMesurment || null,
      numberOfSeats: inputValues?.numberOfSeats || item?.numberOfSeats || null,
      numberOfDoors: inputValues?.numberOfDoors || item?.numberOfDoors || null,
      engineType: inputValues?.engineType || item?.engineType || null,

      color: inputValues?.color || item?.color || null,
      gearBox: inputValues?.gearBox || item?.gearBox || null,

      videoUrl: inputValues?.transportVideoLink || item?.videoUrl || null,

      phone: inputValues?.transportPhone || item?.phone || null,
      email: inputValues?.transportEmail || item?.email || null,
      websiteLink:
        inputValues?.transportWebsiteLink || item?.websiteLink || null,

      contactTime:
        inputValues?.transportContactTime || item?.contactTime || null,
      tags: inputValues?.tags || item?.tags || null,

      meetUpAddress: inputValues?.address || item?.meetUpAddress || null,
      latitude: inputValues?.latitude || item?.latitude || null,
      longitude: inputValues?.longitude || item?.longitude || null,

      contactHours: {
        monday_open:
          inputValues?.transportmonday_open ||
          item?.contactHours?.monday_open ||
          null,
        monday_close:
          inputValues?.transportmonday_close ||
          item?.contactHours?.monday_close ||
          null,
        tuesday_open:
          inputValues?.transporttuesday_open ||
          item?.contactHours?.tuesday_open ||
          null,
        tuesday_close:
          inputValues?.transporttuesday_close ||
          item?.contactHours?.tuesday_close ||
          null,
        wednesday_open:
          inputValues?.transportwednesday_open ||
          item?.contactHours?.wednesday_open ||
          null,
        wednesday_close:
          inputValues?.transportwednesday_close ||
          item?.contactHours?.wednesday_close ||
          null,
        thursday_open:
          inputValues?.transportthursday_open ||
          item?.contactHours?.thursday_open ||
          null,
        thursday_close:
          inputValues?.transportthursday_close ||
          item?.contactHours?.thursday_close ||
          null,
        friday_open:
          inputValues?.transportfriday_open ||
          item?.contactHours?.friday_open ||
          null,
        friday_close:
          inputValues?.transportfriday_close ||
          item?.contactHours?.friday_close ||
          null,
        saturday_open:
          inputValues?.transportsaturday_open ||
          item?.contactHours?.saturday_open ||
          null,
        saturday_close:
          inputValues?.transportsaturday_close ||
          item?.contactHours?.saturday_close ||
          null,
        sunday_open:
          inputValues?.transportsunday_open ||
          item?.contactHours?.sunday_open ||
          null,
        sunday_close:
          inputValues?.transportsunday_close ||
          item?.contactHours?.sunday_close ||
          null,
      },

      socialLinks: {
        facebookLink:
          inputValues?.transportfacebookLink ||
          item?.socialLinks?.facebookLink ||
          null,
        instagramLink:
          inputValues?.transportinstagramLink ||
          item?.socialLinks?.instagramLink ||
          null,
        youtubeLink:
          inputValues?.transportyoutubeLink ||
          item?.socialLinks?.youtubeLink ||
          null,
        twitterLink:
          inputValues?.transporttwitterLink ||
          item?.socialLinks?.twitterLink ||
          null,
      },
      //Specifications.
      insertDate: item.insertDate,
      user: item?.user.id,
      expiryDate: item.expiryDate,
    };
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (user?.id !== item?.user.id) {
        setTimeout(() => {
          router.push(`/`);
        }, 500);
        return;
      }

      let payload = getPayload(inputValues);

      if (!inputValues?.transportCountry) {
        inputValues.transportCountry = item?.country.id;
      }

      const { errors } = await TransportValidation(inputValues, t);
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
          await FileServices.DELETE_FILE(element.id);
        });

        inputValues?.listingGallery.forEach((file) => {
          formData.append(`files.listingGallery`, file);
        });
      }

      const { data, error } = await TransportListingService.UPDATE(
        item.id,
        formData
      );
      if (error) throw error?.message;

      setTimeout(() => {
        router.push(`/transport/${item.id}`);
      }, 1000);
    } catch (e) {
      return TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('common:toast.unknown-error')
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
        setsubmitCurrency={setsubmitCurrency}
        initialValues={initialLocationValues}
        initialRichText={initialRichText}
        initialItem={item}
        initilizedValues={initilizedValues}
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
        initialCoordinates={{
          longitude: item?.longitude,
          latitude: item?.latitude,
        }}
        initialAddress={item?.meetUpAddress}
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
        prefix="transport"
        inputValues={inputValues}
        initialItem={item}
        handleOnChange={handleOnChange}
        t={t}
      />
      <ContactHours
        prefix="transport"
        sectionHeading={t('transport-submit:form.contact-hours.heading')}
        sectionHeadingTip={t('transport-submit:form.contact-hours.heading-tip')}
        heading={t('transport-submit:form.contact-hours.accordion.heading')}
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
              {t('transport-submit:form.submit')}
            </>
          ) : (
            <>{t('transport-submit:form.submit')}</>
          )}
        </Button>{' '}
      </div>
    </Form>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(TransportEdit);
