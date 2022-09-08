export const blogFilters = (t) => [
  {
    key: 4,
    title: t('blog:search.all'),
    filter: '',
  },
  {
    key: 0,
    title: t('blog:search.real-estate'),
    filter: 'realEstate',
  },
  {
    key: 1,
    title: t('blog:search.transport'),
    filter: 'transport',
  },
  {
    key: 2,
    title: t('blog:search.job'),
    filter: 'job',
  },
  {
    key: 3,
    title: t('blog:search.other'),
    filter: 'other',
  },
];
