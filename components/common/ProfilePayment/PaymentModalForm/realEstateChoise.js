import { PERIOD, QUANTITY, REAL_ESATE } from 'constants/purchasePrice';

export const realEstateChoise = (t, purchaceSettings) => [
  {
    key: 'standalone',
    label: t('payment:payment-modal.form.purchase-items.single'),
    quantity: QUANTITY.QTY_MONTHLY,
    price: REAL_ESATE.STANDALONE,
    dayCost: (REAL_ESATE.STANDALONE / PERIOD.MONTHLY).toFixed(2),
    qtyCost: REAL_ESATE.STANDALONE,
    expiryDate: new Date(),
  },
  {
    key: 'subscriptionQuarterly',
    label: t('payment:payment-modal.form.purchase-items.quarterly'),
    quantity: QUANTITY.QTY_QUARTERLY,
    price: REAL_ESATE.QUARTERLY,
    days: PERIOD.QUARTERLY_DAYS,
    dayCost: (REAL_ESATE.QUARTERLY / PERIOD.QUARTERLY_DAYS).toFixed(2),
    qtyCost: (REAL_ESATE.QUARTERLY / QUANTITY.QTY_QUARTERLY).toFixed(2),
    expiryDate: purchaceSettings?.subscriptionExpiryQuarterly
      ? purchaceSettings?.subscriptionExpiryQuarterly
      : new Date(),
    expiryPlan: 'subscriptionExpiryQuarterly',
  },
  {
    key: 'subscriptionYearly',
    label: t('payment:payment-modal.form.purchase-items.life'),
    quantity: QUANTITY.QTY_YEARLY,
    price: REAL_ESATE.YEARLY,
    days: PERIOD.YEARLY_DAYS,
    dayCost: (REAL_ESATE.YEARLY / PERIOD.YEARLY_DAYS).toFixed(2),
    qtyCost: (REAL_ESATE.YEARLY / QUANTITY.QTY_YEARLY).toFixed(2),
    expiryDate: purchaceSettings?.subscriptionExpiryYearly
      ? purchaceSettings?.subscriptionExpiryYearly
      : new Date(),
    expiryPlan: 'subscriptionExpiryYearly',
  },
];
