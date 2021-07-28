import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { standalone, inUse } from 'constants/listingDetails';
import { Subscriptions } from 'services';

const useUpdateSubscriptions = () => {
  const handleUpdate = async (subscriptions, subscription, id, subId) => {
    console.log('This is the issue???');
    try {
      let element = subscription.listingIds.filter(
        (listing) => listing?.id == id
      )[0];

      subscription.listingIds = subscription.listingIds.filter(
        (listing) => listing?.id != id
      );

      console.log(subscription);
      const { plan } = element;
      let newInuse = plan + inUse;
      if (plan != standalone) {
        subscription[plan]++;
        subscription[newInuse]--;
      }

      if (subscription[newInuse] < 0) subscription[newInuse] = 0;

      const payload = {
        ...subscriptions,
        ...subscription,
      };
      console.log(payload);
      let { data } = await Subscriptions.UPDATE(subId, payload);
      return data;
    } catch (e) {
      TostifyCustomContainer('warning', 'Subscription Update Failed!');
      return;
    }
  };

  return [handleUpdate];
};

export default useUpdateSubscriptions;
