import { RiCalendar2Line } from 'react-icons/ri';

const fields = (t, submitCurrency) => ({
  searchForm: [
    {
      key: 'transportType',
      type: 'select',
      placeholder: t('transport-common:transport-type.label'),
      options: [
        {
          value: '',
          label: t('transport-common:transport-type.label'),
          id: 'transportType',
        },
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
      key: 'action',
      type: 'select',
      placeholder: t('transport-common:action.label'),
      options: [
        {
          value: '',
          label: t('transport-common:action.label'),
          id: 'action',
        },
        {
          value: 'sell',
          label: t('transport-common:action.options.sell'),
          id: 'action',
        },
        {
          value: 'rent',
          label: t('transport-common:action.options.rent'),
          id: 'action',
        },
        {
          value: 'exchange',
          label: t('transport-common:action.options.exchange'),
          id: 'action',
        },
        {
          value: 'forParts',
          label: t('transport-common:action.options.forParts'),
          id: 'action',
        },
      ],
    },
    {
      key: 'condition',
      type: 'select',
      placeholder: t('transport-common:condition.label'),
      options: [
        {
          value: '',
          label: t('transport-common:condition.label'),
          id: 'condition',
        },
        {
          value: 'brandNew',
          label: t('transport-common:condition.options.brandNew'),
          id: 'condition',
        },
        {
          value: 'likeNew',
          label: t('transport-common:condition.options.likeNew'),
          id: 'condition',
        },
        {
          value: 'used',
          label: t('transport-common:condition.options.used'),
          id: 'condition',
        },
        {
          value: 'requiresFixing',
          label: t('transport-common:condition.options.requiresFixing'),
          id: 'condition',
        },
        {
          value: 'afterCrash',
          label: t('transport-common:condition.options.afterCrash'),
          id: 'condition',
        },
      ],
    },
    {
      key: 'worldLocation',
      //type: 'select',
      type: 'autocomplete',
      placeholder: t('transport:hero.form.input-4.label'),
      options: [],
    },

    {
      key: 'minPrice',
      type: 'number',
      prefix: submitCurrency
        ? submitCurrency + ' '
        : t('transport:hero.form.no-currency') + ' ',
      placeholder: t('transport:hero.form.min-price'),
      min: 0,
      max: 9999999,
    },
    {
      key: 'maxPrice',
      type: 'number',
      prefix: submitCurrency
        ? submitCurrency + ' '
        : t('transport:hero.form.no-currency') + ' ',
      placeholder: t('transport:hero.form.max-price'),
      min: 0,
      max: 9999999,
    },
    {
      key: 'transportBrand',
      type: 'text',
      placeholder: t('transport:hero.form.transport-brand'),
    },
    {
      key: 'transportModel',
      type: 'text',
      placeholder: t('transport:hero.form.transport-model'),
    },
    {
      key: 'minAge',
      type: 'date',
      decorator: <RiCalendar2Line />,
      placeholder: t('transport:hero.form.min-age'),
    },
    {
      key: 'maxAge',
      type: 'date',
      decorator: <RiCalendar2Line />,
      placeholder: t('transport:hero.form.max-age'),
    },
  ],
  lastRow: [
    {
      key: 'engineType',
      placeholder: t('transport-common:engine.label'),
      options: [
        {
          value: '',
          label: t('transport-common:engine.label'),
          id: 'engineType',
        },
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
      placeholder: t('transport-common:gear-box.label'),
      options: [
        {
          value: '',
          label: t('transport-common:gear-box.label'),
          id: 'gearBox',
        },
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
      placeholder: t('transport-common:color.label'),
      options: [
        {
          value: '',
          label: t('transport-common:color.label'),
          id: 'color',
        },
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
  ],
  accordionRight: [
    {
      label: t('transport:hero.form.accordion-right.economy.label'),
      key: 'usageSearch',
      type: 'economy',
      items: [
        {
          key: 'minUsage',
          sufix: ' l',
          placeholder: t(
            'transport:hero.form.accordion-right.economy.items.from'
          ),
          min: 0,
          max: 999,
          append: {
            values: [
              {
                value: '',
                label: '100/[]',
              },
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
          key: 'maxUsage',
          sufix: ' l',
          placeholder: t(
            'transport:hero.form.accordion-right.economy.items.to'
          ),
          min: 0,
          max: 999,
          append: {
            values: [
              {
                value: '',
                label: '100/[]',
              },
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
      ],
    },
    {
      label: t('transport:hero.form.accordion-right.speed.label'),
      key: 'speedSearch',
      type: 'speed',
      items: [
        {
          key: 'minSpeed',
          sufix: ' km/h',
          placeholder: t(
            'transport:hero.form.accordion-right.speed.items.from'
          ),
          min: 0,
          max: 999,
          append: {
            values: [
              {
                value: '',
                label: 'Units/h',
              },
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
          key: 'maxSpeed',
          sufix: ' km/h',
          placeholder: t('transport:hero.form.accordion-right.speed.items.to'),
          min: 0,
          max: 999,
          append: {
            values: [
              {
                value: '',
                label: 'Units/h',
              },
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
      ],
    },
    {
      label: t('transport:hero.form.accordion-right.millage.label'),
      key: 'millageSearch',
      type: 'distance',
      items: [
        {
          key: 'minMillage',
          sufix: ' km',
          placeholder: t(
            'transport:hero.form.accordion-right.millage.items.from'
          ),
          min: 0,
          max: 9999999,
          append: {
            values: [
              {
                value: '',
                label: 'units',
              },
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
          key: 'maxMillage',
          sufix: ' km',
          placeholder: t(
            'transport:hero.form.accordion-right.millage.items.to'
          ),
          min: 0,
          max: 9999999,
          append: {
            values: [
              {
                value: '',
                label: 'units',
              },
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
      ],
    },
    {
      label: t('common:measurement.label'),
      key: 'areaMeasurement',
      type: 'select',
      options: [
        {
          value: '',
          label: t('common:measurement.system.none'),
          id: 'areaMeasurement',
        },
        {
          value: 'metter',
          label: <>{t('common:measurement.system.metric')}</>,
          id: 'areaMeasurement',
        },
        {
          value: 'feet',
          label: <>{t('common:measurement.system.imperial')}</>,
          id: 'areaMeasurement',
        },
      ],
    },
  ],
});

export default fields;
