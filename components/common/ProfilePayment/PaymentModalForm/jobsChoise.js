import { JOBS, PERIOD, QUANTITY } from 'constants/purchasePrice';

export const jobsChoise = (t, purchaceSettings) => [
  {
    key: 'standalone',
    label: t('payment:payment-modal.form.purchase-items.single'),
    quantity: QUANTITY.QTY_MONTHLY,
    price: JOBS.STANDALONE,
    dayCost: (JOBS.STANDALONE / PERIOD.MONTHLY).toFixed(2),
    qtyCost: JOBS.STANDALONE,
    expiryDate: new Date(),
  },
  {
    key: 'subscriptionQuarterly',
    label: t('payment:payment-modal.form.purchase-items.quarterly'),
    quantity: QUANTITY.QTY_QUARTERLY,
    price: JOBS.QUARTERLY,
    days: PERIOD.QUARTERLY_DAYS,
    dayCost: (JOBS.QUARTERLY / PERIOD.QUARTERLY_DAYS).toFixed(2),
    qtyCost: (JOBS.QUARTERLY / QUANTITY.QTY_QUARTERLY).toFixed(2),
    expiryDate: purchaceSettings?.subscriptionExpiryQuarterly
      ? purchaceSettings?.subscriptionExpiryQuarterly
      : new Date(),
    expiryPlan: 'subscriptionExpiryQuarterly',
  },
  {
    key: 'subscriptionYearly',
    label: t('payment:payment-modal.form.purchase-items.life'),
    quantity: QUANTITY.QTY_YEARLY,
    price: JOBS.YEARLY,
    days: PERIOD.YEARLY_DAYS,
    dayCost: (JOBS.YEARLY / PERIOD.YEARLY_DAYS).toFixed(2),
    qtyCost: (JOBS.YEARLY / QUANTITY.QTY_YEARLY).toFixed(2),
    expiryDate: purchaceSettings?.subscriptionExpiryYearly
      ? purchaceSettings?.subscriptionExpiryYearly
      : new Date(),
    expiryPlan: 'subscriptionExpiryYearly',
  },
];
