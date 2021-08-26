import React from 'react';
import Rating from 'react-rating';
import { withTranslation } from 'i18n';
import {
  FaSearchLocation,
  FaStar,
  FaRegStar,
  FaRegEye,
  FaTachometerAlt,
} from 'react-icons/fa';
import { GiSpeedometer, GiFuelTank, GiCarSeat } from 'react-icons/gi';
import { BsGear } from 'react-icons/bs';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
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

const TransportationCard = (props) => {
  const { t, item } = props;
  return (
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
        <FaRegEye /> ({item?.popularity?.views || 0})
      </div>
      <div className="transport-item-card__price-tag">
        {item?.currency?.symbol} {formatNumber(item?.price)}
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
              <a key={i?.id}>
                <img
                  src={i.url}
                  className="carousel-container__item"
                  alt="Card"
                />
                <div className="item__name-address">
                  {item?.country?.native || item?.city?.name ? (
                    <>
                      <div className="name-address__address">
                        <FaSearchLocation className="wrapper__icon" />{' '}
                        {item?.country?.native}{' '}
                        {item?.city?.name && item?.country?.native
                          ? `, ${item?.city?.name}`
                          : item?.city?.name
                          ? item?.city?.name
                          : ''}
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </a>
            ))
          ) : (
            <a className="carousel-container__item">
              <div className="item__name-address">
                {item?.country?.native || item?.city?.name ? (
                  <>
                    <div className="name-address__address">
                      <FaSearchLocation className="wrapper__icon" />{' '}
                      {item?.country?.native}{' '}
                      {item?.city?.name && item?.country?.native
                        ? `, ${item?.city?.name}`
                        : item?.city?.name
                        ? item?.city?.name
                        : ''}
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </a>
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
            <div className="wrapper__text">{` ${
              item?.distance ? formatNumber(item?.distance) : '-'
            }  ${item.distanceMesurment === 'kilometer' ? 'km' : 'mi'} `}</div>
          </div>

          {item?.numberOfSeats && (
            <div className="upper-transport-item__wrapper">
              <GiCarSeat className="wrapper__icon" />
              <div className="wrapper__text">{item?.numberOfSeats}</div>
            </div>
          )}
          <div className="upper-transport-item__wrapper">
            <GiFuelTank className="wrapper__icon" />
            <div className="wrapper__text">{`${
              item?.fuelEconomy ? item?.fuelEconomy : '-'
            }   ${
              item.fuelEconomyMesurment === 'litrePerKilometer'
                ? 'l/100 km'
                : 'mpg'
            } `}</div>
          </div>
        </div>
        <div className="inforamtion__bottom-transport-item">
          <div className="bottom-transport-item__wrapper">
            <GiSpeedometer className="wrapper__icon" />
            <div className="wrapper__text">{` ${
              item?.maxSpeed ? item?.maxSpeed : '-'
            }  ${
              item.speedMesurment === 'kilometerPerHour' ? 'km/h' : 'mph'
            } `}</div>
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
    </div>
  );
};

export default withTranslation('listing-cards')(TransportationCard);
