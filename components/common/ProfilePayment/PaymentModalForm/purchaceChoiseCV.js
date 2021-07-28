export const purchaceChoiseCV = (t, subscriptions) => [
  {
    key: 'activeSubscription',
    label: t('payment:payment-modal.browser-cv'),
    quantity: 1,
    price: 39.99,
    dayCost: 0.09,
    days: 365,
    qtyCost: 29.99,
    expiryDate: subscriptions?.subscriptionExpiryBrowserCV
      ? subscriptions?.subscriptionExpiryBrowserCV
      : new Date(),
    expiryPlan: 'subscriptionExpiryBrowserCV',
  },
];
