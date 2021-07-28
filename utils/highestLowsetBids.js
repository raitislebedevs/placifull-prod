export const getHigehstBid = (listingItem, user, bidPrice) => {
  let highestBid = {};

  if (
    !listingItem?.bidOffer?.highest ||
    listingItem?.bidOffer?.highest < bidPrice
  ) {
    highestBid.highest = bidPrice;
    highestBid.highestemail = user?.email;
    highestBid.highestphone = user?.phone;
    return highestBid;
  }

  highestBid.highest = listingItem?.bidOffer?.highest;
  highestBid.highestemail = listingItem?.bidOffer?.highestemail;
  highestBid.highestphone = listingItem?.bidOffer?.highestphone;
  return highestBid;
};

export const getLowestBid = (listingItem, user, bidPrice) => {
  let lowestBid = {};
  if (
    !listingItem?.bidOffer?.lowest ||
    listingItem?.bidOffer?.lowest > bidPrice
  ) {
    lowestBid.lowest = bidPrice;
    lowestBid.lowestemail = user?.email;
    lowestBid.lowestphone = user?.phone;
    return lowestBid;
  }
  lowestBid.lowest = listingItem?.bidOffer?.lowest;
  lowestBid.lowestemail = listingItem?.bidOffer?.lowestemail;
  lowestBid.lowestphone = listingItem?.bidOffer?.lowestphone;
  return lowestBid;
};

export const getAvarageBid = (listingItem, bidPrice) => {
  const bid = listingItem?.bidOffer?.avarage || 0;
  const bidCount = listingItem?.bidOffer?.avarageCount || 0;
  console.log(bid);
  console.log(bidCount);
  let avarageBids =
    parseFloat(((bidPrice + bid * bidCount) / (bidCount + 1)).toFixed(2)) ||
    bidPrice;

  console.log(avarageBids);

  let avarageProposol = {};
  avarageProposol.avarage = avarageBids || null;
  avarageProposol.avarageCount = bidCount + 1 || null;

  return avarageProposol;
};
