import { JOBS, OTHERS, REAL_ESATE, TRANSPORT } from 'constants/purchasePrice';

const priceOptions = (t) => [
  {
    key: 0,
    content: [
      {
        name: t('price-section.prices.price-1.tiers.tier-2.name'),
        cost: {
          price: REAL_ESATE.STANDALONE,
        },
        services: [
          t('price-section.prices.price-1.tiers.tier-2.offer-1'),
          t('price-section.prices.price-1.tiers.tier-2.offer-2'),
          t('price-section.prices.price-1.tiers.tier-2.offer-3'),
          t('price-section.prices.price-1.tiers.tier-2.offer-4'),
        ],
        text: t('price-section.prices.price-1.tiers.tier-2.button'),
      },
      {
        name: t('price-section.prices.price-1.tiers.tier-3.name'),
        cost: {
          price: REAL_ESATE.QUARTERLY,
        },
        services: [
          t('price-section.prices.price-1.tiers.tier-3.offer-1'),
          t('price-section.prices.price-1.tiers.tier-3.offer-2'),
          t('price-section.prices.price-1.tiers.tier-3.offer-3'),
          t('price-section.prices.price-1.tiers.tier-3.offer-4'),
        ],
        text: t('price-section.prices.price-1.tiers.tier-3.button'),
      },
      {
        name: t('price-section.prices.price-1.tiers.tier-4.name'),
        cost: {
          price: REAL_ESATE.YEARLY,
        },
        services: [
          t('price-section.prices.price-1.tiers.tier-4.offer-1'),
          t('price-section.prices.price-1.tiers.tier-4.offer-2'),
          t('price-section.prices.price-1.tiers.tier-4.offer-3'),
          t('price-section.prices.price-1.tiers.tier-4.offer-4'),
        ],
        text: t('price-section.prices.price-1.tiers.tier-4.button'),
      },
    ],
  },
  {
    key: 1,
    content: [
      {
        name: t('price-section.prices.price-2.tiers.tier-2.name'),
        cost: {
          price: TRANSPORT.STANDALONE,
        },
        services: [
          t('price-section.prices.price-2.tiers.tier-2.offer-1'),
          t('price-section.prices.price-2.tiers.tier-2.offer-2'),
          t('price-section.prices.price-2.tiers.tier-2.offer-3'),
          t('price-section.prices.price-2.tiers.tier-2.offer-4'),
        ],
        text: t('price-section.prices.price-2.tiers.tier-2.button'),
      },
      {
        name: t('price-section.prices.price-2.tiers.tier-3.name'),
        cost: {
          price: TRANSPORT.QUARTERLY,
        },
        services: [
          t('price-section.prices.price-2.tiers.tier-3.offer-1'),
          t('price-section.prices.price-2.tiers.tier-3.offer-2'),
          t('price-section.prices.price-2.tiers.tier-3.offer-3'),
          t('price-section.prices.price-2.tiers.tier-3.offer-4'),
        ],
        text: t('price-section.prices.price-2.tiers.tier-3.button'),
      },
      {
        name: t('price-section.prices.price-2.tiers.tier-4.name'),
        cost: {
          price: TRANSPORT.YEARLY,
        },
        services: [
          t('price-section.prices.price-2.tiers.tier-4.offer-1'),
          t('price-section.prices.price-2.tiers.tier-4.offer-2'),
          t('price-section.prices.price-2.tiers.tier-4.offer-3'),
          t('price-section.prices.price-2.tiers.tier-4.offer-4'),
        ],
        text: t('price-section.prices.price-2.tiers.tier-4.button'),
      },
    ],
  },
  {
    key: 2,
    content: [
      {
        name: t('price-section.prices.price-3.tiers.tier-2.name'),
        cost: {
          price: JOBS.STANDALONE,
        },
        services: [
          t('price-section.prices.price-3.tiers.tier-2.offer-1'),
          t('price-section.prices.price-3.tiers.tier-2.offer-2'),
          t('price-section.prices.price-3.tiers.tier-2.offer-3'),
          t('price-section.prices.price-3.tiers.tier-2.offer-4'),
        ],
        text: t('price-section.prices.price-3.tiers.tier-2.button'),
      },
      {
        name: t('price-section.prices.price-3.tiers.tier-2.name'),
        cost: {
          price: JOBS.QUARTERLY,
        },
        services: [
          t('price-section.prices.price-3.tiers.tier-3.offer-1'),
          t('price-section.prices.price-3.tiers.tier-3.offer-2'),
          t('price-section.prices.price-3.tiers.tier-3.offer-3'),
          t('price-section.prices.price-3.tiers.tier-3.offer-4'),
        ],
        text: t('price-section.prices.price-3.tiers.tier-2.button'),
      },
      {
        name: t('price-section.prices.price-3.tiers.tier-3.name'),
        cost: {
          price: JOBS.YEARLY,
        },
        services: [
          t('price-section.prices.price-3.tiers.tier-4.offer-1'),
          t('price-section.prices.price-3.tiers.tier-4.offer-2'),
          t('price-section.prices.price-3.tiers.tier-4.offer-3'),
          t('price-section.prices.price-3.tiers.tier-4.offer-4'),
        ],
        text: t('price-section.prices.price-3.tiers.tier-3.button'),
      },
    ],
  },
  {
    key: 3,
    content: [
      {
        name: t('price-section.prices.price-4.tiers.tier-2.name'),
        cost: {
          price: OTHERS.PROMOTED,
        },
        services: [
          t('price-section.prices.price-4.tiers.tier-2.offer-1'),
          t('price-section.prices.price-4.tiers.tier-2.offer-2'),
          t('price-section.prices.price-4.tiers.tier-2.offer-3'),
        ],
        text: t('price-section.prices.price-4.tiers.tier-2.button'),
      },
      {
        name: t('price-section.prices.price-4.tiers.tier-4.name'),
        cost: {
          price: OTHERS.DAYLY,
        },
        services: [
          t('price-section.prices.price-4.tiers.tier-4.offer-1'),
          t('price-section.prices.price-4.tiers.tier-4.offer-2'),
          t('price-section.prices.price-4.tiers.tier-4.offer-3'),
          t('price-section.prices.price-4.tiers.tier-4.offer-4'),
        ],
        text: t('price-section.prices.price-4.tiers.tier-4.button'),
      },
      {
        name: t('price-section.prices.price-4.tiers.tier-3.name'),
        cost: {
          price: OTHERS.BROWSERCV,
        },
        services: [
          t('price-section.prices.price-4.tiers.tier-3.offer-1'),
          t('price-section.prices.price-4.tiers.tier-3.offer-3'),
        ],
        text: t('price-section.prices.price-4.tiers.tier-3.button'),
      },
    ],
  },
];

export default priceOptions;
