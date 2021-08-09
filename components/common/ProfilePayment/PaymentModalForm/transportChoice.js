import { PERIOD, QUANTITY, TRANSPORT } from 'constants/purchasePrice';

export const transportChoice = (t, purchaceSettings) => [
  {
    key: 'standalone',
    label: t('payment:payment-modal.form.purchase-items.single'),
    quantity: QUANTITY.QTY_MONTHLY,
    price: TRANSPORT.STANDALONE,
    dayCost: (TRANSPORT.STANDALONE / PERIOD.MONTHLY).toFixed(2),
    qtyCost: TRANSPORT.STANDALONE,
    expiryDate: new Date(),
  },
  {
    key: 'subscriptionQuarterly',
    label: t('payment:payment-modal.form.purchase-items.quarterly'),
    quantity: QUANTITY.QTY_QUARTERLY,
    price: TRANSPORT.QUARTERLY,
    days: PERIOD.QUARTERLY_DAYS,
    dayCost: (TRANSPORT.QUARTERLY / PERIOD.QUARTERLY_DAYS).toFixed(2),
    qtyCost: (TRANSPORT.QUARTERLY / QUANTITY.QTY_QUARTERLY).toFixed(2),
    expiryDate: purchaceSettings?.subscriptionExpiryQuarterly
      ? purchaceSettings?.subscriptionExpiryQuarterly
      : new Date(),
    expiryPlan: 'subscriptionExpiryQuarterly',
  },
  {
    key: 'subscriptionYearly',
    label: t('payment:payment-modal.form.purchase-items.life'),
    quantity: QUANTITY.QTY_YEARLY,
    price: TRANSPORT.YEARLY,
    days: PERIOD.YEARLY_DAYS,
    dayCost: (TRANSPORT.YEARLY / PERIOD.YEARLY_DAYS).toFixed(2),
    qtyCost: (TRANSPORT.YEARLY / QUANTITY.QTY_YEARLY).toFixed(2),
    expiryDate: purchaceSettings?.subscriptionExpiryYearly
      ? purchaceSettings?.subscriptionExpiryYearly
      : new Date(),
    expiryPlan: 'subscriptionExpiryYearly',
  },
];
