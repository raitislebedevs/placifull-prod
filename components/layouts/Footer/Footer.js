import { withTranslation } from 'i18n';
import Link from 'next/link';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlineMail } from 'react-icons/ai';
import { useState } from 'react';
import { SubscriberService } from 'services';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';

const Footer = (props) => {
  const { t } = props;
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriber, setSubscriber] = useState('');
  const handleSubcriber = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    if (!subscriber) {
      return;
    }
    try {
      let payload = {
        email: subscriber.toLowerCase(),
      };
      const result = await SubscriberService.CREATE(payload);
      if (result?.data)
        TostifyCustomContainer('success', t('common:toast.subscribed'));

      if (result?.error)
        TostifyCustomContainer('error', t('common:toast.already'));
    } catch {
      TostifyCustomContainer('error', t('common:toast.server-error'));
    }

    setIsSubscribing(false);
  };

  return (
    <footer className="footer-container">
      <Container>
        <Row className="footer-container__top">
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={3}
            xl={3}
            className="mb-0 mb-sm-4 pb-0 pb-sm-2"
          >
            <h5 className="text-light top__head">
              {' '}
              {t('top.list-menu.menu-1.text-head')}
            </h5>

            <div className="top__head">
              {t('top.list-menu.menu-1.items.item-1')}
            </div>

            <ul className="social__meadia  mb-0 mt-4">
              <li className="list-inline-item top__button-social">
                <div className="button-social__icon">
                  <FontAwesomeIcon
                    icon={['fab', 'facebook-f']}
                    className="icon"
                  />
                </div>
              </li>
              <li className="list-inline-item top__button-social">
                <div className="button-social__icon">
                  <FontAwesomeIcon
                    icon={['fab', 'instagram']}
                    className="icon"
                  />
                </div>
              </li>
              <li className="list-inline-item top__button-social">
                <div className="button-social__icon">
                  <FontAwesomeIcon icon={['fab', 'twitter']} className="icon" />
                </div>
              </li>
              <li className="list-inline-item top__button-social">
                <div className="button-social__icon">
                  <FontAwesomeIcon
                    icon={['fab', 'linkedin-in']}
                    className="icon"
                  />
                </div>
              </li>
            </ul>
          </Col>

          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className="mt-4 mt-sm-0 pt-2 pt-sm-0"
          >
            <h5 className="text-light top__head">
              {t('top.list-menu.menu-2.text-head')}
            </h5>
            <ul className="list-unstyled top__list mt-4">
              <li>
                <a href="page-aboutus.html" className="list__items">
                  {' '}
                  <FontAwesomeIcon icon="chevron-right" className="icon" />{' '}
                  {t('top.list-menu.menu-2.items.item-1')}
                </a>
              </li>
              <li>
                <a href="page-team.html" className="list__items">
                  {' '}
                  <FontAwesomeIcon icon="chevron-right" className="icon" />{' '}
                  {t('top.list-menu.menu-2.items.item-2')}
                </a>
              </li>
              <li>
                <a href="page-jobs.html" className="list__items">
                  {' '}
                  <FontAwesomeIcon icon="chevron-right" className="icon" />{' '}
                  {t('top.list-menu.menu-2.items.item-3')}
                </a>
              </li>
              <li>
                <a href="page-blog-grid.html" className="list__items">
                  {' '}
                  <FontAwesomeIcon icon="chevron-right" className="icon" />{' '}
                  {t('top.list-menu.menu-2.items.item-4')}
                </a>
              </li>
            </ul>
          </Col>

          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className=" mt-4 mt-sm-0 pt-2 pt-sm-0"
          >
            <h5 className="text-light top-head">
              {t('top.list-menu.menu-3.text-head')}
            </h5>
            <ul className="list-unstyled top__list mt-4">
              <li>
                <Link id="sign-in" href="/sign-in">
                  <a className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('top.list-menu.menu-3.items.item-1')}
                  </a>
                </Link>
              </li>
              <li>
                <Link id="register" href="/register">
                  <a className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('top.list-menu.menu-3.items.item-2')}
                  </a>
                </Link>
              </li>
              <li>
                <Link id="real-estate" href="/real-estate">
                  <a className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('top.list-menu.menu-3.items.item-3')}
                  </a>
                </Link>
              </li>
              <li>
                <Link id="transport" href="/transport">
                  <a className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('top.list-menu.menu-3.items.item-4')}
                  </a>
                </Link>
              </li>
              <li>
                <Link id="job-search" href="/job-search">
                  <a className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('top.list-menu.menu-3.items.item-5')}
                  </a>
                </Link>
              </li>
              <li>
                <Link id="terms" href="/terms">
                  <a className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('top.list-menu.menu-3.items.item-6')}
                  </a>
                </Link>
              </li>
            </ul>
          </Col>

          <Col
            xs={12}
            sm={12}
            md={4}
            lg={3}
            xl={3}
            className="mt-4 mt-sm-0 pt-2 pt-sm-0"
          >
            <h5 className="text-light top-head">
              {t('top.list-menu.menu-4.text-head')}
            </h5>
            <p className="mt-4">{t('top.list-menu.menu-4.items.item-1')}</p>
            <Form>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div className="top-form-contact">
                    <label>
                      {t('top.list-menu.menu-4.items.item-2')}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="form-contact__input">
                      <AiOutlineMail className="input__icon" />
                      <Form.Control
                        name="email"
                        id="email"
                        type="email"
                        onChange={(event) =>
                          setSubscriber(event?.target?.value)
                        }
                        className="input__text"
                        placeholder={`${t(
                          'top.list-menu.menu-4.items.item-3'
                        )}:`}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Button
                    variant="outline-primary"
                    className="top-button-submit"
                    onClick={(e) => handleSubcriber(e)}
                    disabled={isSubscribing}
                  >
                    {t('top.list-menu.menu-4.items.item-4')}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="footer-container__bottom">
        <Container>
          <Row className="align-items-center">
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className="text-sm-left">
                <p className="mb-0">
                  ©{' ' + new Date().getFullYear() + ' '}
                  {t('bottom.left.copy-right') + `     `}
                  <FontAwesomeIcon
                    icon={['fa', 'heart']}
                    className="icon text-danger"
                  />
                  {`     `}. {t('bottom.right')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default withTranslation('footer')(Footer);
