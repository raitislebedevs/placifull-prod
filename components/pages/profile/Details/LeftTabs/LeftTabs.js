import { FaUserTie } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import {
  AiTwotoneFolderOpen,
  AiTwotoneCar,
  AiOutlineLogin,
} from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';
import { GiModernCity, GiArchiveResearch } from 'react-icons/gi';
import { MdPayment } from 'react-icons/md';
import { FaBlog } from 'react-icons/fa';
import { CgWorkAlt } from 'react-icons/cg';
import {
  Row,
  Col,
  Accordion,
  useAccordionToggle,
  AccordionContext,
  Spinner,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { logout } from 'actions';
import Subscriptions from 'services/subscriptions';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LeftTabs = (props) => {
  const { t, currentTab, dispatch, setCurrentTab, isMobile, user } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState({});

  function AccordionToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <div className="accordion__header" onClick={decoratedOnClick}>
        {children}
        <FontAwesomeIcon
          icon={isCurrentEventKey ? 'minus' : 'plus'}
          className="header__icon"
        />
      </div>
    );
  }

  const logoutHandler = () => {
    dispatch(logout());
    TostifyCustomContainer(
      'success',
      t('common:toast.messages.success'),
      t('profile:toast.logout')
    );
  };
  const permissions = {
    realEstate: subscriptions?.realEstate
      ? subscriptions?.realEstate?.standalone +
        subscriptions?.realEstate?.subscriptionQuarterly +
        subscriptions?.realEstate?.subscriptionYearly -
        subscriptions?.realEstate?.subscriptionQuarterlyInUse -
        subscriptions?.realEstate?.subscriptionYearlyInUse
      : 0,

    transport: subscriptions?.transport
      ? subscriptions?.transport?.standalone +
        subscriptions?.transport?.subscriptionQuarterly +
        subscriptions?.transport?.subscriptionYearly -
        subscriptions?.transport?.subscriptionQuarterlyInUse -
        subscriptions?.transport?.subscriptionYearlyInUse
      : 0,

    jobs: subscriptions?.jobs
      ? subscriptions?.jobs?.standalone +
        subscriptions?.jobs?.subscriptionQuarterly +
        subscriptions?.jobs?.subscriptionYearly -
        subscriptions?.jobs?.subscriptionQuarterlyInUse -
        subscriptions?.jobs?.subscriptionYearlyInUse
      : 0,

    browserCv: subscriptions?.browserCv?.activeSubscription ? true : false,
  };

  const tabsMenu = [
    {
      key: 'profile',
      label: t('profile:left-tab.titles.profile'),
      icon: <FaUserTie size="30px" />,
      disabled: true,
    },
    {
      key: 'cv',
      label: t('profile:left-tab.titles.cv'),
      icon: <AiTwotoneFolderOpen size="30px" />,
      disabled: true,
    },
    {
      key: 'real-estate',
      label: t('profile:left-tab.titles.real-estate'),
      icon: <GiModernCity size="30px" />,
      disabled: permissions?.realEstate,
    },
    {
      key: 'transport',
      label: t('profile:left-tab.titles.transport'),
      icon: <AiTwotoneCar size="30px" />,
      disabled: permissions?.transport,
    },
    {
      key: 'jobs',
      label: t('profile:left-tab.titles.jobs'),
      icon: <CgWorkAlt size="30px" />,
      disabled: permissions?.jobs,
    },
    {
      key: 'browser-cv',
      label: t('profile:left-tab.titles.browser'),
      icon: <GiArchiveResearch size="30px" />,
      disabled: permissions?.browserCv,
    },
    {
      key: 'blog-content',
      label: 'Blog Content',
      icon: <FaBlog size="30px" />,
      disabled: true,
      admin: false,
    },

    /*{
      key: 'payment-receipts',
      label: t('profile:left-tab.titles.payment'),
      icon: <MdPayment size="30px" />,
    },*/
  ];

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
      console.log('FAILED');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <>
      {!isMobile ? (
        <div className="detail-container__left-tab">
          <Row>
            {tabsMenu.map((item) => {
              if (item.key === 'blog-content' && !user?.blogContent) {
                return;
              }
              return (
                <Col
                  key={item.key}
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className="layout-md mb-4 pt-2"
                >
                  {isLoading ? (
                    <a
                      className={`left-tab__item ${
                        currentTab === item.key ? 'left-tab__selected' : ''
                      } `}
                    >
                      <div>
                        {currentTab === item.key ? (
                          <Spinner
                            as="span"
                            animation="border"
                            variant="light"
                            size="sm"
                            role="status"
                          />
                        ) : (
                          <Spinner
                            as="span"
                            animation="border"
                            variant="danger"
                            size="sm"
                            role="status"
                          />
                        )}
                      </div>
                      <div className="item__title">{item.label}</div>
                    </a>
                  ) : (
                    <>
                      {item?.disabled ? (
                        <a
                          onClick={() => setCurrentTab(item.key)}
                          className={`left-tab__item ${
                            currentTab === item.key ? 'left-tab__selected' : ''
                          } `}
                        >
                          {item.icon}
                          <div className="item__title">{item.label}</div>
                        </a>
                      ) : (
                        <a
                          className={`left-tab__item ${
                            currentTab === item.key ? 'left-tab__selected' : ''
                          } `}
                        >
                          <FcCancel size="27px" />
                          <div className="item__title">{item.label}</div>
                        </a>
                      )}{' '}
                    </>
                  )}
                </Col>
              );
            })}
            <Col
              key={'logout'}
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              className="layout-md mb-4 pt-2"
            >
              <a
                onClick={() => logoutHandler()}
                className={`left-tab__item ${
                  currentTab === 'logout' ? 'left-tab__selected' : ''
                } `}
              >
                <AiOutlineLogin size="30px" />
                <div className="item__title">
                  {t('profile:left-tab.titles.logout')}
                </div>
              </a>
            </Col>
          </Row>
        </div>
      ) : (
        <Accordion className="form__accordion">
          <AccordionToggle eventKey={1}>
            {t('profile:left-tab.navigation')}
          </AccordionToggle>
          <Accordion.Collapse eventKey={1}>
            <div className="detail-container__left-tab">
              <Row>
                {tabsMenu.map((item) => (
                  <Col
                    key={item.key}
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                    className="layout-md mb-4 pt-2"
                  >
                    {isLoading ? (
                      <a
                        className={`left-tab__item ${
                          currentTab === item.key ? 'left-tab__selected' : ''
                        } `}
                      >
                        <div>
                          {currentTab === item.key ? (
                            <Spinner
                              as="span"
                              animation="border"
                              variant="light"
                              size="sm"
                              role="status"
                            />
                          ) : (
                            <Spinner
                              as="span"
                              animation="border"
                              variant="danger"
                              size="sm"
                              role="status"
                            />
                          )}
                        </div>
                        <div className="item__title">{item.label}</div>
                      </a>
                    ) : (
                      <>
                        {item?.disabled ? (
                          <a
                            onClick={() => setCurrentTab(item.key)}
                            className={`left-tab__item ${
                              currentTab === item.key
                                ? 'left-tab__selected'
                                : ''
                            } `}
                          >
                            {item.icon}
                            <div className="item__title">{item.label}</div>
                          </a>
                        ) : (
                          <a
                            className={`left-tab__item ${
                              currentTab === item.key
                                ? 'left-tab__selected'
                                : ''
                            } `}
                          >
                            <FcCancel size="27px" />
                            <div className="item__title">{item.label}</div>
                          </a>
                        )}{' '}
                      </>
                    )}
                  </Col>
                ))}
                <Col
                  key={'logout'}
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className="layout-md mb-4 pt-2"
                >
                  <a
                    onClick={() => logoutHandler()}
                    className={`left-tab__item ${
                      currentTab === 'logout' ? 'left-tab__selected' : ''
                    } `}
                  >
                    <AiOutlineLogin size="30px" />
                    <div className="item__title">
                      {t('profile:left-tab.titles.logout')}
                    </div>
                  </a>
                </Col>
              </Row>
            </div>
          </Accordion.Collapse>
        </Accordion>
      )}
    </>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(LeftTabs);
