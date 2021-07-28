const locationFields = (t) => [
  {
    key: 'country',
    type: 'autocomplete',
    label: t('common:location.country'),
    show: true,
    size: {
      xl: 3,
      lg: 2,
      md: 4,
      sm: 6,
    },
  },
  {
    key: 'state',
    type: 'autocomplete',
    label: t('common:location.state'),
    show: true,
    size: {
      xl: 3,
      lg: 2,
      md: 4,
      sm: 6,
    },
  },
  {
    key: 'city',
    type: 'autocomplete',
    label: t('common:location.city'),
    show: true,
    size: {
      xl: 3,
      lg: 2,
      md: 4,
      sm: 6,
    },
  },
];

export default locationFields;
