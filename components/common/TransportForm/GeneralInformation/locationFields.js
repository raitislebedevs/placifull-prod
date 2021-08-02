const locationFields = (t) => [
  {
    key: 'transportCountry',
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
      sm: 6,
    },
  },
  {
    key: 'transportState',
    type: 'autocomplete',
    label: <>{t('common:location.state')}</>,
    show: true,
    size: {
      xl: 4,
      lg: 4,
      md: 4,
      sm: 6,
    },
  },
  {
    key: 'transportCity',
    type: 'autocomplete',
    label: t('common:location.city'),
    show: true,
    size: {
      xl: 4,
      lg: 4,
      md: 4,
      sm: 6,
    },
  },
];

export default locationFields;
