export const promoted = (listingItem, t) => {
  if (listingItem?.isPromotable) return t('real-estate-detail:about.featured');
  return;
};
