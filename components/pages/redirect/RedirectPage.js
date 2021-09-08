import { useState, useEffect } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { ConnectionServices } from 'services';
import { loginSuccess } from 'actions';
import Cookies from 'js-cookie';
import Image from 'next/image';

const RedirectPage = (props) => {
  const { t, provider, dispatch } = props;
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleCallback();
  }, [provider]);

  const handleCallback = async () => {
    let query = window.location.search;
    window.history.replaceState(null, null, window.location.pathname);
    if (!provider || !query) {
      router.push('/sign-in');
      return;
    }
    const { data, error } = await ConnectionServices.LOGIN_WITH_PROVIDER(
      provider,
      query
    );
    if (data) {
      setIsSuccess(true);
      setTimeout(() => {
        dispatch(loginSuccess(data?.user));
        Cookies.set('access_token', data?.jwt);
        router.push('/profile');
      }, 1500);
    }
    if (error) {
      router.push('/sign-in');
    }
  };

  return (
    <div className="redirect">
      <div className="redirect-container">
        <div className={'redirect_logo'}>
          <Image
            src={
              'https://placifull-static.s3.eu-central-1.amazonaws.com/PlacifullLogo.png'
            }
            id="PlacifullLogo"
            alt="PlacifullLogo"
            width={314}
            height={100}
            quality={100}
          />
        </div>
        <div className={'redirect__content'}>
          {isSuccess ? (
            t('redirect:success')
          ) : (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" />
              {t('redirect:login')}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(null)(RedirectPage);
