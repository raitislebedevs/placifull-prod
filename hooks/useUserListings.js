import { useEffect, useState } from 'react';

const useUserListings = (listingItem, Service) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSingleListing, setIsSingleListing] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [userItemCount, setUserItemCount] = useState(0);

  useEffect(() => {
    getUserListings();
  }, []);

  const getUserListings = async () => {
    try {
      setIsLoading(true);
      const result = await Service.FIND({
        _where: {
          user: listingItem?.user?.id,
        },
      });
      const count = await Service.COUNT({
        _where: {
          user: listingItem?.user?.id,
        },
      });

      setUserItems(result.data);
      setUserItemCount(count.data);

      if (count.data <= 1 || !listingItem?.user?.id) setIsSingleListing(true);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setIsSingleListing(true);
      console.log(e.message);
    }
  };

  return [isLoading, isSingleListing, userItems, userItemCount];
};

export default useUserListings;
