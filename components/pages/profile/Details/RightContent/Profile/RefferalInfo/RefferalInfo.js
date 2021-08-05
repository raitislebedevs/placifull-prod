import { withTranslation } from 'i18n';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { FiUserCheck, FiMessageCircle, FiPhone } from 'react-icons/fi';
import {
  FaFacebook,
  FaYoutube,
  FaInstagramSquare,
  FaTwitter,
} from 'react-icons/fa';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

const RefferalInfo = (props) => {
  const { t, user } = props;
  const { referralProgram } = user;

  console.log(referralProgram);

  return (
    <Col
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      className="right-content__refferal-account"
    >
      <div className="p-4 border-bottom program">
        <h5 className="mb-0 text-success">
          <strong>Referral Program</strong>
        </h5>
      </div>
      <Row className="referral__row">
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <h4 className="mb-0 ">
            Ballance:
            <strong>{` € ${referralProgram?.amountEarned || '0.00'}`}</strong>
          </h4>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <h5>
            Referral Code: <strong>{referralProgram?.referralCode}</strong>
          </h5>
        </Col>
      </Row>
      <Row className="referral__row">
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <h4 className="mb-0">
            Percantage: <strong>{referralProgram?.percantage} %</strong>
          </h4>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <h5>
            Next Increase:{' '}
            <strong>
              {referralProgram?.referralCodeUsed
                ? referralProgram?.referralCodeUsed % 10
                : 10}
            </strong>
          </h5>
        </Col>
      </Row>
      <div className="withdraw_button">
        <Button variant="success">Withdraw</Button>
      </div>
    </Col>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(RefferalInfo);
