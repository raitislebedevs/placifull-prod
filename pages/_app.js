import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { useStore } from '../store/';
import { ToastContainer, Zoom } from 'react-toastify';
import { appWithTranslation } from './../i18n';
import { Navbar, Footer, LoaderBar } from 'components/layouts';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faUser,
  faSignInAlt,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCubes,
  faBed,
  faBath,
  faStar,
  faSuitcase,
  faTv,
  faGraduationCap,
  faHeart,
  faMoneyBillAlt,
  faTimes,
  faCheck,
  faBars,
  faEnvelope,
  faSearch,
  faMinus,
  faEye,
  faFlag,
  faMapMarkerAlt,
  faPhoneAlt,
  faGlobeEurope,
  faUsers,
  faFile,
  faBriefcase,
  faCog,
  faCheckCircle,
  faArrowRight,
  faArrowUp,
  faHome,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faWhatsapp,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {
  faStar as faStarReg,
  faClock,
} from '@fortawesome/free-regular-svg-icons';

//Styles
import 'react-toastify/dist/ReactToastify.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-datetime/css/react-datetime.css';
import 'react-dropdown/style.css';
import 'react-phone-input-2/lib/style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/main.scss';

//Fontawesome icons
library.add(
  faPlus,
  faUser,
  faChevronDown,
  faSignInAlt,
  faTwitter,
  faFacebookF,
  faYoutube,
  faCubes,
  faBed,
  faBath,
  faStar,
  faStarReg,
  faChevronLeft,
  faChevronRight,
  faSuitcase,
  faTv,
  faGraduationCap,
  faHeart,
  faMoneyBillAlt,
  faTimes,
  faCheck,
  faBars,
  faWhatsapp,
  faEnvelope,
  faSearch,
  faMinus,
  faClock,
  faEye,
  faFlag,
  faMapMarkerAlt,
  faPhoneAlt,
  faGlobeEurope,
  faUsers,
  faFile,
  faBriefcase,
  faCog,
  faInstagram,
  faLinkedinIn,
  faCheckCircle,
  faArrowRight,
  faArrowUp,
  faHome,
  faCamera
);
import * as ga from '../lib/ga';

function App(props) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    }),
      [];
  });

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const scrollRef = useRef(null);
  return (
    <Provider store={store}>
      <div ref={scrollRef}></div>
      <LoaderBar />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
      />

      <Button
        className="btn-back-to-top"
        aria-label="Back To Top"
        onClick={() =>
          scrollRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
          })
        }
      >
        <FontAwesomeIcon icon="arrow-up" className="arrow-icon" />
      </Button>
    </Provider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
  };
};

export default appWithTranslation(App);
