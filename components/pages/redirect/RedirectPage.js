import { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ConnectionServices } from 'services';
import { loginSuccess } from 'actions';
import Cookies from 'js-cookie';

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
      toast.error('No Credential found');
      router.push('/');
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
      }, 2000);
    }
    if (error) {
      toast.error('No Credential found');
      router.push('/');
    }
  };

  return (
    <Container className="redirect-container">
      <div>
        {isSuccess ? (
          t('success')
        ) : (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" />
            {t('login')}
          </>
        )}
      </div>
    </Container>
  );
};

export default connect(null)(RedirectPage);
