const fields = (t) => [
  {
    key: 'coldWater',
    type: 'number',
    label: t('real-estate-common:utilities.items.coldWater'),
    min: 0,
    max: 999999,
  },
  {
    key: 'hotWater',
    type: 'number',
    label: t('real-estate-common:utilities.items.hotWater'),
    min: 0,
    max: 999999,
  },
  {
    key: 'electricity',
    type: 'number',
    label: t('real-estate-common:utilities.items.electricity'),
    min: 0,
    max: 999999,
  },
  {
    key: 'garbage',
    type: 'number',
    label: t('real-estate-common:utilities.items.garbage'),
    min: 0,
    max: 999999,
  },
  {
    key: 'propertyManagement',
    type: 'number',
    label: t('real-estate-common:utilities.items.propertyManagement'),
    min: 0,
    max: 999999,
  },
  {
    key: 'heating',
    type: 'number',
    label: t('real-estate-common:utilities.items.heating'),
    min: 0,
    max: 999999,
  },
  {
    key: 'parking',
    type: 'number',
    label: t('real-estate-common:utilities.items.parking'),
    min: 0,
    max: 999999,
  },
  {
    key: 'others',
    type: 'number',
    label: t('real-estate-common:utilities.items.others'),
    min: 0,
    max: 999999,
  },
];

export default fields;
