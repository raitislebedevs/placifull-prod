import { OTHERS, PERIOD, QUANTITY } from 'constants/purchasePrice';

export const purchaceChoiseCV = (t, subscriptions) => [
  {
    key: 'activeSubscription',
    label: t('payment:payment-modal.browser-cv'),
    quantity: QUANTITY.QTY_BROWSERCV,
    price: OTHERS.BROWSERCV,
    dayCost: (OTHERS.BROWSERCV / PERIOD.YEARLY_DAYS).toFixed(2),
    days: PERIOD.YEARLY_DAYS,
    qtyCost: OTHERS.BROWSERCV,
    expiryDate: subscriptions?.subscriptionExpiryBrowserCV
      ? subscriptions?.subscriptionExpiryBrowserCV
      : new Date(),
    expiryPlan: 'subscriptionExpiryBrowserCV',
  },
];
