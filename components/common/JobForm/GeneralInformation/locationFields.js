const locationFields = (t) => [
  {
    key: 'jobCountry',
    type: 'autocomplete',
    label: (
      <>
        {t('common:location.country')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
    show: true,
    size: {
      xl: 4,
      lg: 4,
      md: 4,
      sm: 4,
    },
  },
  {
    key: 'jobState',
    type: 'autocomplete',
    label: <>{t('common:location.state')}</>,
    show: true,
    size: {
      xl: 4,
      lg: 4,
      md: 4,
      sm: 4,
    },
  },
  {
    key: 'jobCity',
    type: 'autocomplete',
    label: t('common:location.city'),
    show: true,
    size: {
      xl: 4,
      lg: 4,
      md: 4,
      sm: 4,
    },
  },
];

export default locationFields;
