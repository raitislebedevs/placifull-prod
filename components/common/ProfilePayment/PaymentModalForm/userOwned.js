export const userOwned = (t, subscriptions) => [
  {
    key: 'singlePositions',
    label: t('payment:payment-modal.form.user-stock.single'),
    stock: ` ${subscriptions?.standalone ? subscriptions?.standalone : 0}`,
    price: 0,
    expiryDate: '-',
  },
  {
    key: 'querterlySubscription',
    label: t('payment:payment-modal.form.user-stock.quartery'),
    stock: ` ${
      subscriptions?.subscriptionQuarterly
        ? subscriptions?.subscriptionQuarterly
        : 0
    }`,
    active: ` ${
      subscriptions?.subscriptionQuarterlyInUse
        ? subscriptions?.subscriptionQuarterlyInUse
        : 0
    }`,
    price: 0,
    expiryDate: subscriptions?.subscriptionExpiryQuarterly
      ? subscriptions?.subscriptionExpiryQuarterly
      : '-',
  },
  {
    key: 'lifeTimePosition',
    label: t('payment:payment-modal.form.user-stock.life'),
    stock: ` ${
      subscriptions?.subscriptionYearly ? subscriptions?.subscriptionYearly : 0
    }`,
    active: ` ${
      subscriptions?.subscriptionYearlyInUse
        ? subscriptions?.subscriptionYearlyInUse
        : 0
    }`,
    price: 0,
    expiryDate: subscriptions?.subscriptionExpiryYearly
      ? subscriptions?.subscriptionExpiryYearly
      : '-',
  },
];
