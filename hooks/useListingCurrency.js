import { useEffect, useState } from 'react';

const useListingCurrency = (listingItem) => {
  const [listingCurrency, setListingCurrency] = useState('$');

  useEffect(() => {
    handleListingCurrency();
  }, []);

  const handleListingCurrency = () => {
    if (listingItem?.currency?.symbol)
      return setListingCurrency(listingItem?.currency?.symbol);

    if (listingItem?.currency) return setListingCurrency(listingItem?.currency);
  };

  return [listingCurrency];
};

export default useListingCurrency;
