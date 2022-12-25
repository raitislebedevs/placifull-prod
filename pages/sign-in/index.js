import { withTranslation } from 'i18n';
import Link from 'next/link';
import Head from 'next/head';
import { BiHomeAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { SigninForm, SigninImage } from 'components/pages/signin';

const SignIn = props => {
  const { t } = props;
  return (
    <div className="signin-container">
      <Head>
        <title>{t('signin:title')}</title>
      </Head>
      <Row>
        <SigninForm t={t} />
        <SigninImage t={t} />
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

SignIn.getInitialProps = async () => ({
  namespacesRequired: ['signin', 'common', 'navbar', 'footer', 'error']
});

SignIn.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(SignIn);
