import Profile from './Profile';
import RealEstate from './RealEstate';
import CV from './CV';
import Transport from './Transport';
import BrowseCV from './BrowseCV';
import PaymentReceipts from './PaymentReceipts';
import Jobs from './Jobs/Jobs';
import BlogContent from './Admin/BlogContent';

const RightContent = (props) => {
  const { t, currentTab, user, isMobile, isSmall } = props;
  const menu = [
    {
      key: 'profile',
      component: <Profile user={user} t={t} />,
    },
    {
      key: 'real-estate',
      component: <RealEstate user={user} t={t} isMobile={isMobile} />,
    },
    {
      key: 'transport',
      component: <Transport user={user} t={t} isMobile={isMobile} />,
    },
    {
      key: 'cv',
      component: (
        <CV
          user={user}
          t={t}
          isMobile={isMobile}
          isSmall={isSmall}
          currentTab={currentTab}
        />
      ),
    },

    {
      key: 'browser-cv',
      component: <BrowseCV user={user} t={t} />,
    },

    {
      key: 'jobs',
      component: <Jobs user={user} t={t} />,
    },
    {
      key: 'payment-receipts',
      component: <PaymentReceipts user={user} t={t} />,
    },
    {
      key: 'blog-content',
      component: <BlogContent user={user} t={t} />,
    },
  ];
  return (
    <div className="detail-container__right-content">
      {menu.find((item) => item.key === currentTab)?.component}
    </div>
  );
};

export default RightContent;
