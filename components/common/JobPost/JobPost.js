import { useState, useEffect } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { VacancyListingService } from 'services';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import JobValidation from './jobValidation';
import { ContactHours, SocialLinks } from 'components/common';
import GeneralInformation from '../JobForm/GeneralInformation';
import DetailInformation from '../JobForm/DetailInformation';
import Preview from '../JobForm/Preview';
import Gallery from '../JobForm/Gallery';
import { dayCostJobs, defaultExpiryDays } from 'constants/listingDetails';
import { ListingPayment, SpinnerModal } from '../index';
import useSubscription from 'hooks/useSubscription';
import useJobPost from 'hooks/useJobPost';
import { useRouter } from 'next/router';
import { addDays } from 'utils/standaloneFunctions';
import { isListingsFree } from 'constants/parameters';

const JobPost = (props) => {
  const { t, user } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitCurrency, setsubmitCurrency] = useState('');
  const [addressPosition, setAddressPosition] = useState(null);
  const [previewJobModal, setPreviewJobModal] = useState(false);
  const [previewItem, setPreviewItem] = useState({});
  const [paymentModal, setPaymentModal] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
  const [handleInputSubscriptions, getSubscriptions] = useSubscription(
    user?.id,
    'jobs'
  );
  const initial = {
    tags: [],
    title: '',
    companyName: '',
    jobDescription: '',
    jobVideoLink: '',
    jobRequirements: '',
    jobEmail: '',
    jobOffer: '',
    jobListingWebsite: '',
    jobVideoLink: '',
    jobfacebookLink: '',
    jobinstagramLink: '',
    jobyoutubeLink: '',
    jobtwitterLink: '',
    officeAddress: '',

    jobmonday_open: '',
    jobmonday_close: '',
    jobtuesday_open: '',
    jobtuesday_close: '',
    jobwednesday_open: '',
    jobwednesday_close: '',
    jobthursday_open: '',
    jobthursday_close: '',
    jobfriday_open: '',
    jobfriday_close: '',
    jobsaturday_open: '',
    jobsaturday_close: '',
    jobsunday_open: '',
    jobsunday_close: '',
  };
  const [
    inputValues,
    setInputValues,
    handleOnChange,
    handleCheckBoxChange,
    handleFeatureItemCheckbox,
  ] = useJobPost(initial);

  useEffect(() => {
    if (addressPosition?.position) {
      setInputValues((prev) => ({
        ...prev,
        longitude: addressPosition?.position?.lng,
        latitude: addressPosition?.position?.lat,
      }));
    }
  }, [addressPosition]);

  const getPayload = (inputValues, isPromoted) => {
    var expiryDate = addDays(new Date(), defaultExpiryDays);

    let payload = {
      isPublished: true,
      isPromotable: isListingsFree || isPromoted || null,
      companyName: inputValues?.companyName || null,
      positionHeader: inputValues?.title || null,
      vacancyOption: inputValues?.vacancyOption || null,
      contractType: inputValues?.contractType || null,
      workingTime: inputValues?.workingTime || null,
      insertDate: new Date(),

      country: inputValues?.jobCountry || null,
      state: inputValues?.jobState || null,
      city: inputValues?.jobCity || null,
      fullAddress: inputValues?.fullAddress || null,

      positionDescription: inputValues?.jobDescription || null,
      positionRequirements: inputValues?.jobRequirements || null,
      positionBenefits: inputValues?.jobOffer || null,

      enLanguages: inputValues?.languagesEnglish || null,
      nativeLanguages: inputValues?.languagesNative || null,

      phone: inputValues?.jobPhone || null,
      email: inputValues?.jobEmail || null,
      websiteLink: inputValues?.jobListingWebsite || null,
      contactTime: inputValues?.jobContactTimes || null,
      currency: inputValues?.jobCurrency || null,
      officeAddress: inputValues?.officeAddress || null,
      latitude: inputValues?.latitude || null,
      longitude: inputValues?.longitude || null,

      videoLink: inputValues?.jobVideoLink || null,

      tags: inputValues?.tags || null,

      contactHours: {
        monday_open: inputValues?.jobmonday_open || null,
        monday_close: inputValues?.jobmonday_close || null,
        tuesday_open: inputValues?.jobtuesday_open || null,
        tuesday_close: inputValues?.jobtuesday_close || null,
        wednesday_open: inputValues?.jobwednesday_open || null,
        wednesday_close: inputValues?.jobwednesday_close || null,
        thursday_open: inputValues?.jobthursday_open || null,
        thursday_close: inputValues?.jobthursday_close || null,
        friday_open: inputValues?.jobfriday_open || null,
        friday_close: inputValues?.jobfriday_close || null,
        saturday_open: inputValues?.jobsaturday_open || null,
        saturday_close: inputValues?.jobsaturday_close || null,
        sunday_open: inputValues?.jobsunday_open || null,
        sunday_close: inputValues?.jobsunday_close || null,
      },
      socialLinks: {
        facebookLink: inputValues?.jobfacebookLink || null,
        instagramLink: inputValues?.jobinstagramLink || null,
        youtubeLink: inputValues?.jobyoutubeLink || null,
        twitterLink: inputValues?.jobtwitterLink || null,
      },

      monthlySalaryFrom: inputValues?.monthlySalaryFrom || null,
      monthlySalaryTo: inputValues?.monthlySalaryTo || null,

      annualSalaryFrom: inputValues?.annualSalaryFrom || null,
      annualSalaryTo: inputValues?.annualSalaryTo || null,

      hourlySalaryFrom: inputValues?.hourlySalaryFrom || null,
      hourlySalaryTo: inputValues?.hourlySalaryTo || null,

      expiryDate: expiryDate || null,
      user: user?.id || null,
    };

    return payload;
  };

  const handleDataSubmit = async (e, paymentDetails) => {
    e.preventDefault();
    let promoted = paymentDetails.isPromoted;
    if (!paymentDetails?.totalCost) setIsProcessing(true);

    setIsLoading(true);
    try {
      const listingId = await uploadListing(promoted);

      if (!isListingsFree) {
        await handleInputSubscriptions(paymentDetails, listingId);
        getSubscriptions(user.id);
      }

      TostifyCustomContainer(
        'success',
        t('common:toast.messages.success'),
        t('common:toast.submit-success')
      );
      VacancyListingService.NOTIFY_USERS({
        id: listingId,
      });
      // setTimeout(() => {
      //   router.push(`/job-search/${listingId}`);
      // }, 1500);
    } catch (e) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('common:toast.server-error')
      );
    }

    setIsLoading(false);
    setIsProcessing(false);
    return true;
  };

  const uploadListing = async (promoted) => {
    let payload = getPayload(inputValues, promoted);

    //Upload images during entry creation
    //https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#upload-file-during-entry-creation
    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));
    formData.append(`files.companyLogo`, inputValues?.companyLogo);

    const { data, error } = await VacancyListingService.CREATE(formData);
    if (error) throw error?.message;
    return data.id;
  };

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
    let validation = inputValues;
    validation.size = inputValues?.companyLogo?.size;
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
      return;
    }
    if (isListingsFree) {
      await handleDataSubmit(e, {});
      return;
    }

    setPaymentModal(true);
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      TostifyCustomContainer(
        'info',
        t('common:toast.messages.info'),
        t('common:toast.logging-required')
      );
      return;
    }

    let validation = inputValues;
    validation.size = inputValues?.companyLogo?.size;

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
      return;
    }

    try {
      let localPreviewItem = getPayload(inputValues);
      localPreviewItem['companyLogo'] = inputValues?.companyLogo;
      localPreviewItem['currency'] = submitCurrency;
      localPreviewItem['isPreview'] = true;
      localPreviewItem['Applicants'] = [];
      let userTags = localPreviewItem?.tags;

      let previewTags = [];
      if (userTags) {
        for (let i = 0; i < userTags?.length; ++i) {
          tagOptions.forEach((item, index) => {
            if (item.id == userTags[i]) previewTags.push(item);
          });
        }
      }
      localPreviewItem['tags'] = previewTags;
      setPreviewItem(localPreviewItem);
      setPreviewJobModal(true);
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
        prefix="job"
        inputValues={inputValues}
        handleOnChange={handleOnChange}
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
        <Row>
          <Col>
            <Button
              variant="outline-primary"
              disabled={previewJobModal || isLoading}
              onClick={!previewJobModal ? handlePreview : null}
              size="lg"
              className="button-container__buttonOutline"
            >
              {previewJobModal ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                  />{' '}
                  {t('job-submit:form.preview-sneak-peak')}
                </>
              ) : (
                <>{t('job-submit:form.preview')}</>
              )}
            </Button>{' '}
          </Col>
          <Col>
            <Button
              variant="primary"
              disabled={isLoading || previewJobModal}
              type="submit"
              size="lg"
              className="button-container__button"
              onClick={(e) => handlePayment(e)}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                  />{' '}
                  {t('job-submit:form.submit-confirm')}
                </>
              ) : (
                <>{t('job-submit:form.submit')}</>
              )}
            </Button>{' '}
          </Col>
        </Row>
      </div>
      <Preview
        previewModal={previewJobModal}
        setPreviewModal={setPreviewJobModal}
        previewItem={previewItem}
        t={t}
      />
      <ListingPayment
        handleDataSubmit={handleDataSubmit}
        setPaymentModal={setPaymentModal}
        paymentModal={paymentModal}
        dayCost={dayCostJobs}
        plan={'jobs'}
        user={user}
        t={t}
      />{' '}
      <SpinnerModal show={isProcessing} onHide={() => setIsProcessing(false)} />
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(JobPost);
