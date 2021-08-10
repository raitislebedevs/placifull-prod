import { withTranslation } from 'i18n';
import Link from 'next/link';
import { BiHomeAlt } from 'react-icons/bi';
import { Button, Row } from 'react-bootstrap';
import {
  EmailConfigurationForm,
  EmailConfirmationImage,
} from 'components/pages/email-confirmation';

const ForgotPassword = (props) => {
  const { t } = props;
  return (
    <div className="email-confirmation-container">
      <Row>
        <EmailConfigurationForm t={t} />
        <EmailConfirmationImage t={t} />
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

export default withTranslation(['email-confirmed', 'error'])(ForgotPassword);
