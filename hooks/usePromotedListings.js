//All listing items whihc has the property flagged set as boolean
const useFlagged = (Service) => {
  const getRealEstate = async () => {
    try {
      setIsLoading(true);
      const filter = {
        promoted: true,
      };
      const result = await Service.FIND({
        _limit: limit,
        _start: skip,
        _where: filter,
      });
      const count = await Service.COUNT();
      setTotal(count.data);
      setItems(result.data);
      let randomShow = random(0, Math.ceil(total / limit));
      setSkip(randomShow);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return [isLoadingFlag, isListingFlagged, handleFlagged];
};

export default useFlagged;
