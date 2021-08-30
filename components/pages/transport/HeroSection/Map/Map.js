import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import Link from 'next/link';
import Rating from 'react-rating';
import {
  FaSearchLocation,
  FaStar,
  FaRegStar,
  FaTachometerAlt,
} from 'react-icons/fa';
import { GiSpeedometer, GiFuelTank, GiCarSeat } from 'react-icons/gi';
import { BsGear } from 'react-icons/bs';
import { formatNumber } from 'utils';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 5000, min: 992 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 992, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 576 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};

const LeafletMap = dynamic(() => import('components/common/LeafletMap'), {
  ssr: false,
});

const PopupComponent = ({ item, t }) => {
  return (
    <div className={'map_pop_up'}>
      <div className="transport-item-card">
        <Rating
          stop={5}
          initialRating={item?.popularity?.rating || 2.5}
          className="transport-item-card__ratings"
          readonly
          fullSymbol={<FaStar className="ratings__icon" />}
          emptySymbol={<FaRegStar className="ratings__icon" />}
        />
        <div className="transport-item-card__count">
          ({item?.popularity?.views || 0})
        </div>
        <div className="transport-item-card__price-tag">
          {item?.currency?.symbol} {item?.price}
        </div>

        <div className="transport-item-card__image-cover">
          <Carousel
            arrows={true}
            dragable={true}
            infinite={true}
            centerMode={false}
            responsive={responsive}
            containerClass="image-cover__carousel-container"
            itemClass="cover__item"
          >
            {item?.listingGallery?.length > 0 ? (
              item?.listingGallery?.map((i) => (
                <Link href={`/transport/${item?.id}`} key={item?.id}>
                  <a
                    className="carousel-container__item"
                    style={{ backgroundImage: `url(${i.url}` }}
                  >
                    <div className="item__name-address">
                      <div className="name-address__address">
                        <FaSearchLocation className="wrapper__icon" />{' '}
                        {item?.country?.native}, {item?.city?.name}
                      </div>
                    </div>
                  </a>
                </Link>
              ))
            ) : (
              <Link href={`/transport/${item?.id}`} key={item?.id}>
                <a className="carousel-container__item">
                  <div className="item__name-address">
                    <div className="name-address__address">
                      <FaSearchLocation className="wrapper__icon" />{' '}
                      {item?.country?.native}, {item?.city?.name}
                    </div>
                  </div>
                </a>
              </Link>
            )}
          </Carousel>
        </div>

        <div className="transport-item-card__information">
          <Link href={`/transport/${item?.id}`}>
            <a className="information__name">{item?.name}</a>
          </Link>
          <div className="information__upper-transport-item">
            <div className="upper-transport-item__wrapper">
              <FaTachometerAlt className="wrapper__icon" />
              <div className="wrapper__text">
                {formatNumber(item?.distance)}
              </div>
            </div>
            <div className="upper-transport-item__wrapper">
              <GiCarSeat className="wrapper__icon" />
              <div className="wrapper__text">{item?.numberOfSeats}</div>
            </div>
            <div className="upper-transport-item__wrapper">
              <GiFuelTank className="wrapper__icon" />
              <div className="wrapper__text">{item?.fuelEconomy}</div>
            </div>
          </div>
          <div className="inforamtion__bottom-transport-item">
            <div className="bottom-transport-item__wrapper">
              <GiSpeedometer className="wrapper__icon" />
              <div className="wrapper__text">{item?.maxSpeed}</div>
            </div>
            <div className="bottom-transport-item__wrapper">
              <BsGear className="wrapper__icon" />
              <div className="wrapper__text">
                {' '}
                {t(
                  `listing-cards:transport-card.gear-box.options.${item?.gearBox}`
                )}
              </div>
            </div>
            <div className="bottom-transport-item__tag">
              {' '}
              {t(
                `listing-cards:action.options.${item?.action}`
              ).toUpperCase()}{' '}
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};

const Map = (props) => {
  const [searchItems, setSearchItems] = useState();
  const { t, listSearchResult, polygonCreated, polygonsDeleted } = props;

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
        polygonCreated={polygonCreated}
        polygonsDeleted={polygonsDeleted}
        listSearchResult={items}
        drawSearch={true}
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
