import { formatNumber } from 'utils/standaloneFunctions';
import moment from 'moment';

const inputFields = (t, listingItem, listingCurrency) => [
  {
    key: 'propertyArea',
    label: t('real-estate-detail:general-info.property-area'),
    value: listingItem?.area ? (
      <span>
        {listingItem?.area}{' '}
        {listingItem?.areaMeasurement === 'metter' ? 'm' : 'ft'}
        <sup>2</sup>
      </span>
    ) : (
      ''
    ),
  },
  {
    key: 'rooms',
    label: t('real-estate-detail:general-info.rooms'),
    value: listingItem?.rooms,
  },
  {
    key: 'yearBuilt',
    label: t('real-estate-detail:general-info.year-built'),
    value: listingItem?.yearBuilt
      ? moment(listingItem?.yearBuilt).format('YYYY')
      : '',
  },
  {
    key: 'price',
    label: t('real-estate-detail:general-info.price'),
    value: (
      <>
        {`${formatNumber(
          (listingItem?.price / listingItem?.area).toFixed(2)
        )} ${listingCurrency}/${
          listingItem?.areaMeasurement === 'metter' ? 'm' : 'ft'
        }`}
        <sup>2</sup>{' '}
      </>
    ),
  },
  {
    key: 'totalUltilities',
    label: t('real-estate-detail:general-info.total-ultilities'),
    value: listingItem?.totalUltilities
      ? `${listingCurrency} ${listingItem?.totalUltilities}`
      : '',
  },
  {
    key: 'moveInDate',
    label: t('real-estate-detail:general-info.move-in'),
    value: listingItem?.moveInDate
      ? moment(listingItem.moveInDate).format('MM/DD/YYYY')
      : '',
  },
  {
    key: 'moveOutDate',
    label: t('real-estate-detail:general-info.move-out'),
    value: listingItem?.moveOutDate
      ? moment(listingItem.moveOutDate).format('MM/DD/YYYY')
      : '',
  },
];

export default inputFields;
