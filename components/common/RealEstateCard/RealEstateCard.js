import React from 'react';
import Rating from 'react-rating';
import { withTranslation } from 'i18n';
import {
  FaSearchLocation,
  FaBath,
  FaStar,
  FaRegStar,
  FaParking,
  FaRegEye,
  FaRegBuilding,
} from 'react-icons/fa';
import { GiFamilyHouse } from 'react-icons/gi';
import { IoBedSharp } from 'react-icons/io5';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import { formatNumber } from 'utils';
import Image from 'next/image';

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

const RealEstateCard = (props) => {
  const { t, item } = props;
  return (
    <div
      className={`real-estate-item-card ${item.isPromotable ? 'promoted' : ''}`}
    >
      <div className="real-estate-item-card__image-cover">
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
              <div classNama="cover__image" key={i?.id}>
                <Image
                  src={i.url}
                  className="carousel-container__item"
                  alt="Card"
                  width={483}
                  height={300}
                  quality={100}
                />
                <span className="item__name-address">
                  {item?.country?.native && (
                    <div className="name-address__address">
                      <FaSearchLocation className="wrapper__icon" />{' '}
                      {item?.country?.native}{' '}
                      {item?.city?.name && `, ${item?.city?.name} `}
                    </div>
                  )}
                </span>
              </div>
            ))
          ) : (
            <a className="carousel-container__item">
              <span className="item__name-address">
                {item?.country?.native && (
                  <div className="name-address__address">
                    <FaSearchLocation className="wrapper__icon" />{' '}
                    {item?.country?.native}{' '}
                    {item?.city?.name && `, ${item?.city?.name} `}
                  </div>
                )}
              </span>
            </a>
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
              {formatNumber(item?.area) || 0}{' '}
              {item?.areaMeasurement === 'metter' ? 'm' : 'ft'}
              <sup>2</sup>
            </div>
          </div>
          {item?.floors && !item?.inFloor && (
            <div className="upper-real-estate-item__wrapper">
              <FaRegBuilding className="wrapper__icon" />
              <div className="wrapper__text">{item.floors}</div>
            </div>
          )}
          {item?.floors && item?.inFloor && (
            <div className="upper-real-estate-item__wrapper">
              <FaRegBuilding className="wrapper__icon" />
              <div className="wrapper__text">{`${item.inFloor}/${item?.floors}`}</div>
            </div>
          )}
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
            {formatNumber(item?.popularity?.views) || 0})
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation('listing-cards')(RealEstateCard);
