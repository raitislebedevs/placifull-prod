import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from 'actions';
import { Link } from 'i18n';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';

const defaultAvatar = '/static/images/default-avatar.png';

const ProfileMenu = (props) => {
  const { t, user, dispatch } = props;
  let className = `${props.className} profile__dropdown`;
  let email = user ? user?.email : '';
  let fullName =
    user && user?.userInfo && user?.userInfo?.firstName?.trim()
      ? `${user?.userInfo?.firstName} ${user?.userInfo?.lastName}`
      : 'Name not found';
  let avatar = user?.userInfo?.avatar?.url || defaultAvatar;

  const logoutHandler = () => {
    dispatch(logout());
    TostifyCustomContainer('success', t('logout-success'));
  };

  return (
    <div className={className}>
      <div className="dropdown__avatar-name">
        <div
          id="avatar"
          className="avatar-name__avatar"
          style={{ backgroundImage: `url(${avatar})` }}
        ></div>
        <div className="avatar-name__name-email">
          <div className="name-email__name">{fullName}</div>
          <div className="name-email__email">{email}</div>
        </div>
      </div>
      <ul className="dropdown__items">
        <Link href="/profile">
          <a>
            <li id="edit-profile">{t('common:user-box.profile')}</li>
          </a>
        </Link>
        <hr></hr>
        <li id="logout" onClick={() => logoutHandler()}>
          {t('common:user-box.log-out')}
        </li>
      </ul>
    </div>
  );
};

const UserBox = (props) => {
  const { t, user, dispatch } = props;
  const [isOpen, setIsOpen] = useState(false);
  let avatar = user?.userInfo?.avatar?.url || defaultAvatar;
  const handleMenu = (e) => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="profile-wrapper__profile">
      <div
        onClick={(e) => {
          handleMenu(e);
        }}
        className="profile__toggle"
        style={{ backgroundImage: `url(${avatar})` }}
      ></div>

      {isOpen && <ProfileMenu t={t} user={user} dispatch={dispatch} />}
    </div>
  );
};

export default connect(null)(UserBox);
