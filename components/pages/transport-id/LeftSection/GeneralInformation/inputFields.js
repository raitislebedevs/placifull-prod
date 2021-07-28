import { formatNumber } from 'utils/standaloneFunctions';
import moment from 'moment';

const inputFields = (t, listingItem, listingCurrency) => [
  {
    key: 'brand',
    label: t('transport-detail:general-info.brand'),
    value: listingItem?.transportBrand,
  },
  {
    key: 'model',
    label: t('transport-detail:general-info.model'),
    value: listingItem?.transportModel,
  },
  {
    key: 'yearFactured',
    label: t('transport-detail:general-info.year'),
    value: listingItem?.year ? moment(listingItem?.year).format('YYYY/MM') : '',
  },
  {
    key: 'price',
    label: t('transport-detail:general-info.price'),
    value:
      listingItem?.price &&
      `${listingCurrency} ${formatNumber(listingItem?.price)}`,
  },
  {
    key: 'distance',
    label: t('transport-detail:general-info.distance'),
    value: `${formatNumber(listingItem?.distance)}`,
  },
  {
    key: 'maxSpeed',
    label: t('transport-detail:general-info.max-speed'),
    value: listingItem?.maxSpeed
      ? `${listingItem?.maxSpeed}  ${
          listingItem?.areaMeasurement === 'kilometerPerHour' ? 'km/h' : 'mph'
        }`
      : '',
  },
  {
    key: 'fuelEconomy',
    label: t('transport-detail:general-info.fuel-economy'),
    value: listingItem?.fuelEconomy,
  },
  {
    key: 'doorCount',
    label: t('transport-detail:general-info.doors'),
    value: listingItem?.numberOfDoors,
  },
  {
    key: 'seatCount',
    label: t('transport-detail:general-info.seats'),
    value: listingItem?.numberOfSeats,
  },
  {
    key: 'engineType',
    label: t(`transport-common:engine.label`),
    value:
      listingItem?.engineType &&
      t(`transport-common:engine.options.${listingItem?.engineType}`),
  },
  {
    key: 'gearBox',
    label: t(`transport-common:gear-box.label`),
    value:
      listingItem?.gearBox &&
      t(`transport-common:gear-box.options.${listingItem?.gearBox}`),
  },
  {
    key: 'colour',
    label: t(`transport-common:color.label`),
    value:
      listingItem?.color &&
      t(`transport-common:color.options.${listingItem?.color}`),
  },
];

export default inputFields;
