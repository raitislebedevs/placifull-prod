export const purchaceChoise = (t, purchaceSettings) => [
  {
    key: 'standalone',
    label: t('payment:payment-modal.form.purchase-items.single'),
    quantity: 1,
    price: 3.99,
    dayCost: 0.14,
    qtyCost: 3.99,
    expiryDate: new Date(),
  },
  {
    key: 'subscriptionQuarterly',
    label: t('payment:payment-modal.form.purchase-items.quarterly'),
    quantity: 8,
    price: 83.99,
    days: 91,
    dayCost: 0.95,
    qtyCost: 10.5,
    expiryDate: purchaceSettings?.subscriptionExpiryQuarterly
      ? purchaceSettings?.subscriptionExpiryQuarterly
      : new Date(),
    expiryPlan: 'subscriptionExpiryQuarterly',
  },
  {
    key: 'subscriptionYearly',
    label: t('payment:payment-modal.form.purchase-items.life'),
    quantity: 20,
    price: 719.99,
    days: 365,
    dayCost: 1.97,
    qtyCost: 36,
    expiryDate: purchaceSettings?.subscriptionExpiryYearly
      ? purchaceSettings?.subscriptionExpiryYearly
      : new Date(),
    expiryPlan: 'subscriptionExpiryYearly',
  },
];
