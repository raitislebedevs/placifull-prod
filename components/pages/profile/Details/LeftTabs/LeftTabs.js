import { FaUserTie } from 'react-icons/fa';
import { useContext } from 'react';

import {
  AiTwotoneFolderOpen,
  AiTwotoneCar,
  AiOutlineLogin,
} from 'react-icons/ai';
import { GiModernCity, GiArchiveResearch } from 'react-icons/gi';
import { MdPayment } from 'react-icons/md';
import { CgWorkAlt } from 'react-icons/cg';
import {
  Row,
  Col,
  Accordion,
  useAccordionToggle,
  AccordionContext,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from 'actions';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LeftTabs = (props) => {
  const { t, currentTab, dispatch, setCurrentTab, isMobile } = props;

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
    TostifyCustomContainer('success', t('profile:toast.logout'));
  };

  const tabsMenu = [
    {
      key: 'profile',
      label: t('profile:left-tab.titles.profile'),
      icon: <FaUserTie size="30px" />,
    },
    {
      key: 'cv',
      label: t('profile:left-tab.titles.cv'),
      icon: <AiTwotoneFolderOpen size="30px" />,
    },
    {
      key: 'real-estate',
      label: t('profile:left-tab.titles.real-estate'),
      icon: <GiModernCity size="30px" />,
    },
    {
      key: 'transport',
      label: t('profile:left-tab.titles.transport'),
      icon: <AiTwotoneCar size="30px" />,
    },
    {
      key: 'jobs',
      label: t('profile:left-tab.titles.jobs'),
      icon: <CgWorkAlt size="30px" />,
    },
    {
      key: 'browser-cv',
      label: t('profile:left-tab.titles.browser'),
      icon: <GiArchiveResearch size="30px" />,
    },

    /*{
      key: 'payment-receipts',
      label: t('profile:left-tab.titles.payment'),
      icon: <MdPayment size="30px" />,
    },*/
  ];
  return (
    <>
      {!isMobile ? (
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
                <a
                  onClick={() => setCurrentTab(item.key)}
                  className={`left-tab__item ${
                    currentTab === item.key ? 'left-tab__selected' : ''
                  } `}
                >
                  {item.icon}
                  <div className="item__title">{item.label}</div>
                </a>
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
      ) : (
        ''
      )}

      {isMobile ? (
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
                    <a
                      onClick={() => setCurrentTab(item.key)}
                      className={`left-tab__item ${
                        currentTab === item.key ? 'left-tab__selected' : ''
                      } `}
                    >
                      {item.icon}
                      <div className="item__title">{item.label}</div>
                    </a>
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
      ) : (
        ''
      )}
    </>
  );
};

export default connect(null)(LeftTabs);
