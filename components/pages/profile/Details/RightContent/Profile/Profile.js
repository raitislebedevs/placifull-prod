import { Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PersonalInformation from './PersonalInformation';
import ChangePassword from './ChangePassword';
import { DeleteModalAsk } from 'components/common';
import { useState } from 'react';
const Profile = (props) => {
  const { t, user } = props;
  const [isDeleting, setIsDeleting] = useState(false);

  const [isSowAccount, setIsShowAccount] = useState(false);
  const handleCloseDeleteAccountModal = () => {
    setIsShowAccount(false);
  };

  const handleOpenDeleteAccounModal = () => {
    setIsShowAccount(true);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    console.log('Account deleted');
    await sleep(5000);
    setIsDeleting(false);
    setIsShowAccount(false);
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  return (
    <>
      <DeleteModalAsk
        isShowDeleteModal={isSowAccount}
        handleCloseDeleteModal={handleCloseDeleteAccountModal}
        handleDelete={handleDeleteAccount}
        bodyText={t('profile:delete-account.body')}
        headerText={t('profile:delete-account.header')}
        submitText={t('profile:delete-account.delete')}
        cancelText={t('profile:delete-account.cancel')}
      />

      <PersonalInformation t={t} />
      <ChangePassword t={t} />
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="right-content__delete-account"
      >
        <div className="p-4 border-bottom">
          <h5 className="mb-0 text-danger">
            {t('profile:right-content.profile.delete-form.text')}
          </h5>
        </div>
        <div className="p-4">
          <h6 className="mb-0">
            {t('profile:right-content.profile.delete-form.content')}
          </h6>
          <div className="mt-4">
            <Button
              variant="danger"
              onClick={() => handleOpenDeleteAccounModal()}
              disabled={isDeleting}
            >
              {t('profile:right-content.profile.delete-form.button-delete')}
            </Button>
          </div>
        </div>
      </Col>
    </>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(Profile);
