import { useLayoutEffect } from 'react';
import { withTranslation } from 'i18n';
import Link from 'next/link';
import Head from 'next/head';
import { BiHomeAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import {
  ResetPasswordForm,
  ResetPasswordImage,
} from 'components/pages/reset-password';
import { useRouter } from 'next/router';

const ResetPassword = (props) => {
  const { t, code } = props;
  const router = useRouter();

  useLayoutEffect(() => {
    if (!code) {
      router.push('/');
    }
  }, [code]);

  return (
    <div className="forgot-password-container">
      <Head>
        <title>You are still awsome!</title>
      </Head>
      <Row>
        <ResetPasswordForm code={code} t={t} />
        <ResetPasswordImage t={t} />
      </Row>
      <div className="icon-wrapper">
        <Link href="/">
          <Button className="button-icon-home">
            <BiHomeAlt size="20px" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

ResetPassword.getInitialProps = async ({ query }) => {
  return {
    code: query.code,
    namespacesRequired: ['reset-password', 'error'],
  };
};

ResetPassword.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ResetPassword);
