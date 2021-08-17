import { useState } from 'react';
//All listing items whihc has the property flagged set as boolean
const useFlagged = (listingItem, Service) => {
  const [isLoadingFlag, setIsLoadingFlag] = useState(false);
  const [isListingFlagged, setIsListingFlagged] = useState(listingItem.flagged);

  const handleFlagged = async () => {
    if (!listingItem.id) return;

    setIsLoadingFlag(true);
    try {
      let payload = {
        flagged: !listingItem.flagged,
      };

      await Service.UPDATE(listingItem.id, payload);
      setIsListingFlagged(!listingItem.flagged);

      if (!listingItem.flagged) {
        setIsLoadingFlag(false);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoadingFlag(false);
  };

  return [isLoadingFlag, isListingFlagged, handleFlagged];
};

export default useFlagged;
