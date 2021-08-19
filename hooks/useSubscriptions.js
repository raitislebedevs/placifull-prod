import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { useState } from 'react';
import { Subscriptions } from 'services';

const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState({});
  const getSubscriptions = async (t, user) => {
    try {
      const filter = {
        userId: user,
      };
      const { data } = await Subscriptions.FIND({
        _where: filter,
      });
      if (data?.length === 0) {
        setSubscriptions({});
      }
      if (data?.length === 1) {
        setSubscriptions(data[0]);
      }
    } catch (e) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        'We could not update Subscriptions :( '
      );
    }
  };

  return [subscriptions, getSubscriptions];
};

export default useSubscriptions;
