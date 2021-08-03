import { withTranslation } from 'i18n';
import Link from 'next/link';
import { BiHomeAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { RegisterForm, RegisterImage } from 'components/pages/register';

const Register = (props) => {
  const { t } = props;
  return (
    <div className="register-container">
      <Row>
        <RegisterForm t={t} />
        <RegisterImage t={t} />
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

Register.getInitialProps = async () => ({
  namespacesRequired: ['register', 'error'],
});

Register.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Register);
