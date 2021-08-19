import { PageHeading } from 'components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner, Row, Col } from 'react-bootstrap';
import { AiOutlineClockCircle } from 'react-icons/ai';
import Rating from 'react-rating';
import { FiFlag } from 'react-icons/fi';
import { FiEye } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { TransportListingService } from 'services';
import { formatNumber, getDayCount } from 'utils/standaloneFunctions';
import usePopularity from 'hooks/usePopularity';
import useFlagged from 'hooks/useFlagged';
import useListingCurrency from 'hooks/useListingCurrency';

const Header = (props) => {
  const { t, listingItem } = props;
  const [listingCurrency] = useListingCurrency(listingItem);
  const [isLoadingFlag, isListingFlagged, handleFlagged] = useFlagged(
    listingItem,
    TransportListingService
  );
  const [liveViews, starValue, isLoading, handleRating] = usePopularity(
    listingItem,
    TransportListingService
  );

  return (
    <Row className="transport-container__header">
      <Col lg={8}>
        <Row>
          <Col xl={8} lg={8} md={12} sm={12} xs={12} className=" __left">
            <div className="listing__route">
              {listingItem?.transportType && (
                <span>
                  {t(
                    `transport-common:transport-type.options.${listingItem?.transportType}`
                  )}
                </span>
              )}
              {listingItem?.condition && (
                <span>
                  {` | ${t(
                    `transport-common:condition.options.${listingItem?.condition}`
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
                      {t('transport-detail:promoted')}
                    </div>
                  </Col>

                  <Col lg={3} xl={3} md={6} sm={6} xs={6} className=" p-1">
                    <div className="__rent">
                      {t(
                        `transport-common:condition.options.${listingItem?.condition}`
                      )}
                    </div>
                  </Col>
                </>
              ) : (
                <Col lg={4} xl={4} md={12} sm={12} xs={12} className=" p-1">
                  <div className="__rent">
                    {t(
                      `transport-common:action.options.${listingItem?.action}`
                    )}
                  </div>
                </Col>
              )}
              <Col lg={3} md={6} sm={6} xs={6} className="date__ago  p-1">
                <AiOutlineClockCircle />{' '}
                {getDayCount(listingItem?.insertDate) === 0
                  ? t('common:listing-input-date.today')
                  : getDayCount(listingItem?.insertDate) === 1
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

            <h3 className="listing__location">
              <FontAwesomeIcon icon="map-marker-alt" />{' '}
              {listingItem?.meetUpAddress}
            </h3>
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
                    fractions={2}
                    initialRating={starValue}
                    className="transport-item-card__ratings"
                    fullSymbol={<FaStar className="ratings__icon" />}
                    emptySymbol={<FaRegStar className="ratings__icon" />}
                    value={starValue}
                    onChange={(rate) => {
                      handleRating(rate);
                    }}
                  />
                </div>
              )}
              {isLoadingFlag ? (
                <Spinner
                  as="span"
                  animation="border"
                  variant="danger"
                  size="xs"
                  role="status"
                />
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
