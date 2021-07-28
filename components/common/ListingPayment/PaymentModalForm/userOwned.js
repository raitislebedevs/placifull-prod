export const userOwned = (t, subscriptions) => [
  {
    key: 'standalone',
    label: t('payment:payment-modal.form.user-stock.single'),
    stock: subscriptions?.standalone ? subscriptions?.standalone : 0,
    price: 0,
    expiryDate: '-',
  },
  {
    key: 'subscriptionQuarterly',
    label: t('payment:payment-modal.form.user-stock.quartery'),
    stock: subscriptions?.subscriptionQuarterly
      ? subscriptions?.subscriptionQuarterly -
        subscriptions?.subscriptionQuarterlyInUse
      : 0,
    price: 0,
    expiryDate: subscriptions?.subscriptionExpiryQuarterly
      ? subscriptions?.subscriptionExpiryQuarterly
      : '-',
  },
  {
    key: 'subscriptionYearly',
    label: t('payment:payment-modal.form.user-stock.life'),
    stock: subscriptions?.subscriptionYearly
      ? subscriptions?.subscriptionYearly -
        subscriptions?.subscriptionYearlyInUse
      : 0,
    price: 0,
    expiryDate: subscriptions?.subscriptionExpiryYearly
      ? subscriptions?.subscriptionExpiryYearly
      : '-',
  },
];
