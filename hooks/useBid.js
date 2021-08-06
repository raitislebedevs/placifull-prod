import { useState } from 'react';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { getHigehstBid, getLowestBid } from 'utils/highestLowsetBids';

const useBid = (t, bidPrice, Service, user, listingItem) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (0.8 * listingItem?.price > bidPrice)
      return TostifyCustomContainer(
        'info',
        t('common:toast.messages.info'),
        t('common:toast.price-lower')
      );

    if (1.2 * listingItem?.price < bidPrice)
      return TostifyCustomContainer(
        'info',
        t('common:toast.messages.info'),
        t('common:toast.price-upper')
      );

    if (!listingItem?.id) {
      setIsLoading(false);
      return TostifyCustomContainer(
        'info',
        t('common:toast.messages.info'),
        t('common:toast.preview')
      );
    }

    if (!user) {
      setIsLoading(false);
      return TostifyCustomContainer(
        'info',
        t('common:toast.messages.info'),
        t('common:toast.log-in')
      );
    }

    if (!bidPrice) {
      setIsLoading(false);
      return TostifyCustomContainer(
        'info',
        t('common:toast.messages.info'),
        t('common:toast.bidding-price')
      );
    }
    setIsLoading(true);

    try {
      let biddingUser = {};
      biddingUser.email = user?.email;
      biddingUser.phone = user?.userInfo?.phone;

      let highestBid = getHigehstBid(listingItem, biddingUser, bidPrice);
      let lowestBid = getLowestBid(listingItem, biddingUser, bidPrice);
      let payload = {
        bidOffer: {
          ...highestBid,
          ...lowestBid,
        },
      };

      await Service.UPDATE(listingItem.id, payload);

      TostifyCustomContainer(
        'success',
        t('common:toast.messages.success'),
        t('common:toast.bid-placed')
      );
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
  };

  return [isLoading, handleSubmit];
};

export default useBid;
