import { useEffect, useState } from 'react';
//Based on Popularity component
const usePopularity = (listingItem, Service) => {
  const [isLoading, setIsLoading] = useState(false);
  const [liveViews, setLiveViews] = useState(2);
  const [starValue, setStarValue] = useState();

  useEffect(() => {
    handlePopularity();
  }, []);

  const handleRating = async (rate) => {
    if (!listingItem.id) return;

    setIsLoading(true);
    try {
      const rating = listingItem?.popularity?.rating || 0;
      const voteCount = listingItem?.popularity?.voteCount || 0;

      let newRate =
        parseFloat(
          ((rate + rating * voteCount) / (voteCount + 1)).toFixed(1)
        ) || rate;

      let payload = {
        popularity: {
          views: liveViews,
          rating: newRate,
          voteCount: voteCount + 1,
        },
      };
      setStarValue(newRate);

      await Service.UPDATE(listingItem.id, payload);
    } catch (error) {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handlePopularity = async () => {
    if (!listingItem.id) return;

    try {
      setStarValue(listingItem?.popularity?.rating || 0);
      let views = listingItem?.popularity?.views || 0;
      views++;
      setLiveViews(views || 0);
      if (!views) return;

      let payload = {
        popularity: {
          ...listingItem.popularity,
          views,
        },
      };
      await Service.UPDATE(listingItem.id, payload);
    } catch (error) {}
  };

  return [liveViews, starValue, isLoading, handleRating];
};

export default usePopularity;
