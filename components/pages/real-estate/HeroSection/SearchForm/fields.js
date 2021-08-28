import { RiCalendar2Line, RiFilterOffFill } from 'react-icons/ri';
import { Gi3DStairs } from 'react-icons/gi';
import { FaBuilding, FaBullseye } from 'react-icons/fa';

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
      convert: <FaBullseye />,
      noConvert: <RiFilterOffFill />,
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
  accordionBottom: [
    {
      key: 'minFloor',
      thousand: true,
      allowNegative: true,
      decorator: <Gi3DStairs />,
      type: 'number',
      prefix: 'currency',
      placeholder: t(
        'real-estate:hero.form.accordion-right.utility.from-price'
      ),
      min: -9,
      max: 250,
    },
    {
      key: 'maxFloor',
      thousand: true,
      allowNegative: true,
      decorator: <Gi3DStairs />,
      type: 'number',
      prefix: 'currency',
      placeholder: t('real-estate:hero.form.accordion-right.utility.to-price'),
      min: -9,
      max: 250,
    },

    {
      key: 'minFloors',
      thousand: true,
      allowNegative: false,
      decorator: <FaBuilding />,
      type: 'number',
      prefix: 'currency',
      placeholder: t(
        'real-estate:hero.form.accordion-right.utility.from-price'
      ),
      min: 1,
      max: 250,
    },
    {
      key: 'maxFloors',
      thousand: true,
      allowNegative: false,
      decorator: <FaBuilding />,
      type: 'number',
      prefix: 'currency',
      placeholder: t('real-estate:hero.form.accordion-right.utility.to-price'),
      min: 0,
      max: 250,
    },
  ],
});

export default fields;
