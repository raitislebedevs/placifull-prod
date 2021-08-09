import { ModalAsk } from 'components/common';
import { REFERRAL_INIT } from 'constants/referralValues';
import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { formatNumber } from 'utils/standaloneFunctions';
import { useRouter } from 'next/router';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';

const RefferalInfo = (props) => {
  const { t, user } = props;
  const { referralProgram } = user;
  const router = useRouter();
  const [isWithdrawModal, setIsWithdrawModal] = useState(false);

  const handleWithdrawModal = () => {
    setIsWithdrawModal(false);
  };

  const handleContactUs = async () => {
    setIsWithdrawModal(false);
    router.push('/contact');
  };

  const handleWithdraw = () => {
    if (referralProgram?.amountEarned < 25) {
      TostifyCustomContainer(
        'info',
        t('common:toast.messages.info'),
        t('common:toast.minimal-withdraw')
      );
      return;
    }

    setIsWithdrawModal(true);
  };

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
          <strong>{t('profile:reffaral.heading')}</strong>
        </h5>
      </div>
      <Row className="referral__row">
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <div className="mb-0 ">
            {t('profile:reffaral.balance')}:
            <strong>{` € ${
              formatNumber(referralProgram?.amountEarned) || '0.00'
            }`}</strong>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <div>
            {t('profile:reffaral.code')}:{' '}
            <strong>{referralProgram?.referralCode}</strong>
          </div>
        </Col>
      </Row>
      <Row className="referral__row">
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <div className="mb-0">
            {t('profile:reffaral.percantage')}:{' '}
            <strong>{referralProgram?.percantage} %</strong>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <div>
            {t('profile:reffaral.next')}:{' '}
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
        <Button variant="success" onClick={() => handleWithdraw()}>
          {t('profile:reffaral.withdraw')}
        </Button>
      </div>
      <ModalAsk
        isShowDeleteModal={isWithdrawModal}
        handleCloseDeleteModal={handleWithdrawModal}
        handleDelete={handleContactUs}
        bodyText={t('profile:referral-modal.body-text')}
        headerText={t('profile:referral-modal.header-text')}
        submitText={t('profile:referral-modal.submit-text')}
        cancelText={t('profile:referral-modal.close-text')}
        theme={'green'}
      />
    </Col>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(RefferalInfo);
