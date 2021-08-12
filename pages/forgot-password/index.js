import { withTranslation } from 'i18n';
import Link from 'next/link';
import { BiHomeAlt } from 'react-icons/bi';
import { Button, Row, Col } from 'react-bootstrap';
import {
  ForgotPasswordForm,
  ForgotPasswordImage,
} from 'components/pages/forgot-password';
import Head from 'next/head';

const ForgotPassword = (props) => {
  const { t } = props;
  return (
    <div className="forgot-password-container">
      <Head>
        <title>{t('forgot-password:title')}</title>
      </Head>
      <Row>
        <ForgotPasswordForm t={t} />
        <ForgotPasswordImage t={t} />
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

// ForgotPassword.getInitialProps = async () => ({
//   namespacesRequired: ['forgot-password', 'error'],
// });

// ForgotPassword.propTypes = {
//   t: PropTypes.func.isRequired,
// };

export default withTranslation(['forgot-password', 'error'])(ForgotPassword);
