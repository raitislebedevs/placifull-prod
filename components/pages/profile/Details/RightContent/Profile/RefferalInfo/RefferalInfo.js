import { REFERRAL_INIT } from 'constants/referralValues';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { formatNumber } from 'utils/standaloneFunctions';

const RefferalInfo = (props) => {
  const { t, user } = props;
  const { referralProgram } = user;

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
          <div className="mb-0 ">
            Ballance:
            <strong>{` € ${
              formatNumber(referralProgram?.amountEarned) || '0.00'
            }`}</strong>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <div>
            Referral Code: <strong>{referralProgram?.referralCode}</strong>
          </div>
        </Col>
      </Row>
      <Row className="referral__row">
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <div className="mb-0">
            Percantage: <strong>{referralProgram?.percantage} %</strong>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <div>
            Next Increase:{' '}
            <strong>
              {referralProgram?.referralCodeUsed
                ? REFERRAL_INIT.NEXT_LEVEL_STEP -
                  (referralProgram?.referralCodeUsed %
                    REFERRAL_INIT.NEXT_LEVEL_STEP)
                : REFERRAL_INIT.NEXT_LEVEL_STEP}
            </strong>
          </div>
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
