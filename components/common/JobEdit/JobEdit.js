import { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { VacancyListingService, FileServices } from 'services';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import JobValidation from './jobValidation';
import { ContactHours, SocialLinks } from 'components/common';
import GeneralInformation from '../JobForm/GeneralInformation';
import DetailInformation from '../JobForm/DetailInformation';
import Gallery from '../JobForm/Gallery';
import { useRouter } from 'next/router';

const JobEdit = (props) => {
  const { t, user, item, tags } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submitCurrency, setsubmitCurrency] = useState('');
  const [addressPosition, setAddressPosition] = useState(null);
  const [tagOptions, setTagOptions] = useState([]);
  const [inputValues, setInputValues] = useState({
    jobCurrency: item?.currency.id || null,
    vacancyOption: item?.vacancyOption || null,
    contractType: item?.contractType || null,
    workingTime: item?.workingTime || null,

    jobContactTimes: item?.contactTime || null,

    languagesEnglish: item?.enLanguages || null,
    languagesNative: item?.nativeLanguages || null,

    jobDescription: item?.positionDescription || null,
    jobRequirements: item?.positionRequirements || null,
    jobOffer: item?.positionBenefits || null,

    tags: tags,
  });
  console.log(item);
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
    jobCountry: {
      init: true,
      id: 'jobCountry',
      label: getCountryName(item?.country),
      value: item?.country?.id,
    },
    jobState: {
      id: 'jobState',
      label: item?.state.name,
      value: item?.state.id,
    },
    jobCity: {
      id: 'jobCity',
      label: item?.city.name,
      value: item?.city.id,
    },
  };

  const handleOnChange = (event) => {
    if (event?.hourlySalaryFrom) {
      setInputValues({
        ...inputValues,
        hourlySalaryFrom: event.hourlySalaryFrom,
        monthlySalaryFrom: event.monthlySalaryFrom,
        annualSalaryFrom: event.annualSalaryFrom,
      });
      if (event?.hourlySalaryTo) {
        setInputValues({
          ...inputValues,
          hourlySalaryTo: event.hourlySalaryTo,
          monthlySalaryTo: event.monthlySalaryTo,
          annualSalaryTo: event.annualSalaryTo,
        });
        return;
      }
      return;
    }

    if (event?.hourlySalaryTo) {
      setInputValues({
        ...inputValues,
        hourlySalaryTo: event.hourlySalaryTo,
        monthlySalaryTo: event.monthlySalaryTo,
        annualSalaryTo: event.annualSalaryTo,
      });
      if (event?.hourlySalaryFrom) {
        setInputValues({
          ...inputValues,
          hourlySalaryFrom: event.hourlySalaryFrom,
          monthlySalaryFrom: event.monthlySalaryFrom,
          annualSalaryFrom: event.annualSalaryFrom,
        });
        return;
      }
      return;
    }
    const value =
      event?.target?.value ?? event?.value ?? event?.languageList ?? event;
    const id = event?.target?.id ?? event?.id ?? event[0]?.id;
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

  const getPayload = (inputValues) => {
    let payload = {
      isPromotable: item.isPromoted,
      companyName: inputValues?.companyName || item?.companyName || null,
      positionHeader: inputValues?.title || item?.positionHeader || null,
      vacancyOption: inputValues?.vacancyOption || item?.vacancyOption || null,
      contractType: inputValues?.contractType || item?.contractType || null,
      workingTime: inputValues?.workingTime || item?.workingTime || null,
      insertDate: item.insertDate,

      country: inputValues?.jobCountry || item?.country.id || null,
      state: inputValues?.jobState || item?.state.id || null,
      city: inputValues?.jobCity || item?.city.id || null,
      fullAddress: inputValues?.fullAddress || item?.fullAddress || null,

      positionDescription:
        inputValues?.jobDescription || item?.positionDescription || null,
      positionRequirements:
        inputValues?.jobRequirements || item?.positionRequirements || null,
      positionBenefits: inputValues?.jobOffer || item?.positionBenefits || null,

      enLanguages: inputValues?.languagesEnglish || item?.enLanguages || null,
      nativeLanguages:
        inputValues?.languagesNative || item?.nativeLanguages || null,

      phone: inputValues?.jobPhone || item?.phone || null,
      email: inputValues?.jobEmail || item?.email || null,
      websiteLink: inputValues?.jobListingWebsite || item?.websiteLink || null,
      contactTime: inputValues?.jobContactTimes || item?.contactTime || null,
      currency: inputValues?.jobCurrency || item?.currency.id || null,
      officeAddress: inputValues?.officeAddress || item?.officeAddress || null,
      latitude: inputValues?.latitude || item?.latitude || null,
      longitude: inputValues?.longitude || item?.longitude || null,

      videoLink: inputValues?.jobVideoLink || item?.videoLink || null,

      tags: inputValues?.tags || item?.tags || null,

      contactHours: {
        monday_open:
          inputValues?.jobmonday_open || item?.contactHours.monday_open || null,
        monday_close:
          inputValues?.jobmonday_close ||
          item?.contactHours.monday_close ||
          null,
        tuesday_open:
          inputValues?.jobtuesday_open ||
          item?.contactHours.tuesday_open ||
          null,
        tuesday_close:
          inputValues?.jobtuesday_close ||
          item?.contactHours.tuesday_close ||
          null,
        wednesday_open:
          inputValues?.jobwednesday_open ||
          item?.contactHours.wednesday_open ||
          null,
        wednesday_close:
          inputValues?.jobwednesday_close ||
          item?.contactHours.wednesday_close ||
          null,
        thursday_open:
          inputValues?.jobthursday_open ||
          item?.contactHours.thursday_open ||
          null,
        thursday_close:
          inputValues?.jobthursday_close ||
          item?.contactHours.thursday_close ||
          null,
        friday_open:
          inputValues?.jobfriday_open || item?.contactHours.friday_open || null,
        friday_close:
          inputValues?.jobfriday_close ||
          item?.contactHours.friday_close ||
          null,
        saturday_open:
          inputValues?.jobsaturday_open ||
          item?.contactHours.saturday_open ||
          null,
        saturday_close:
          inputValues?.jobsaturday_close ||
          item?.contactHours.saturday_close ||
          null,
        sunday_open:
          inputValues?.jobsunday_open || item?.contactHours.sunday_open || null,
        sunday_close:
          inputValues?.jobsunday_close ||
          item?.contactHours.sunday_close ||
          null,
      },
      socialLinks: {
        facebookLink:
          inputValues?.facebookLink || item?.socialLinks?.facebookLink || null,
        instagramLink:
          inputValues?.instagramLink ||
          item?.socialLinks?.instagramLink ||
          null,
        youtubeLink:
          inputValues?.youtubeLink || item?.socialLinks?.youtubeLink || null,
        twitterLink:
          inputValues?.twitterLink || item?.socialLinks?.twitterLink || null,
      },

      monthlySalaryFrom:
        inputValues?.monthlySalaryFrom || item?.monthlySalaryFrom || null,
      monthlySalaryTo:
        inputValues?.monthlySalaryTo || item?.monthlySalaryTo || null,

      annualSalaryFrom:
        inputValues?.annualSalaryFrom || item?.annualSalaryFrom || null,
      annualSalaryTo:
        inputValues?.annualSalaryTo || item?.annualSalaryTo || null,

      hourlySalaryFrom:
        inputValues?.hourlySalaryFrom || item?.hourlySalaryFrom || null,
      hourlySalaryTo:
        inputValues?.hourlySalaryTo || item?.hourlySalaryTo || null,

      expiryDate: item?.expiryDate,
      user: item?.user.id,
    };

    return payload;
  };

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let payload = getPayload(inputValues);

      const { errors } = await JobValidation(validation, t);
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

      if (inputValues?.companyLogo) {
        await FileServices.DELETE_FILE(item?.companyLogo.id);
        formData.append(`files.companyLogo`, inputValues.companyLogo);
      }

      const { data, error } = await VacancyListingService.UPDATE(
        item.id,
        formData
      );
      if (error) throw error?.message;

      TostifyCustomContainer(
        'success',
        t('common:toast.messages.success'),
        t('common:toast.submit-success')
      );

      setTimeout(() => {
        router.push(`/job-search/${item.id}`);
      }, 1000);
    } catch (e) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('common:toast.server-error')
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="submit-container__form">
      <GeneralInformation
        inputValues={inputValues}
        handleOnChange={handleOnChange}
        setInputValues={setInputValues}
        submitCurrency={submitCurrency}
        setsubmitCurrency={setsubmitCurrency}
        initialValues={initialLocationValues}
        initialItem={item}
        jobDescription={item?.positionDescription}
        jobRequirements={item?.positionRequirements}
        jobOffer={item?.positionBenefits}
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
        initialCoordinates={{
          longitude: item?.longitude,
          latitude: item?.latitude,
        }}
        initialAddress={item?.officeAddress}
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
        prefix="job"
        inputValues={inputValues}
        handleOnChange={handleOnChange}
        initialItem={item}
        t={t}
      />
      <ContactHours
        prefix="job"
        sectionHeading={t('job-submit:form.contact-hours.heading')}
        sectionHeadingTip={t('job-submit:form.contact-hours.heading-tip')}
        heading={t('job-submit:form.contact-hours.accordion.heading')}
        inputValues={inputValues}
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
          onClick={(e) => handleDataSubmit(e)}
        >
          {isLoading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" />{' '}
              {t('job-submit:form.submit-confirm')}
            </>
          ) : (
            <>{t('job-submit:form.submit')}</>
          )}
        </Button>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(JobEdit);
