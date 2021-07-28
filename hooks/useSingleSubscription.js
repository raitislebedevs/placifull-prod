import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { useEffect, useState } from 'react';
import { Subscriptions } from 'services';

const useSingleSubscription = (id) => {
  const [subscriptions, setSubscriptions] = useState({});

  useEffect(() => {
    if (id) getSubscriptions();
  }, [id]);

  const getSubscriptions = async () => {
    if (!id) return;
    try {
      const filter = {
        userId: id,
      };
      const { data } = await Subscriptions.FIND({
        _where: filter,
      });

      if (data?.length == 0) {
        setSubscriptions({});
      } else {
        setSubscriptions(data[0]);
      }
    } catch (e) {
      TostifyCustomContainer(
        'error',
        'Server was not reached. Please contact us!'
      );
    }
  };

  return [subscriptions, getSubscriptions];
};

export default useSingleSubscription;
