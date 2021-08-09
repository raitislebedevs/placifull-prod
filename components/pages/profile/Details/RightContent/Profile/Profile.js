import { Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PersonalInformation from './PersonalInformation';
import ChangePassword from './ChangePassword';
import { ModalAsk } from 'components/common';
import { useState } from 'react';
import { logout } from 'actions';
import RefferalInfo from './RefferalInfo';
import {
  RealEstateListingServices,
  TransportListingService,
  CurriculumVitaesService,
  VacancyListingService,
  RefferalServices,
  UserInfoServices,
  Subscriptions,
  FileServices,
  UserServices,
} from 'services';
import { sleep } from 'utils/standaloneFunctions';

const Profile = (props) => {
  const { t, user, dispatch } = props;
  const [isDeleting, setIsDeleting] = useState(false);

  const [isSowAccount, setIsShowAccount] = useState(false);
  const handleCloseDeleteAccountModal = () => {
    setIsShowAccount(false);
  };

  const handleOpenDeleteAccounModal = () => {
    setIsShowAccount(true);
  };

  const deleteImages = (element) => {
    element.forEach(async (picture) => {
      await FileServices.DELETE_FILE(picture.id);
    });
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      if (user?.userInfo?.id) await UserInfoServices.DELETE(user?.userInfo.id);

      if (user?.userInfo?.avatar?.id)
        await FileServices.DELETE_FILE(user?.userInfo?.avatar.id);
    } catch {
      console.log('Failed to delete avatar or user info');
    }

    try {
      if (user?.curriculumVitae?.id)
        await CurriculumVitaesService.DELETE(user?.curriculumVitae.id);
    } catch {
      console.log('Failed to delete CV');
    }

    try {
      if (user?.referralProgram?.id)
        await RefferalServices.DELETE(user?.referralProgram.id);
    } catch (error) {
      console.log('Failed to delete refferals', error);
    }

    let response = {};
    try {
      response = await RealEstateListingServices.FIND({
        user: user.id,
      });
      let realEstate = response?.data;
      if (!realEstate) return;

      realEstate?.forEach(async (element) => {
        if (!element) return;
        await RealEstateListingServices.DELETE(element.id);
        deleteImages(element.listingGallery);
      });
    } catch {
      console.log('Real estate were not deleted');
    }

    try {
      response = await TransportListingService.FIND({
        user: user.id,
      });
      let transport = response?.data;
      if (!transport) return;

      transport?.forEach(async (element) => {
        if (!element) return;

        await TransportListingService.DELETE(element.id);
        deleteImages(element.listingGallery);
      });
    } catch {
      console.log('Transport were not deleted');
    }

    try {
      response = await VacancyListingService.FIND({
        user: user.id,
      });
      let vacancy = response?.data;
      if (!vacancy) return;

      vacancy?.forEach(async (element) => {
        if (!element) return;

        await VacancyListingService.DELETE(element.id);
        deleteImages(element.listingGallery);
      });
    } catch {
      console.log('Vacancies were not deleted');
    }

    try {
      response = await Subscriptions.FIND({ userId: user.id });
      let subscription = response?.data;
      if (!subscription) return;

      subscription?.forEach(async (element) => {
        if (!element) return;

        await VacancyListingService.DELETE(element.id);
      });
    } catch {
      console.log('Subscriptions were not deleted');
    }

    try {
      await UserServices.DELETE(user.id);
    } catch {
      console.log('Main User was not deleted');
    }
    await sleep(2500);
    dispatch(logout());
    setIsDeleting(false);
    setIsShowAccount(false);
  };

  return (
    <>
      <ModalAsk
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
      <RefferalInfo t={t} />
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
