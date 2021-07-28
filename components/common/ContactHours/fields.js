const fields = (t) => [
  {
    key: 'monday',
    label: t('common:week-days.monday'),
    options: [
      {
        key: 'monday_open',
        type: 'time',
      },
      {
        key: 'monday_close',
        type: 'time',
      },
    ],
  },
  {
    key: 'tuesday',
    label: t('common:week-days.tuesday'),
    options: [
      {
        key: 'tuesday_open',
        type: 'time',
      },
      {
        key: 'tuesday_close',
        type: 'time',
      },
    ],
  },
  {
    key: 'wednesday',
    label: t('common:week-days.wednesday'),
    options: [
      {
        key: 'wednesday_open',
        type: 'time',
      },
      {
        key: 'wednesday_close',
        type: 'time',
      },
    ],
  },
  {
    key: 'thursday',
    label: t('common:week-days.thursday'),
    options: [
      {
        key: 'thursday_open',
        type: 'time',
      },
      {
        key: 'thursday_close',
        type: 'time',
      },
    ],
  },
  {
    key: 'friday',
    label: t('common:week-days.friday'),
    options: [
      {
        key: 'friday_open',
        type: 'time',
      },
      {
        key: 'friday_close',
        type: 'time',
      },
    ],
  },
  {
    key: 'saturday',
    label: t('common:week-days.saturday'),
    options: [
      {
        key: 'saturday_open',
        type: 'time',
      },
      {
        key: 'saturday_close',
        type: 'time',
      },
    ],
  },
  {
    key: 'sunday',
    label: t('common:week-days.sunday'),
    options: [
      {
        key: 'sunday_open',
        type: 'time',
      },
      {
        key: 'sunday_close',
        type: 'time',
      },
    ],
  },
];

export default fields;
