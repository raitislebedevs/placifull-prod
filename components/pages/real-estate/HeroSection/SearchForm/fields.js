import { RiCalendar2Line } from 'react-icons/ri';

const fields = (t) => ({
  accordionRight: [
    {
      label: t('real-estate:hero.form.accordion-right.utility-label'),
      key: 'utilityBills',
      type: 'bills',
      category: [
        'exclusive',
        'houses',
        'apartments',
        'commercial',
        'offices',
        'farmhouse',
      ],
      items: [
        {
          key: 'minBill',
          thousand: true,
          type: 'number',
          prefix: 'currency',
          placeholder: t(
            'real-estate:hero.form.accordion-right.utility.from-price'
          ),
          min: 0,
          max: 999999999,
        },
        {
          key: 'maxBill',
          thousand: true,
          type: 'number',
          prefix: 'currency',
          placeholder: t(
            'real-estate:hero.form.accordion-right.utility.to-price'
          ),
          min: 0,
          max: 9999999999,
        },
      ],
    },
    {
      label: t('real-estate:hero.form.accordion-right.year-label'),
      key: 'yearBuilt',
      category: [
        'exclusive',
        'houses',
        'apartments',
        'commercial',
        'offices',
        'farmhouse',
      ],
      type: 'years',
      items: [
        {
          key: 'minYear',
          decorator: <RiCalendar2Line />,
          thousand: false,
          type: 'number',
          placeholder: t(
            'real-estate:hero.form.accordion-right.built.from-year'
          ),
          min: 0,
          max: 9999,
        },
        {
          key: 'maxYear',
          decorator: <RiCalendar2Line />,
          thousand: false,
          type: 'number',
          placeholder: t('real-estate:hero.form.accordion-right.built.to-year'),
          min: 0,
          max: 9999,
        },
      ],
    },
    {
      label: t('real-estate:hero.form.accordion-right.measurement-label'),
      key: 'areaMeasurement',
      type: 'select',
      tick: true,
      options: [
        {
          value: '',
          label: t('real-estate:hero.form.accordion-right.system.none'),
          id: 'areaMeasurement',
        },
        {
          value: 'metter',
          label: (
            <>
              {t('real-estate:hero.form.accordion-right.system.metric')}
              <sup>2</sup>
            </>
          ),
          id: 'areaMeasurement',
        },
        {
          value: 'feet',
          label: (
            <>
              {t('real-estate:hero.form.accordion-right.system.imperial')}
              <sup>2</sup>
            </>
          ),
          id: 'areaMeasurement',
        },
      ],
    },
  ],
});

export default fields;
