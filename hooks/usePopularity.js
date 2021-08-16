import { useEffect, useState } from 'react';
import LanguageService from 'services/languageService.js';

//Based on Popularity component
const usePopularity = (component, Service) => {
  const [isLoading, setIsLoading] = useState(false);
  const [liveViews, setLiveViews] = useState(2);
  const [starValue, setStarValue] = useState();

  useEffect(() => {
    handlePopularity();
  }, [component]);

  const handleRating = async (rate) => {
    if (!component.id) return;

    setIsLoading(true);
    try {
      const rating = component?.popularity?.rating || 0;
      const voteCount = component?.popularity?.voteCount || 0;
      let usersVoted = component?.popularity?.usersVoted || [];
      const local = await LanguageService.LOCAL();

      if (usersVoted.includes(local.IPv4)) return;

      let newRate =
        parseFloat(
          ((rate + rating * voteCount) / (voteCount + 1)).toFixed(1)
        ) || rate;

      let payload = {
        popularity: {
          ...component.popularity,
          views: liveViews,
          rating: newRate,
          voteCount: voteCount + 1,
          usersVoted,
        },
      };
      setStarValue(newRate);

      await Service.UPDATE(component.id, payload);
    } catch (error) {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handlePopularity = async () => {
    if (!component.id) return;

    try {
      const local = await LanguageService.LOCAL();
      let usersViewed = component?.popularity?.usersViewed || [];

      if (usersViewed.includes(local.IPv4)) return;

      usersViewed.push(local.IPv4);
      setStarValue(component?.popularity?.rating || 0);
      let views = component?.popularity?.views || 0;
      views++;
      setLiveViews(views || 0);
      if (!views) return;

      let payload = {
        popularity: {
          ...component.popularity,
          views,
          usersViewed,
        },
      };
      await Service.UPDATE(component.id, payload);
    } catch (error) {}
  };

  return [liveViews, starValue, isLoading, handleRating];
};

export default usePopularity;
