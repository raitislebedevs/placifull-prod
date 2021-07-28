import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import Rating from 'react-rating';
import {
  FaSearchLocation,
  FaBath,
  FaStar,
  FaRegStar,
  FaParking,
  FaRegEye,
} from 'react-icons/fa';
import React from 'react';
import { GiFamilyHouse } from 'react-icons/gi';
import { IoBedSharp } from 'react-icons/io5';
import Link from 'next/link';
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
      <div className="real-estate-item-card">
        <div className="real-estate-item-card__image-cover ">
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
                <Link href={`/real-estate/${item?.id}`} key={item.id}>
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
              <Link href={`/real-estate/${item?.id}`} key={item.id}>
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
        <div className="bottom-real-estate-item__tag">
          {t(`listing-cards:action.options.${item?.action}`).toUpperCase()}{' '}
        </div>
        <div className="real-estate-item-card__information">
          <div className="real-estate-item-card__price-tag">
            {' '}
            {item?.currency?.symbol} {formatNumber(item?.price)}
          </div>
          <Link href={`/real-estate/${item?.id}`}>
            <a className="information__name">{item?.name}</a>
          </Link>
          <div className="information__upper-real-estate-item">
            <div className="upper-real-estate-item__wrapper">
              <GiFamilyHouse className="wrapper__icon" />
              <div className="wrapper__text">
                {item?.area || 0}{' '}
                {item?.areaMeasurement === 'metter' ? 'm' : 'ft'}
                <sup>2</sup>
              </div>
            </div>
            <div className="upper-real-estate-item__wrapper">
              <IoBedSharp className="wrapper__icon" />
              <div className="wrapper__text">{item?.rooms || 0}</div>
            </div>
            <div className="upper-real-estate-item__wrapper">
              <FaBath className="wrapper__icon" />
              <div className="wrapper__text">{item?.bathCount || 0}</div>
            </div>
            {item?.parking && (
              <div className="upper-real-estate-item__wrapper">
                <FaParking className="wrapper__icon" />
              </div>
            )}
          </div>
          <div className="inforamtion__bottom-real-estate-item">
            <Rating
              fractions={2}
              stop={5}
              initialRating={item?.popularity?.rating || 2.5}
              className="real-estate-item-card__ratings"
              readonly
              fullSymbol={<FaStar className="ratings__icon" />}
              emptySymbol={<FaRegStar className="ratings__icon" />}
            />
            <div className="real-estate-item-card__count">
              <FaRegEye className="viewed__icon" />(
              {item?.popularity?.views || 0})
            </div>
          </div>
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
