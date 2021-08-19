import { Subscriptions } from 'services';
import { inUse } from 'constants/listingDetails';
import useSingleSubscription from './useSingleSubscription';
import { defaultPurchaseOption } from 'constants/defaultPurchaseOption';

const useSubscription = (id, area) => {
  const [subscriptions, getSubscriptions] = useSingleSubscription(id);

  const handleInputSubscriptions = async (details, listingId) => {
    if (!details) return;
    try {
      //Subscription colelction has plan and planInUse properties.
      let spendingPlan = details?.purchasePlan + inUse;
      let activeListings = subscriptions[area][spendingPlan]
        ? subscriptions[area][spendingPlan]
        : 0;

      activeListings++;
      let subscriptionDetails = subscriptions[area] ? subscriptions[area] : {};

      if (details?.purchasePlan === defaultPurchaseOption) {
        spendingPlan = defaultPurchaseOption;
        activeListings = subscriptions[area][spendingPlan] - 1;
      }
      const listingIds = subscriptions[area]?.listingIds
        ? subscriptions[area]?.listingIds
        : [];

      listingIds.push({ id: listingId, plan: details?.purchasePlan });
      const recordId = subscriptions?.id;
      const payload = {
        ...subscriptions,
        [area]: {
          ...subscriptionDetails,
          [spendingPlan]: activeListings,
          listingIds,
        },
        userId: id,
      };
      await Subscriptions.UPDATE(recordId, payload);
    } catch (e) {
      console.log(e.message);
    }
  };

  return [handleInputSubscriptions, getSubscriptions];
};

export default useSubscription;
