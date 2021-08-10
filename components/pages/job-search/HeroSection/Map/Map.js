import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Rating from 'react-rating';
import {
  FaCalendarAlt,
  FaRegEye,
  FaHourglassEnd,
  FaStar,
  FaRegStar,
} from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { MdLocationSearching } from 'react-icons/md';
import { ImBriefcase } from 'react-icons/im';
import { formatNumber } from 'utils/standaloneFunctions';

const LeafletMap = dynamic(() => import('components/common/LeafletMap'), {
  ssr: false,
});
const PopupComponent = ({ item, t }) => {
  return (
    <div className={'map_pop_up'}>
      <div className="job-card">
        <div className="job-card__content">
          <Rating
            stop={5}
            initialRating={
              item?.popularity?.rating ? item?.popularity?.rating : 0
            }
            className="job-item-card__ratings"
            readonly
            fullSymbol={<FaStar className="ratings__icon" />}
            emptySymbol={<FaRegStar className="ratings__icon" />}
          />
          <div className="job-item-card__count">
            <FaRegEye className="viewed__icon" />(
            {item?.popularity?.views ? item?.popularity?.views : 0})
          </div>
          <div className="job-item-card__end-time">
            <FaHourglassEnd className="time__icon" />
            {item?.insertDate}
          </div>
          <img
            src={item?.companyLogo.url}
            className="logo__avatar"
            alt="Company Logo"
          />
          <a className="content__name">{item?.positionHeader}</a>
          <p className="content__position">{item?.companyName}</p>
        </div>
        <div className="job-card__details">
          <ul className="details__list">
            <li className="list__item">
              <MdLocationSearching className="job__icon" />
              <span className="text-muted">
                {t('listing-cards:job-card.location')}:{' '}
              </span>
              {item?.officeAddress}
            </li>
            <li className="list__item">
              <FaCalendarAlt className="job__icon" />
              <span className="text-muted">
                {t('listing-cards:job-card.working-schedule.label')}:{' '}
              </span>
              {t(
                `listing-cards:job-card.working-schedule.options.${item?.workingTime}`
              )}
            </li>
            <li className="list__item">
              <GiMoneyStack className="job__icon" />
              <span className="text-muted">
                {t('listing-cards:job-card.salary')}:{' '}
              </span>{' '}
              {item?.currency?.symbol}
              {formatNumber(item?.monthlySalaryFrom)}
              {' - '}
              {item?.currency?.symbol} {formatNumber(item?.monthlySalaryTo)}
            </li>
            <li className="list__item">
              <ImBriefcase className="job__icon" />
              <span className="text-muted">
                {t('listing-cards:job-card.contract-type.label')}:
              </span>{' '}
              {t(
                `listing-cards:job-card.contract-type.options.${item?.contractType}`
              )}
            </li>
          </ul>
          <Link href={`/job-search/${item?.id}`}>
            <Button className="job-card__button" variant="outline-primary">
              {t('listing-cards:job-card.button')}{' '}
              <FontAwesomeIcon icon="arrow-right" className="button__icon" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Map = (props) => {
  const [searchItems, setSearchItems] = useState();
  const { t, listSearchResult } = props;

  useEffect(() => {
    setSearchItems(
      listSearchResult.map((item) => ({
        ...item,
        popup: <PopupComponent item={item} t={t} />,
      }))
    );
  }, [listSearchResult]);

  let items = listSearchResult.map((item) => ({
    ...item,
    popup: <PopupComponent item={item} t={t} />,
  }));

  return (
    <div className="hero__map">
      <LeafletMap
        listSearchResult={items}
        currentCenter={
          items[0]?.latitude
            ? {
                lat: items[0].latitude,
                lng: items[0].longitude,
              }
            : items[0]?.city
            ? {
                lat: items[0].city?.latitude,
                lng: items[0].city?.longitude,
              }
            : items[0]?.country
            ? {
                lat: items[0].country?.latitude,
                lng: items[0].country?.longitude,
              }
            : { lat: 50.946285, lng: 20.105078 }
        }
        zoom={items[0]?.city ? 10 : items[0]?.latitude ? 10 : 4}
      ></LeafletMap>
    </div>
  );
};

export default Map;
