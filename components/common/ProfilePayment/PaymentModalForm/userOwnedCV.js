export const userOwnedCV = (t, subscriptions) => [
  {
    key: 'browserCvPurchase',
    label: t('payment:payment-modal.expiry-label'),
    price: 0,
    expiryDate: subscriptions?.subscriptionExpiryBrowserCV
      ? subscriptions?.subscriptionExpiryBrowserCV
      : '-',
  },
];
