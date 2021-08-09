import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Row, Col, Spinner } from 'react-bootstrap';
import { FaStar, FaRegStar, FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiCalendar2Line } from 'react-icons/ri';
import { RiEye2Line } from 'react-icons/ri';
import Rating from 'react-rating';
import RealEstateListingServices from 'services/realEstateListingServices';
import Carousel from 'react-multi-carousel';
import Link from 'node_modules/next/link';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { getExpiryCount } from 'utils/standaloneFunctions';
import { ModalAsk } from 'components/common';
import useSubscriptions from 'hooks/useSubscriptions';
import useUpdateSubscriptions from 'hooks/useUpdateSubscriptions';
import { FileServices } from 'services';

const noRealEstate = '/static/images/no-listings/RealEstate.png';

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

const RealEstate = (props) => {
  const { t, user } = props;
  const [limit, setLimit] = useState(7);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [removableListing, setRemovableListing] = useState('');
  const [subscriptions, getSubscriptions] = useSubscriptions();
  const [handleUpdate] = useUpdateSubscriptions();

  useEffect(() => {
    getRealEstate();
  }, [limit, skip]);

  const getRealEstate = async () => {
    try {
      setIsLoading(true);
      const result = await RealEstateListingServices.FIND({
        _limit: limit,
        _start: skip,
        _where: {
          user: user.id,
        },
      });

      const count = await RealEstateListingServices.COUNT({
        _where: {
          user: user.id,
        },
      });
      setTotal(count.data);
      setItems(result.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    let selected = page.selected;
    let skip = Math.ceil(selected * limit);
    setSkip(skip);
  };

  const handleDeleteListing = async () => {
    try {
      setIsLoading(true);
      await getSubscriptions(t, user?.id);
      let result = await handleUpdate(
        subscriptions,
        subscriptions.realEstate,
        removableListing,
        subscriptions.id
      );

      let removeableListing = items.filter(
        (item) => item.id === removableListing
      )[0];
      let awsS3items = removeableListing?.listingGallery;
      if (!result) {
        setIsLoading(false);
        await getRealEstate();
        return TostifyCustomContainer(
          'warning',
          t('error:listing.not-deleted')
        );
      }

      await RealEstateListingServices.DELETE(removableListing);

      awsS3items.forEach(async (element) => {
        await FileServices.DELETE_FILE(element.id);
      });

      setIsLoading(false);
      handleCloseDeleteModal();
      await getRealEstate();
      TostifyCustomContainer(
        'success',
        t('common:toast.messages.success'),
        t('profile:toast.item-deleted')
      );
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsShowDeleteModal(false);
    setRemovableListing('');
  };

  const handleOpenDeleteModal = (id) => {
    setIsShowDeleteModal(true);
    setRemovableListing(id);
  };

  return (
    <div className="right-content__real-estate">
      <ModalAsk
        isShowDeleteModal={isShowDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDelete={handleDeleteListing}
        bodyText={t('profile:delete-modal.body')}
        headerText={t('profile:delete-modal.header')}
        submitText={t('profile:delete-modal.delete')}
        cancelText={t('profile:delete-modal.cancel')}
      />
      <div className="real-estate__heading">
        {t('profile:right-content.tabs.common.title')}
      </div>
      <div className="real-estate__list-items">
        {isLoading ? (
          <div className="list-items__loading">
            <Spinner
              as="span"
              animation="grow"
              variant="danger"
              size="md"
              role="status"
            />
            <p> {t('common:elements.loading-left')}</p>
          </div>
        ) : (
          <>
            {' '}
            {items?.length === 0 ? (
              <div className={'listings__not__placed'}>
                <img
                  src={noRealEstate}
                  id="logo"
                  className="mx-auto d-block"
                  alt="RealEstate"
                />
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div className="wrapper__item" key={item.id}>
                    <div className="wrapper-image">
                      {' '}
                      <Carousel
                        arrows={true}
                        dragable={true}
                        infinite={true}
                        centerMode={false}
                        responsive={responsive}
                        containerClass="cover__carousel-container"
                        itemClass="cover__item"
                      >
                        {item?.listingGallery?.length > 0 ? (
                          item?.listingGallery?.map((item) => (
                            <img
                              src={item.url}
                              key={item.id}
                              className="item__image"
                            />
                          ))
                        ) : (
                          <></>
                        )}
                      </Carousel>
                      {item.action == 'rent' && (
                        <div className="item-wrapper__label for__rent">
                          <span>
                            {t('profile:right-content.tabs.actions.rent')}
                          </span>
                        </div>
                      )}
                      {item.action == 'sell' && (
                        <div className="item-wrapper__label for__sale">
                          <span>
                            {t('profile:right-content.tabs.actions.sell')}
                          </span>
                        </div>
                      )}
                      {item.action == 'exchange' && (
                        <div className="item-wrapper__label for__exchange">
                          <span>
                            {t('profile:right-content.tabs.actions.exchange')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="wrapper-content">
                      <div className="header-item">
                        <div className="header-text">
                          <div className="header__text">
                            <div className="header__text--main">
                              {item?.fullAddress}
                            </div>
                            <div className="header__text--subtext">
                              {item?.country?.native} {item?.city?.name}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="header__ratings">
                            <Rating
                              stop={5}
                              initialRating={item?.popularity?.rating || 0}
                              readonly
                              fullSymbol={<FaStar className="ratings__icon" />}
                              emptySymbol={
                                <FaRegStar className="ratings__icon" />
                              }
                            />
                            <span className="rattings__count">
                              {item?.popularity?.rating || 0}
                            </span>

                            <span className="header__ratings-views">
                              <RiEye2Line /> {item?.popularity?.views || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="info-item">
                        <div className="bid__highest">
                          <div className="first_highest__bid">
                            <span>
                              {t('profile:right-content.tabs.common.lowest')}:
                            </span>
                            <span>
                              {item?.currency?.symbol} {item?.bidOffer?.highest}
                            </span>
                          </div>
                          <div className="highest__bid__info">
                            <div>{item?.bidOffer?.highestemail} </div>
                            <div> {item?.bidOffer?.highestphone}</div>
                          </div>
                        </div>
                        <div className="bid__lowest">
                          <div className="first_lowest_bid">
                            <span>
                              {t('profile:right-content.tabs.common.highest')}:
                            </span>
                            <span>
                              {item?.currency?.symbol} {item?.bidOffer?.lowest}
                            </span>
                          </div>

                          <div className="lowest__bid__info">
                            <div>{item?.bidOffer?.lowestemail} </div>
                            <div> {item?.bidOffer?.lowestphone}</div>
                          </div>
                        </div>
                      </div>
                      <Row className="content__footer">
                        <Col
                          xl={6}
                          lg={6}
                          md={6}
                          sm={12}
                          xs={12}
                          className="body__actions"
                        >
                          {/*}
                     <Link
                        href={`/real-estate/edit/${item?.id}`}
                        key={item.id}
                      >
                        <div className="action__wrapper">
                          <AiOutlineEdit className="wrapper__icon" />{' '}
                          <span className="wrapper__text">
                            {t('profile:right-content.tabs.common.button-edit')}
                          </span>
                        </div>
                      </Link>
                      */}
                          <div
                            className="action__wrapper action__wrapper--danger"
                            onClick={() => handleOpenDeleteModal(item.id)}
                          >
                            <FaRegTrashAlt className="wrapper__icon" />{' '}
                            <span className="wrapper__text">
                              {t(
                                'profile:right-content.tabs.common.button-delete'
                              )}
                            </span>
                          </div>
                        </Col>

                        <Col
                          xl={6}
                          lg={6}
                          md={6}
                          sm={12}
                          xs={12}
                          className="body__actions-lowest"
                        >
                          <div className="action__wrapper">
                            <RiCalendar2Line className="wrapper__icon" />{' '}
                            <span className="wrapper__text">
                              {getExpiryCount(item?.expiryDate)
                                ? `${getExpiryCount(item?.expiryDate)} `
                                : '- '}
                              {t('profile:right-content.tabs.common.days-left')}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
      <div className="search-result__paginate">
        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          breakLabel={'...'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          pageCount={Math.ceil(total / limit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'page-item'}
          activeClassName={'page-item active'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          pageClassNam={'page-item'}
          pageLinkClassName={'page-link'}
        />
      </div>
    </div>
  );
};

export default RealEstate;
