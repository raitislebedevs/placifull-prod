import { GiCarSeat, GiCarDoor } from 'react-icons/gi';
import { AiOutlineFieldTime } from 'react-icons/ai';

const fields = (t) => [
  {
    key: 'transportType',
    type: 'select',
    label: (
      <>
        {t('transport-common:transport-type.label')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
    options: [
      {
        value: 'car',
        label: t('transport-common:transport-type.options.car'),
        id: 'transportType',
      },
      {
        value: 'truck',
        label: t('transport-common:transport-type.options.truck'),
        id: 'transportType',
      },
      {
        value: 'motorcycle',
        label: t('transport-common:transport-type.options.motorcycle'),
        id: 'transportType',
      },
      {
        value: 'boat',
        label: t('transport-common:transport-type.options.boat'),
        id: 'transportType',
      },
      {
        value: 'airTransport',
        label: t('transport-common:transport-type.options.airTransport'),
        id: 'transportType',
      },
      {
        value: 'others',
        label: t('transport-common:transport-type.options.others'),
        id: 'transportType',
      },
    ],
  },
  {
    key: 'vehicleAction',
    type: 'select',
    label: (
      <>
        {t('transport-common:action.label')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
    options: [
      {
        value: 'sell',
        label: t('transport-common:action.options.sell'),
        id: 'vehicleAction',
      },
      {
        value: 'rent',
        label: t('transport-common:action.options.rent'),
        id: 'vehicleAction',
      },
      {
        value: 'exchange',
        label: t('transport-common:action.options.exchange'),
        id: 'vehicleAction',
      },
      {
        value: 'forParts',
        label: t('transport-common:action.options.forParts'),
        id: 'vehicleAction',
      },
    ],
  },
  {
    key: 'vehicleCondition',
    type: 'select',
    label: (
      <>
        {t('transport-common:condition.label')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
    options: [
      {
        value: 'brandNew',
        label: t('transport-common:condition.options.brandNew'),
        id: 'vehicleCondition',
      },
      {
        value: 'likeNew',
        label: t('transport-common:condition.options.likeNew'),
        id: 'vehicleCondition',
      },
      {
        value: 'used',
        label: t('transport-common:condition.options.used'),
        id: 'vehicleCondition',
      },
      {
        value: 'requiresFixing',
        label: t('transport-common:condition.options.requiresFixing'),
        id: 'vehicleCondition',
      },
      {
        value: 'afterCrash',
        label: t('transport-common:condition.options.afterCrash'),
        id: 'vehicleCondition',
      },
    ],
  },
  {
    type: 'autocomplete',
    key: 'renderedTransportCountryStateCityElement',
  },
  {
    key: 'transportDescription',
    type: 'textarea',
    label: (
      <>
        {t(
          'transport-submit:form.general-information.input-fields.description'
        )}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
  },
  {
    key: 'transportBrand',
    type: 'text',
    label: (
      <>
        {t('transport-submit:form.general-information.input-fields.brand')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
  },
  {
    key: 'transportModel',
    type: 'text',
    label: (
      <>
        {t('transport-submit:form.general-information.input-fields.model')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
  },
  {
    key: 'productionYear',
    type: 'productionYear',
    decorator: <AiOutlineFieldTime />,
    decimalpoints: 0,
    thousandSeparator: false,
    label: t(
      'transport-submit:form.general-information.input-fields.production-year'
    ),
    min: 0,
    max: 9999,
  },
  {
    key: 'transportPrice',
    type: 'currency',
    decimalpoints: 2,
    label: (
      <>
        {t('transport-submit:form.general-information.input-fields.price')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
    min: 0,
    max: 99999999999,
  },
  {
    key: 'millage',
    type: 'number',
    thousandSeparator: true,
    decimalpoints: 0,
    label: t('transport-submit:form.general-information.input-fields.millage'),
    min: 0,
    max: 9999999,
    append: {
      values: [
        {
          value: 'kilometer',
          label: 'km',
        },
        {
          value: 'mile',
          label: 'mi',
        },
      ],
      id: 'millageMesurment',
    },
  },
  {
    key: 'maxSpeed',
    type: 'number',
    thousandSeparator: true,
    decimalpoints: 0,
    label: t('transport-submit:form.general-information.input-fields.speed'),
    min: 0,
    max: 99999,

    append: {
      values: [
        {
          value: 'kilometerPerHour',
          label: 'km/h',
        },
        {
          value: 'milePerHour',
          label: 'mi/h',
        },
      ],
      id: 'speedMesurment',
    },
  },
  {
    key: 'fuelEconomy',
    type: 'number',
    decimalpoints: 2,
    label: t(
      'transport-submit:form.general-information.input-fields.fueal-economy'
    ),
    min: 0,
    max: 999,
    append: {
      values: [
        {
          value: 'litrePerKilometer',
          label: 'l/100[km]',
        },
        {
          value: 'galonPerMile',
          label: 'gal/100[mi]',
        },
      ],
      id: 'fuelEconomyMesurment',
    },
  },
  {
    key: 'numberOfSeats',
    type: 'number',
    decorator: <GiCarSeat />,
    decimalpoints: 0,
    label: t('transport-submit:form.general-information.input-fields.seats'),
    min: 0,
    max: 999,
  },
  {
    key: 'numberOfDoors',
    type: 'number',
    decorator: <GiCarDoor />,
    decimalpoints: 0,
    label: t('transport-submit:form.general-information.input-fields.doors'),
    min: 0,
    max: 999,
  },
  {
    key: 'engineType',
    type: 'select',
    label: (
      <>
        {t('transport-common:engine.label')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
    options: [
      {
        value: 'diesel',
        label: t('transport-common:engine.options.diesel'),
        id: 'engineType',
      },
      {
        value: 'benzine',
        label: t('transport-common:engine.options.benzine'),
        id: 'engineType',
      },
      {
        value: 'gas',
        label: t('transport-common:engine.options.gas'),
        id: 'engineType',
      },
      {
        value: 'electric',
        label: t('transport-common:engine.options.electric'),
        id: 'engineType',
      },
      {
        value: 'other',
        label: t('transport-common:engine.options.other'),
        id: 'engineType',
      },
    ],
  },
  {
    key: 'gearBox',
    type: 'select',
    label: (
      <>
        {t('transport-common:gear-box.label')}
        <sup className={'mandatory__field'}>*</sup>
      </>
    ),
    options: [
      {
        value: 'manual',
        label: t('transport-common:gear-box.options.manual'),
        id: 'gearBox',
      },
      {
        value: 'automatic',
        label: t('transport-common:gear-box.options.automatic'),
        id: 'gearBox',
      },
      {
        value: 'other',
        label: t('transport-common:gear-box.options.other'),
        id: 'gearBox',
      },
    ],
  },
  {
    key: 'color',
    type: 'select',
    label: t('transport-common:color.label'),
    options: [
      {
        value: 'red',
        label: t('transport-common:color.options.red'),
        id: 'color',
      },
      {
        value: 'orange',
        label: t('transport-common:color.options.orange'),
        id: 'color',
      },
      {
        value: 'yellow',
        label: t('transport-common:color.options.yellow'),
        id: 'color',
      },
      {
        value: 'green',
        label: t('transport-common:color.options.green'),
        id: 'color',
      },

      {
        value: 'blue',
        label: t('transport-common:color.options.blue'),
        id: 'color',
      },

      {
        value: 'violent',
        label: t('transport-common:color.options.violent'),
        id: 'color',
      },

      {
        value: 'pink',
        label: t('transport-common:color.options.pink'),
        id: 'color',
      },

      {
        value: 'tan',
        label: t('transport-common:color.options.tan'),
        id: 'color',
      },

      {
        value: 'beige',
        label: t('transport-common:color.options.beige'),
        id: 'color',
      },

      {
        value: 'white',
        label: t('transport-common:color.options.white'),
        id: 'color',
      },

      {
        value: 'silver',
        label: t('transport-common:color.options.silver'),
        id: 'color',
      },

      {
        value: 'gray',
        label: t('transport-common:color.options.gray'),
        id: 'color',
      },

      {
        value: 'black',
        label: t('transport-common:color.options.black'),
        id: 'color',
      },

      {
        value: 'brown',
        label: t('transport-common:color.options.brown'),
        id: 'color',
      },

      {
        value: 'gold',
        label: t('transport-common:color.options.gold'),
        id: 'color',
      },

      {
        value: 'indigo',
        label: t('transport-common:color.options.indigo'),
        id: 'color',
      },

      {
        value: 'purple',
        label: t('transport-common:color.options.purple'),
        id: 'color',
      },

      {
        value: 'lime',
        label: t('transport-common:color.options.lime'),
        id: 'color',
      },

      {
        value: 'azure',
        label: t('transport-common:color.options.azure'),
        id: 'color',
      },

      {
        value: 'other',
        label: t('transport-common:color.options.other'),
        id: 'color',
      },
    ],
  },
];

export default fields;
