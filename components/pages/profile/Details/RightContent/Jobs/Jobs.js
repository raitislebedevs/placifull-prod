import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { FaStar, FaRegStar, FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiCalendar2Line, RiEye2Line } from 'react-icons/ri';
import Rating from 'react-rating';
import { VacancyListingService } from 'services';
import Link from 'next/link';
import { formatNumber, getExpiryCount } from 'utils/standaloneFunctions';
import { ModalAsk } from 'components/common';
import useSubscriptions from 'hooks/useSubscriptions';
import useUpdateSubscriptions from 'hooks/useUpdateSubscriptions';

const noJobs = '/static/images/no-listings/Jobs.png';

const Jobs = (props) => {
  const { t, user } = props;
  const [limit, setLimit] = useState(7);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(1);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [removableListing, setRemovableListing] = useState('');
  const [subscriptions, getSubscriptions] = useSubscriptions();
  const [handleUpdate] = useUpdateSubscriptions();

  useEffect(() => {
    getJobPosts();
  }, [limit, skip]);

  const getJobPosts = async () => {
    try {
      setIsLoading(true);
      const result = await VacancyListingService.FIND({
        _limit: limit,
        _start: skip,
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
        subscriptions.jobs,
        removableListing,
        subscriptions.id
      );
      let removeableListing = items.filter(
        (item) => item.id === removableListing
      )[0];
      let awsS3items = removeableListing?.listingGallery;

      let logoId = removeableListing?.companyLogo.id;

      if (result) await VacancyListingService.DELETE(removableListing);

      await FileServices.DELETE_FILE(logoId);
      awsS3items.forEach(async (element) => {
        await FileServices.DELETE_FILE(element.id);
      });

      await getJobPosts();
      await updateSubscription();
      setIsLoading(false);
      handleCloseDeleteModal();
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

  const updateSubscription = async () => {
    console.log('Update Id', removableListing);
  };

  return (
    <div className="right-content__job">
      <ModalAsk
        isShowDeleteModal={isShowDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDelete={handleDeleteListing}
        bodyText={t('profile:delete-modal.body')}
        headerText={t('profile:delete-modal.header')}
        submitText={t('profile:delete-modal.delete')}
        cancelText={t('profile:delete-modal.cancel')}
      />
      <div className="job__heading">
        {t('profile:right-content.tabs.common.title')}
      </div>
      <div className="job__list-items">
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
                  src={noJobs}
                  id="logo"
                  className="mx-auto d-block"
                  alt="Jobs"
                />
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <Row
                    className="list-items__item-wrapper  ml-1 mr-1"
                    key={item.id}
                  >
                    <Col lg={3} className="image__wrapper pl-0 pr-0">
                      <div className="item-wrapper__cover-image">
                        <img src={item?.companyLogo?.url} />
                      </div>
                    </Col>
                    <Col lg={9}>
                      <div className="item-wrapper__content">
                        <Row className="content__header">
                          <Col
                            className="custom__xl6 custom__lg6 custom__md6"
                            sm={12}
                            xs={12}
                          >
                            <a href="#" className="header__name">
                              {item?.positionHeader}
                            </a>

                            <div className="header__info-text">
                              {item?.officeAddress}
                            </div>
                          </Col>

                          <Col
                            className="custom__xl6 custom__lg6 custom__md6"
                            sm={12}
                            xs={12}
                          >
                            <div className="header__ratings">
                              <Rating
                                stop={5}
                                initialRating={item.ratings}
                                readonly
                                fullSymbol={
                                  <FaStar className="ratings__icon" />
                                }
                                emptySymbol={
                                  <FaRegStar className="ratings__icon" />
                                }
                              />
                              <span className="rattings__count">
                                {item?.ratings}
                              </span>

                              <div className="header__ratings-views">
                                <span>
                                  <RiEye2Line /> {item?.popularity?.views || 0}
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row className="content__body">
                          <Col xl={2} lg={6} md={6} sm={6} xs={12}>
                            <div className="content__body--item__divide"></div>
                            <div className="content__body--info__title">
                              {t('profile:right-content.tabs.job.count')}
                            </div>

                            <div className="content__body--info__count">
                              {item?.Applicants.length || 0}
                            </div>
                          </Col>
                          <Col xl={2} lg={6} md={6} sm={6} xs={12}>
                            <div className="content__body--item__divide"></div>

                            <div className="content__body--info__title">
                              {t('profile:right-content.tabs.job.avarage')}
                            </div>

                            <div className="content__body--info__count">
                              {item?.bidOffer?.avarage
                                ? item?.currency?.symbol +
                                  ' ' +
                                  formatNumber(item?.bidOffer?.avarage)
                                : '-'}
                            </div>
                          </Col>
                          <Col xl={2} lg={6} md={6} sm={6} xs={12}>
                            <div className="content__body--item__divide"></div>

                            <div className="content__body--info__title">
                              {t('profile:right-content.tabs.job.lowest')}
                            </div>

                            <div className="content__body--info__count">
                              {' '}
                              {item?.bidOffer?.lowest
                                ? item?.currency?.symbol +
                                  ' ' +
                                  formatNumber(item?.bidOffer?.lowest)
                                : '-'}
                            </div>
                          </Col>
                          <Col xl={2} lg={6} md={6} sm={6} xs={12}>
                            <div className="content__body--info__title">
                              {t('profile:right-content.tabs.job.highest')}
                            </div>

                            <div className="content__body--info__count">
                              {' '}
                              {item?.bidOffer?.highest
                                ? item?.currency?.symbol +
                                  ' ' +
                                  formatNumber(item?.bidOffer?.highest)
                                : '-'}
                            </div>
                          </Col>

                          <Col
                            xl={2}
                            lg={6}
                            md={6}
                            sm={6}
                            xs={12}
                            className="content__body--btn__col"
                          >
                            <Link href={`/profile/job-applications/${item.id}`}>
                              {t('profile:right-content.tabs.job.button')}
                            </Link>
                          </Col>
                        </Row>

                        <Row className="content__footer">
                          <Col
                            xl={6}
                            lg={6}
                            md={6}
                            sm={6}
                            xs={12}
                            className="body__actions"
                          >
                            {/*}
                     <Link
                        href={`/job-search/edit/${item?.id}`}
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
                            sm={6}
                            xs={12}
                            className="body__actions-lowest"
                          >
                            <div className="action__wrapper">
                              <RiCalendar2Line className="wrapper__icon" />{' '}
                              <span className="wrapper__text">
                                {getExpiryCount(item?.expiryDate)
                                  ? `${getExpiryCount(item?.expiryDate)} `
                                  : '- '}
                                {t(
                                  'profile:right-content.tabs.common.days-left'
                                )}
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
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

export default Jobs;
