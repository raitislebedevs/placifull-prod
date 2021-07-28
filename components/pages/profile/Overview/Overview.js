import { useEffect, useState } from 'react';
import { RiUserSearchFill, RiBriefcase4Fill } from 'react-icons/ri';
import { FaCarSide } from 'react-icons/fa';
import { FcCancel, FcApproval } from 'react-icons/fc';
import { GiHouse } from 'react-icons/gi';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import imageCompression from 'browser-image-compression';
import { FileServices, UserInfoServices } from 'services';
import { setUser } from 'actions';
import {
  DeleteModalAsk,
  BrowserCVPayment,
  SpinnerModal,
} from 'components/common';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import Subscriptions from 'services/subscriptions';
import { ProfilePayment, StripeContainer } from 'components//common/index';

const defaultAvatar = '/static/images/default-avatar.png';

const Overview = (props) => {
  const { t, user, dispatch } = props;
  const { userInfo } = user;
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [realEstatePayment, setRealEstatePayment] = useState(false);
  const [transportPayment, setTransportPayment] = useState(false);
  const [browserPayment, setBrowserPayment] = useState(false);
  const [jobPayment, setJobPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState({});
  const [isStripe, setIsStripe] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const rightMenuIcons = [
    {
      key: 'real-estate-posts',
      title: t('profile:hover-texts.real-estate'),
      icon: <GiHouse size="42px" />,
      value: subscriptions?.realEstate ? (
        subscriptions?.realEstate?.standalone +
        subscriptions?.realEstate?.subscriptionQuarterly +
        subscriptions?.realEstate?.subscriptionYearly -
        subscriptions?.realEstate?.subscriptionQuarterlyInUse -
        subscriptions?.realEstate?.subscriptionYearlyInUse
      ) : (
        <FcCancel size="25px" />
      ),
    },
    {
      key: 'transport-posts',
      title: t('profile:hover-texts.transport'),
      icon: <FaCarSide size="42px" />,
      value: subscriptions?.transport ? (
        subscriptions?.transport?.standalone +
        subscriptions?.transport?.subscriptionQuarterly +
        subscriptions?.transport?.subscriptionYearly -
        subscriptions?.transport?.subscriptionQuarterlyInUse -
        subscriptions?.transport?.subscriptionYearlyInUse
      ) : (
        <FcCancel size="25px" />
      ),
    },
    {
      key: 'job-posts',
      title: t('profile:hover-texts.job'),
      icon: <RiBriefcase4Fill size="42px" />,
      value: subscriptions?.jobs ? (
        subscriptions?.jobs?.standalone +
        subscriptions?.jobs?.subscriptionQuarterly +
        subscriptions?.jobs?.subscriptionYearly -
        subscriptions?.jobs?.subscriptionQuarterlyInUse -
        subscriptions?.jobs?.subscriptionYearlyInUse
      ) : (
        <FcCancel size="25px" />
      ),
    },
    {
      key: 'browse-cv',
      title: t('profile:hover-texts.browser'),
      icon: <RiUserSearchFill size="42px" />,
      value: subscriptions?.browserCv?.activeSubscription ? (
        <FcApproval size="25px" />
      ) : (
        <FcCancel size="25px" />
      ),
    },
  ];

  const handleFileChange = async (e) => {
    try {
      setIsLoadingUpload(true);
      let file = e.target.files[0];
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        file = await imageCompression(file, options);
      } catch (error) {
        console.log(error);
      }
      file = new File([file], file.name);

      const payload = new FormData();
      payload.append('files', file);
      const { data, error } = await FileServices.UPLOAD_FILE(payload);
      if (error) {
        throw error;
      }

      if (data) {
        let payload = {
          avatar: data[0].id,
        };
        const { data: infoData, error: infoError } =
          await UserInfoServices.UPDATE_ME(payload);
        if (infoData) {
          dispatch(
            setUser({
              ...user,
              userInfo: infoData,
            })
          );
          TostifyCustomContainer('success', t('profile:toast.avatar'));
        }
        if (infoError) {
          throw infoError;
        }
      }
    } catch (error) {
      TostifyCustomContainer('error', t('profile:toast.avatar-fail'));
    }
    document.getElementById('upload-avatar').value = '';
    setIsLoadingUpload(false);
  };

  const handleCloseDeleteModal = () => {
    setIsShowDeleteModal(false);
  };

  const handleOpenDeleteModal = () => {
    setIsShowDeleteModal(true);
  };

  const handleDeleteAvatar = async () => {
    let payload = {
      avatar: null,
    };
    try {
      const { data, error } = await UserInfoServices.UPDATE_ME(payload);
      if (data) {
        dispatch(
          setUser({
            ...user,
            userInfo: data,
          })
        );
      }
      await FileServices.DELETE_FILE(userInfo?.avatar.id);
      TostifyCustomContainer('success', t('profile:toast.avatar-remove'));
      handleCloseDeleteModal();
    } catch {
      TostifyCustomContainer('error', t('profile:toast.avatar-remove-fail'));
    }
  };

  const handleSubmit = async (e, paymentDetails) => {
    e.preventDefault();

    setPaymentDetails(paymentDetails);
    setIsStripe(true);
  };

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    let purchaseAmount;
    try {
      const plan = paymentDetails.plan;
      const purchasePlan = paymentDetails.purchasePlan;
      //Expiry Options

      const expiryDate = paymentDetails?.expiryDate;
      const expiryPlan = paymentDetails?.expiryPlan;
      const currentQty = subscriptions[paymentDetails.plan]
        ? subscriptions[paymentDetails.plan][paymentDetails.purchasePlan]
          ? subscriptions[paymentDetails.plan][paymentDetails.purchasePlan]
          : 0
        : 0;

      const addedQty = paymentDetails.optionQty;

      //Spreading the inner object
      const updateProperty = subscriptions[plan];
      const recordId = subscriptions?.id;
      if (plan == 'browserCv') {
        purchaseAmount = true;
      } else {
        purchaseAmount = currentQty + addedQty;
      }

      const payload = {
        ...subscriptions,
        [plan]: {
          ...updateProperty,
          [purchasePlan]: purchaseAmount,
          ...(expiryDate ? { [expiryPlan]: new Date(expiryDate) } : {}),
        },
        userId: user?.id,
      };

      if (recordId) {
        await Subscriptions.UPDATE(recordId, payload);
      } else {
        await Subscriptions.CREATE(payload);
      }

      setRealEstatePayment(false);
      setTransportPayment(false);
      setJobPayment(false);
      setBrowserPayment(false);
    } catch (e) {
      console.error(e);
      return false;
    }
    getSubscriptions();
    return true;
  };

  const handlePurchase = (key) => {
    if (key == 'real-estate-posts') return setRealEstatePayment(true);
    if (key == 'transport-posts') return setTransportPayment(true);
    if (key == 'job-posts') return setJobPayment(true);
    setBrowserPayment(true);
  };

  const getSubscriptions = async () => {
    setIsLoading(true);
    try {
      const filter = {
        userId: user?.id,
      };
      const { data } = await Subscriptions.FIND({
        _where: filter,
      });

      if (data?.length == 0) {
        setSubscriptions({});
      }
      if (data?.length == 1) {
        setSubscriptions(data[0]);
      }
      setIsLoading(false);
    } catch (e) {
      TostifyCustomContainer(
        'error',
        'Server was not reached. Please contact us!'
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <div className="overview-container">
      <DeleteModalAsk
        isShowDeleteModal={isShowDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDelete={handleDeleteAvatar}
        bodyText={t('profile:overview.delete-avatar-modal.body')}
        headerText={t('profile:overview.delete-avatar-modal.header')}
        submitText={t('profile:overview.delete-avatar-modal.submit')}
        cancelText={t('profile:overview.delete-avatar-modal.cancel')}
      />

      <StripeContainer
        handleDataSubmit={handleDataSubmit}
        show={isStripe}
        setIsStripe={setIsStripe}
        paymentDetails={paymentDetails}
        onHide={() => setIsStripe(false)}
      />

      <SpinnerModal show={isPaying} onHide={() => setIsPaying(false)} />
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className="overview-container__card-body">
              <Row>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={2}
                  xl={2}
                  className="card-body__left
                  pl-0 pr-2"
                >
                  <img
                    src={user?.userInfo?.avatar?.url || defaultAvatar}
                    className="left__avatar"
                    alt=""
                  />
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={10}
                  xl={10}
                  className="card-body__right
                  "
                >
                  <Row className="">
                    <Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      xl={6}
                      className="right__info
                      pl-1 pr-0"
                    >
                      <h3 className="right__name ">
                        {user?.userInfo?.firstName} {user?.userInfo?.lastName}
                      </h3>
                      <div className="right__button">
                        <Button
                          className="button__btn button__btn-upload"
                          disabled={isLoadingUpload}
                        >
                          <label
                            className="btn-upload__label"
                            htmlFor="upload-avatar"
                          >
                            {isLoadingUpload ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                />
                                {t('profile:overview.button-label.change')}
                              </>
                            ) : (
                              t('profile:overview.button-label.change')
                            )}
                          </label>
                          <input
                            onChange={handleFileChange}
                            id="upload-avatar"
                            name="images"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                          />
                        </Button>
                        <Button
                          className="button__btn"
                          variant="outline-primary"
                          onClick={() => handleOpenDeleteModal()}
                        >
                          {t('profile:overview.button-label.delete')}
                        </Button>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                      <div className="right__group-social">
                        {rightMenuIcons.map((item) => (
                          <div
                            className="group-social__wrapper"
                            onClick={() => handlePurchase(item.key)}
                            key={item.key}
                          >
                            <div
                              className="wrapper__icon"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title={item.title}
                            >
                              {item.icon}
                            </div>
                            <div className="wrapper__text">
                              {isLoading ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                />
                              ) : (
                                item.value
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>

      <ProfilePayment
        handleSubmit={handleSubmit}
        paymentModal={realEstatePayment}
        setPaymentModal={setRealEstatePayment}
        setIsStripe={setIsStripe}
        user={user?.id}
        profilePlan={'realEstate'}
        t={t}
      />

      <ProfilePayment
        handleSubmit={handleSubmit}
        paymentModal={transportPayment}
        setPaymentModal={setTransportPayment}
        setIsStripe={setIsStripe}
        user={user?.id}
        profilePlan={'transport'}
        t={t}
      />

      <ProfilePayment
        handleSubmit={handleSubmit}
        paymentModal={jobPayment}
        setPaymentModal={setJobPayment}
        setIsStripe={setIsStripe}
        user={user?.id}
        profilePlan={'jobs'}
        t={t}
      />

      <ProfilePayment
        handleSubmit={handleSubmit}
        paymentModal={browserPayment}
        setPaymentModal={setBrowserPayment}
        setIsStripe={setIsStripe}
        user={user?.id}
        profilePlan={'browserCv'}
        t={t}
      />

      {/* <BrowserCVPayment
        handleSubmit={handleSubmit}
        paymentModal={browserPayment}
        setPaymentModal={setBrowserPayment}
        setIsStripe={setIsStripe}
        user={user?.id}
        t={t}
      /> */}
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(Overview);
