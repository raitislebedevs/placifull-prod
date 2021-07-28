import { RiCalendar2Line } from 'react-icons/ri';

const fields = (t) => [
  {
    key: 'category',
    type: 'select',
    placeholder: t('real-estate-common:category.label'),
    options: [
      {
        value: '',
        label: t('real-estate-common:category.label'),
        id: 'category',
      },
      {
        value: 'houses',
        label: t('real-estate-common:category.options.houses'),
        id: 'category',
      },
      {
        value: 'apartments',
        label: t('real-estate-common:category.options.apartments'),
        id: 'category',
      },
      {
        value: 'farmhouse',
        label: t('real-estate-common:category.options.farmhouse'),
        id: 'category',
      },
      {
        value: 'land',
        label: t('real-estate-common:category.options.land'),
        id: 'category',
      },
      {
        value: 'commercial',
        label: t('real-estate-common:category.options.commercial'),
        id: 'category',
      },
      {
        value: 'offices',
        label: t('real-estate-common:category.options.offices'),
        id: 'category',
      },
      {
        value: 'exclusive',
        label: t('real-estate-common:category.options.exclusive'),
        id: 'category',
      },
      {
        value: 'agents',
        label: t('real-estate-common:category.options.agents'),
        id: 'category',
      },
    ],
  },
  {
    key: 'action',
    type: 'select',
    placeholder: t('real-estate-common:action.label'),
    category: [
      'exclusive',
      'houses',
      'apartments',
      'commercial',
      'offices',
      'farmhouse',
      'land',
    ],
    options: [
      {
        value: '',
        label: t('real-estate-common:action.label'),
        id: 'action',
      },
      {
        value: 'sell',
        label: t('real-estate-common:action.options.sell'),
        id: 'action',
      },
      {
        value: 'rent',
        label: t('real-estate-common:action.options.rent'),
        id: 'action',
      },
      {
        value: 'exchange',
        label: t('real-estate-common:action.options.exchange'),
        id: 'action',
      },
    ],
  },
  {
    key: 'condition',
    type: 'conditionalSelect',
    placeholder: t('real-estate-common:condition.label'),
    category: ['houses', 'apartments', 'commercial', 'offices', 'farmhouse'],

    options: [
      {
        value: '',
        label: t('real-estate-common:condition.label'),
        id: 'condition',
      },
      {
        value: 'brandNew',
        label: t('real-estate-common:condition.options.brandNew'),
        id: 'condition',
      },
      {
        value: 'goodCondition',
        label: t('real-estate-common:condition.options.goodCondition'),
        id: 'condition',
      },
      {
        value: 'medium',
        label: t('real-estate-common:condition.options.medium'),
        id: 'condition',
      },
      {
        value: 'requiresFixing',
        label: t('real-estate-common:condition.options.requiresFixing'),
        id: 'condition',
      },
      {
        value: 'requiresConstruction',
        label: t('real-estate-common:condition.options.requiresConstruction'),
        id: 'condition',
      },
    ],
  },

  {
    key: 'condition',
    type: 'conditionalSelect',
    placeholder: t('real-estate-common:condition.label-land'),

    category: ['land'],
    options: [
      {
        value: '',
        label: t('real-estate-common:condition.label-land'),
        id: 'condition',
      },
      {
        value: 'residential',
        label: t('real-estate-common:condition.options.residential'),
        id: 'condition',
      },
      {
        value: 'comercial',
        label: t('real-estate-common:condition.options.comercial'),
        id: 'condition',
      },
      {
        value: 'industrial',
        label: t('real-estate-common:condition.options.industrial'),
        id: 'condition',
      },
      {
        value: 'agricultural',
        label: t('real-estate-common:condition.options.agricultural'),
        id: 'condition',
      },
    ],
  },

  {
    key: 'worldLocation',
    type: 'autocomplete',
    options: [],
  },
  {
    key: 'minPrice',
    type: 'number',
    prefix: 'currency',
    placeholder: t('real-estate:hero.form.search-fields.min-price'),
    min: 0,
    max: 999999999,
    category: [
      'exclusive',
      'houses',
      'apartments',
      'commercial',
      'offices',
      'farmhouse',
      'land',
    ],
  },
  {
    key: 'maxPrice',
    type: 'number',
    prefix: 'currency',
    placeholder: t('real-estate:hero.form.search-fields.max-price'),
    min: 0,
    max: 999999999,
    category: [
      'exclusive',
      'houses',
      'apartments',
      'commercial',
      'offices',
      'farmhouse',
      'land',
    ],
  },
  {
    key: 'minRoom',
    type: 'number',
    placeholder: t('real-estate:hero.form.search-fields.min-rooms'),
    min: 0,
    max: 999,
    category: [
      'exclusive',
      'houses',
      'apartments',
      'commercial',
      'offices',
      'farmhouse',
    ],
  },
  {
    key: 'maxRoom',
    type: 'number',
    placeholder: t('real-estate:hero.form.search-fields.max-rooms'),
    min: 0,
    max: 999,
    category: [
      'exclusive',
      'houses',
      'apartments',
      'commercial',
      'offices',
      'farmhouse',
    ],
  },
  {
    key: 'minArea',
    type: 'numberArea',
    placeholder: t('real-estate:hero.form.search-fields.min-area'),
    min: 0,
    max: 999999999,
    category: [
      'exclusive',
      'houses',
      'apartments',
      'commercial',
      'offices',
      'farmhouse',
      'land',
    ],
  },
  {
    key: 'maxArea',
    type: 'numberArea',
    placeholder: t('real-estate:hero.form.search-fields.max-area'),
    min: 0,
    max: 999999999,
    category: [
      'exclusive',
      'houses',
      'apartments',
      'commercial',
      'offices',
      'farmhouse',
      'land',
    ],
  },
  {
    key: 'moveInDate',
    type: 'date',
    decorator: <RiCalendar2Line />,
    placeholder: t('real-estate:hero.form.search-fields.move-in-date'),
    action: ['rent'],
    category: [
      'exclusive',
      'houses',
      'apartments',
      'commercial',
      'offices',
      'farmhouse',
      'land',
    ],
  },
  {
    key: 'moveOutDate',
    type: 'date',
    decorator: <RiCalendar2Line />,
    placeholder: t('real-estate:hero.form.search-fields.move-out-date'),
    action: ['rent'],
    category: [
      'exclusive',
      'houses',
      'apartments',
      'commercial',
      'offices',
      'farmhouse',
      'land',
    ],
  },
];

export default fields;
