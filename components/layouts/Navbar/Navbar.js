import { useState, useEffect } from 'react';
import {
  Navbar as NavbarBootstrap,
  Nav,
  Dropdown,
  Button,
  Container,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LanguaggeSelect from './LanguageSelect';
import OpportunitiesSelect from './OpportunitesSelect';
import { withTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { UserServices } from 'services';
import Cookies from 'js-cookie';
import { loginSuccess, setLoadingUser } from 'actions';
import UserBox from './UserBox';

const logo = '/static/images/logo.svg';
const logoWhite = '/static/images/logo-white.png';

const Navbar = (props) => {
  const { t, dispatch, user } = props;
  const router = useRouter();
  const [isScroll, setIsScroll] = useState(false);
  const checkCurrentSession = async () => {
    dispatch(setLoadingUser(true));
    try {
      const token = Cookies.get('access_token');
      if (token) {
        const { data, error } = await UserServices.GET_ME();
        if (data) {
          dispatch(loginSuccess(data));
        }
        if (error) {
          throw error;
        }
      } else {
        throw '';
      }
    } catch (error) {
      Cookies.remove('access_token');
    }
    dispatch(setLoadingUser(false));
  };

  useEffect(() => {
    checkCurrentSession();
  }, []);

  useEffect(() => {
    let containerRef = document.getElementById('__next');
    containerRef.addEventListener('scroll', () => {
      if (containerRef.scrollTop > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  let showNavbarLight = isScroll || router.pathname !== '/';

  return (
    <NavbarBootstrap
      sticky="top"
      className={`${showNavbarLight ? 'navbar--light' : ''}`}
    >
      <Container>
        <Link href="/">
          <NavbarBootstrap.Brand href="/">
            <img
              src={showNavbarLight ? logo : logoWhite}
              id="logo"
              width="auto"
              height="45"
              className="d-inline-block align-top"
              alt="Placifull"
            />
          </NavbarBootstrap.Brand>
        </Link>
        <Nav className="ml-auto">
          <Nav className="navbar__right__links">
            <Nav.Item>
              <Nav.Link
                href="/"
                active={router.pathname === '/'}
                className="nav-item__linK"
              >
                <div id="home">{t('navbar:home')}</div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <OpportunitiesSelect t={t} />
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/contact"
                active={router.pathname === '/contact'}
                className="nav-item__link"
              >
                <div id="help-support">{t('navbar:help')}</div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <LanguaggeSelect showNavbarLight={showNavbarLight} />
            </Nav.Item>
          </Nav>
          <div className="navbar-divider navbar-divider--left "></div>
          <Nav>
            {user ? (
              <UserBox user={user} t={t} />
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link
                    href="/sign-in"
                    active={router.pathname === '/sign-in'}
                    className="nav-item__link "
                  >
                    <FontAwesomeIcon
                      icon="sign-in-alt"
                      className="link__icon"
                    />
                    <div id="sign-in" className="link__text">
                      {t('navbar:sign-in')}
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/register"
                    active={router.pathname === '/register'}
                    className="nav-item__link"
                  >
                    <FontAwesomeIcon icon="user" className="link__icon" />
                    <div id="register" className="link__text">
                      {t('navbar:register')}
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            <div className="navbar-divider"></div>
            <Nav.Item>
              <Link href="/add-listing/real-estate">
                <Button
                  className="add-listing-button"
                  variant={showNavbarLight ? 'primary' : 'outline-light'}
                >
                  <FontAwesomeIcon icon="plus" />{' '}
                  <span id="add-listing" className="add-listing-button__text">
                    {t('navbar:add-listing')}
                  </span>
                </Button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Dropdown alignRight>
                <Dropdown.Toggle menualign="right" className="navbar-hamburger">
                  <FontAwesomeIcon icon="bars" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as="div">
                    <Link href="/">{t('navbar:home')}</Link>
                  </Dropdown.Item>
                  <OpportunitiesSelect t={t} />
                  <Dropdown.Item as="div">
                    <Link href="/contact">{t('navbar:help')}</Link>
                  </Dropdown.Item>
                  <LanguaggeSelect showNavbarLight={showNavbarLight} t={t} />
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Nav>
      </Container>
    </NavbarBootstrap>
  );
};

Navbar.propTypes = {
  t: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  isLogged: state.connectionReducer.isLogged,
  user: state.connectionReducer.user,
  isLoadingUser: state.connectionReducer.isLoadingUser,
});

export default compose(
  withTranslation(['navbar', 'error']),
  connect(mapStateToProps)
)(Navbar);
