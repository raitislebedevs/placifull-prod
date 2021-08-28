import { PageHeading } from 'components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner, Row, Col } from 'react-bootstrap';
import { AiOutlineClockCircle } from 'react-icons/ai';
import Rating from 'react-rating';
import { FiFlag } from 'react-icons/fi';
import { FiEye } from 'react-icons/fi';
import { FaStar, FaRegStar, FaRegBuilding } from 'react-icons/fa';
import { RealEstateListingServices } from 'services';
import { formatNumber, getDayCount } from 'utils/standaloneFunctions';
import usePopularity from 'hooks/usePopularity';
import useListingCurrency from 'hooks/useListingCurrency';
import useFlagged from 'hooks/useFlagged';
import { useState } from 'react';

const Header = (props) => {
  const { t, listingItem } = props;
  const [hoverRating, setHoverRating] = useState(0);
  const [listingCurrency] = useListingCurrency(listingItem);
  const [liveViews, starValue, isLoading, handleRating] = usePopularity(
    listingItem,
    RealEstateListingServices
  );
  const [isLoadingFlag, isListingFlagged, handleFlagged] = useFlagged(
    listingItem,
    RealEstateListingServices
  );

  const ratingOnChange = async (e) => {
    if (e) {
      setHoverRating(e);
      return;
    }
    setHoverRating(0);
  };

  return (
    <Row className="real-estate-container__header">
      <Col lg={8}>
        <Row>
          <Col xl={8} lg={8} md={12} sm={12} xs={12} className=" __left">
            <div className="listing__route">
              {listingItem?.category && (
                <span>
                  {`${t(
                    `real-estate-common:category.options.${listingItem?.category}`
                  )}`}
                </span>
              )}
              {listingItem?.condition && (
                <span>
                  {` | ${t(
                    `real-estate-common:condition.options.${listingItem?.condition}`
                  )} `}
                </span>
              )}
              {listingItem?.country?.native && (
                <span> {` | ${listingItem?.country?.native} `} </span>
              )}
            </div>

            <Row className="view_labels">
              {listingItem?.isPromotable ? (
                <>
                  <Col lg={3} xl={3} md={6} sm={6} xs={6} className="p-1">
                    <div className="__featured">
                      {t('real-estate-detail:about.featured')}
                    </div>
                  </Col>

                  <Col lg={3} xl={3} md={6} sm={6} xs={6} className=" p-1">
                    <div className="__rent">
                      {t(
                        `real-estate-common:action.options.${listingItem?.action}`
                      )}
                    </div>
                  </Col>
                </>
              ) : (
                <Col lg={4} xl={4} md={12} sm={12} xs={12} className=" p-1">
                  <div className="__rent">
                    {' '}
                    {t(
                      `real-estate-common:action.options.${listingItem?.action}`
                    )}
                  </div>
                </Col>
              )}
              <Col lg={3} md={6} sm={6} xs={6} className="date__ago  p-1">
                <AiOutlineClockCircle />{' '}
                {getDayCount(listingItem?.insertDate) == 0
                  ? t('common:listing-input-date.today')
                  : getDayCount(listingItem?.insertDate) == 1
                  ? t('common:listing-input-date.yesterday')
                  : `${getDayCount(listingItem?.insertDate)} ${t(
                      'common:listing-input-date.days-ago'
                    )}`}
              </Col>
              <Col lg={3} md={6} sm={6} xs={6} className="views  p-1">
                <FiEye /> {liveViews || 0}
              </Col>
            </Row>

            <PageHeading className="listing__name">
              {listingItem?.name}
            </PageHeading>
            <Row className={'address__details'}>
              <div className="listing__location">
                <FontAwesomeIcon icon="map-marker-alt" />{' '}
                {listingItem?.fullAddress}
              </div>
              {listingItem?.floors && !listingItem?.inFloor && (
                <div className="floor__count">
                  <FaRegBuilding />
                  <span className="wrapper__text">{listingItem.floors}</span>
                </div>
              )}
              {listingItem?.floors && listingItem?.inFloor && (
                <div className="floor__count">
                  <FaRegBuilding />
                  <span className="wrapper__text">{`${listingItem.inFloor}/${listingItem?.floors}`}</span>
                </div>
              )}
            </Row>
          </Col>
          <Col xl={4} lg={4} md={12} sm={12} xs={12} className=" __right">
            <Row className="listing__popularity">
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  variant="danger"
                  size="xs"
                  role="status"
                />
              ) : (
                <div className="ratings">
                  <Rating
                    stop={5}
                    fractions={4}
                    onHover={ratingOnChange}
                    initialRating={starValue}
                    className="real-estate-item-card__ratings"
                    fullSymbol={<FaStar className="ratings__icon" />}
                    emptySymbol={<FaRegStar className="ratings__icon" />}
                    value={starValue}
                    onClick={(rate) => {
                      handleRating(rate);
                    }}
                  />
                  <span className={'rating__value'}>
                    {hoverRating
                      ? hoverRating.toFixed(2)
                      : starValue.toFixed(2)}
                  </span>
                </div>
              )}
              {isLoadingFlag ? (
                <div className="spinner__classs">
                  <Spinner
                    as="span"
                    animation="border"
                    variant="danger"
                    size="xs"
                    role="status"
                  />
                </div>
              ) : (
                <div
                  className={
                    isListingFlagged
                      ? 'flagged popularity__icons'
                      : 'popularity__icons'
                  }
                  onClick={handleFlagged}
                >
                  <FiFlag />
                </div>
              )}
            </Row>
            <h5 className="listing__price">
              {listingCurrency} {formatNumber(listingItem?.price)}{' '}
            </h5>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
