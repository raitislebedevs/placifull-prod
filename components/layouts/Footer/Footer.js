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
      setIsSubscribing(false);
      return;
    }
    try {
      let payload = {
        email: subscriber.toLowerCase(),
      };
      const result = await SubscriberService.CREATE(payload);
      if (result?.data)
        TostifyCustomContainer(
          'success',
          t('common:toast.messages.success'),
          t('common:toast.subscribed')
        );

      if (result?.error)
        TostifyCustomContainer(
          'info',
          t('common:toast.messages.info'),
          t('common:toast.already')
        );
    } catch {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('common:toast.server-error')
      );
    }

    setIsSubscribing(false);
  };

  return (
    <div itemScope itemType="https://schema.org/AboutPage">
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
                {t('footer:top.list-menu.menu-1.text-head')}
              </h5>

              <div className="top__head">
                {t('footer:top.list-menu.menu-1.items.item-1')}
              </div>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <ul className="social__meadia  mt-4">
                  <li className="list-inline-item top__button-social">
                    <div className="button-social__icon">
                      <a
                        href="https://www.facebook.com/placifull"
                        data-size="large"
                        aria-label="Facebook"
                      >
                        <FontAwesomeIcon
                          icon={['fab', 'facebook-f']}
                          className="icon"
                        />{' '}
                      </a>
                    </div>
                  </li>
                  <li className="list-inline-item top__button-social">
                    <div className="button-social__icon">
                      <a
                        href="https://www.instagram.com/"
                        data-size="large"
                        aria-label="Instagram"
                      >
                        <FontAwesomeIcon
                          icon={['fab', 'instagram']}
                          className="icon"
                        />
                      </a>
                    </div>
                  </li>
                  <li className="list-inline-item top__button-social">
                    <div className="button-social__icon">
                      <a
                        href="https://twitter.com/intent/tweet?text=placifull.com"
                        data-size="large"
                        aria-label="Twitter"
                      >
                        <FontAwesomeIcon
                          icon={['fab', 'twitter']}
                          className="icon"
                        />
                      </a>
                    </div>
                  </li>
                  <li className="list-inline-item top__button-social">
                    <div className="button-social__icon">
                      <a
                        href="https://www.linkedin.com/"
                        data-size="large"
                        aria-label="LinkedIn"
                      >
                        <FontAwesomeIcon
                          icon={['fab', 'linkedin-in']}
                          className="icon"
                        />
                      </a>
                    </div>
                  </li>
                </ul>
              </Col>
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
                {t('footer:top.list-menu.menu-2.text-head')}
              </h5>
              <ul className="list-unstyled top__list mt-4">
                <li>
                  <a href="/#about-us" className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('footer:top.list-menu.menu-2.items.item-1')}
                  </a>
                </li>
                <li>
                  <a href="/#about-us" className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('footer:top.list-menu.menu-2.items.item-2')}
                  </a>
                </li>
                {/* <li>
                  <a href="/#pricing-panel" className="list__items">
                    {' '}
                    <FontAwesomeIcon
                      icon="chevron-right"
                      className="icon"
                    />{' '}
                    {t('footer:top.list-menu.menu-2.items.item-5')}
                  </a>
                </li> */}
                <li>
                  <a href="/#promoted-section" className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('footer:top.list-menu.menu-2.items.item-6')}
                  </a>
                </li>
                <li>
                  <a href="/voting-board" className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('footer:top.list-menu.menu-2.items.item-7')}
                  </a>
                </li>
                <li>
                  <a href="/blog" className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('footer:top.list-menu.menu-2.items.item-4')}
                  </a>
                </li>
                <li>
                  <a href="/tools/mortgage-calculator" className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('footer:top.list-menu.menu-2.items.item-8')}
                  </a>
                </li>
                {/* <li>
                  <a href="/tools/finance-calculator" className="list__items">
                    <FontAwesomeIcon icon="chevron-right" className="icon" />
                    {t('footer:top.list-menu.menu-2.items.item-9')}
                  </a>
                </li> */}
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
                {t('footer:top.list-menu.menu-3.text-head')}
              </h5>
              <ul className="list-unstyled top__list mt-4">
                <li>
                  <Link id="sign-in" href="/sign-in">
                    <a className="list__items">
                      <FontAwesomeIcon icon="chevron-right" className="icon" />
                      {t('footer:top.list-menu.menu-3.items.item-1')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link id="register" href="/register">
                    <a className="list__items">
                      <FontAwesomeIcon icon="chevron-right" className="icon" />
                      {t('footer:top.list-menu.menu-3.items.item-2')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link id="real-estate" href="/real-estate">
                    <a className="list__items">
                      <FontAwesomeIcon icon="chevron-right" className="icon" />
                      {t('footer:top.list-menu.menu-3.items.item-3')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link id="transport" href="/transport">
                    <a className="list__items">
                      <FontAwesomeIcon icon="chevron-right" className="icon" />
                      {t('footer:top.list-menu.menu-3.items.item-4')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link id="job-search" href="/job-search">
                    <a className="list__items">
                      <FontAwesomeIcon icon="chevron-right" className="icon" />
                      {t('footer:top.list-menu.menu-3.items.item-5')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link id="terms" href="/terms">
                    <a className="list__items">
                      <FontAwesomeIcon icon="chevron-right" className="icon" />
                      {t('footer:top.list-menu.menu-3.items.item-6')}
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
                {t('footer:top.list-menu.menu-4.text-head')}
              </h5>
              <p className="mt-4">{t('top.list-menu.menu-4.items.item-1')}</p>
              <Form>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="top-form-contact">
                      <label>
                        {t('footer:top.list-menu.menu-4.items.item-2')}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="form-contact__input">
                        <AiOutlineMail className="input__icon" />
                        <Form.Control
                          name="subscribeEmail"
                          id="subscribeEmail"
                          type="email"
                          maxLength={'75'}
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
                      {t('footer:top.list-menu.menu-4.items.item-4')}
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
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="text-sm-left">
                  <p className="mb-0">
                    © {` `}
                    <span itemProp="copyrightYear">
                      {new Date().getFullYear()}
                    </span>
                    {` `}
                    {t('footer:bottom.left.copy-right') + `     `}
                    <FontAwesomeIcon
                      icon={['fa', 'heart']}
                      className="icon text-danger"
                    />
                    {` `}.{' '}
                    <span itemProp="copyrightHolder">
                      {t('footer:bottom.right')}
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </div>
  );
};

export default withTranslation('footer')(Footer);
