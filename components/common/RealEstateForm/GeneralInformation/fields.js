import { BiBath } from 'react-icons/bi';
import { RiCalendar2Line } from 'react-icons/ri';
import { BsHouse } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { Gi3DStairs } from 'react-icons/gi';
import { FaBuilding } from 'react-icons/fa';

const fields = (t) => [
  {
    key: 'category',
    type: 'select',
    label: (
      <>
        {t('real-estate-common:category.label')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
    options: [
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
    type: 'conditionalSelect',
    label: (
      <>
        {t('real-estate-common:action.label')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
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
    label: (
      <>
        {t('real-estate-common:condition.label')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),

    category: ['houses', 'apartments', 'commercial', 'offices', 'farmhouse'],
    options: [
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
    label: (
      <>
        {t('real-estate-common:condition.label-land')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),

    category: ['land'],
    options: [
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
    type: 'autocomplete',
    key: 'renderedRealEstateCountryStateCityElement',
  },
  {
    key: 'description',
    type: 'textarea',
    label: (
      <>
        {t(
          'real-estate-submit:form.general-information.input-fields.description'
        )}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
  },
  {
    key: 'price',
    type: 'currency',
    decimalpoints: 2,
    label: (
      <>
        {t('real-estate-submit:form.general-information.input-fields.price')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
    thousandSeparator: true,
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
    key: 'rooms',
    type: 'rooms',
    decorator: <BsHouse />,
    decimalpoints: 0,
    label: (
      <>
        {t(
          'real-estate-submit:form.general-information.input-fields.bed-rooms'
        )}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
    min: 0,
    max: 99,
    category: ['exclusive', 'houses', 'apartments', 'farmhouse'],
  },
  {
    key: 'baths',
    type: 'baths',
    decorator: <BiBath />,
    decimalpoints: 0,
    thousandSeparator: false,
    label: (
      <>
        {t(
          'real-estate-submit:form.general-information.input-fields.bath-rooms'
        )}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
    min: 0,
    max: 99,
    category: ['exclusive', 'houses', 'apartments', 'farmhouse'],
  },
  {
    key: 'area',
    type: 'area',
    decimalpoints: 2,
    label: (
      <>
        {t('real-estate-submit:form.general-information.input-fields.area')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),

    min: 0,
    max: 99999,
    append: {
      values: [
        {
          value: 'metter',
          label: 'm',
          className: 'sup-square',
        },
        {
          value: 'feet',
          label: 'ft',
          className: 'sup-square',
        },
      ],
      id: 'areaMeasurement',
    },
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
    key: 'apartmentInFloor',
    type: 'apartmentInFloor',
    decorator: <Gi3DStairs />,
    min: -8,
    max: 999,
    className: 'firstInput',
    category: ['apartments', 'commercial', 'offices'],
  },
  {
    key: 'floorCount',
    type: 'floorCount',
    className: 'secondInput',
    decorator: <FaBuilding />,
    min: -8,
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
    key: 'yearBuilt',
    type: 'yearBuilt',
    decorator: <AiOutlineFieldTime />,
    decimalpoints: 0,
    thousandSeparator: false,
    min: 0,
    max: 9999,
    label: t(
      'real-estate-submit:form.general-information.input-fields.year-built'
    ),
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
    key: 'moveInDate',
    type: 'dateTime',
    decorator: <RiCalendar2Line />,
    label: t(
      'real-estate-submit:form.general-information.input-fields.start-renting'
    ),
    action: ['rent'],
  },
  {
    key: 'moveOutDate',
    type: 'dateTime',
    decorator: <RiCalendar2Line />,
    label: t(
      'real-estate-submit:form.general-information.input-fields.end-renting'
    ),
    action: ['rent'],
  },
];

export default fields;
