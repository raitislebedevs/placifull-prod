import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Row, Col, Spinner } from 'react-bootstrap';
import { VacancyListingService } from 'services';
import { RiBuildingLine } from 'react-icons/ri';
import { IoLocationOutline } from 'react-icons/io5';
import { formatNumber } from 'utils/standaloneFunctions';
import { ApplicantForm } from 'components/common';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import usePopularity from 'hooks/usePopularity';
import useListingCurrency from 'hooks/useListingCurrency';

const Header = (props) => {
  const { t, listingItem, user } = props;
  const { isPreview } = listingItem;
  const [justApplied, setJustApplied] = useState(false);
  const [listingCurrency] = useListingCurrency(listingItem);
  const [applicantForm, setApplicantForm] = useState(false);
  const [liveViews, starValue, isLoading, handleRating] = usePopularity(
    listingItem,
    VacancyListingService
  );

  useEffect(() => {
    hasUserApplied();
  }, [user]);

  const handleApplicants = () => {
    if (!user)
      return TostifyCustomContainer(
        'info',
        t('common:toast.messages.info'),
        t('job-application:job-apply.toast.log-in')
      );

    if (!hasUserApplied()) {
      setApplicantForm(true);
    }
  };

  const hasUserApplied = () => {
    if (isPreview) return;

    let result = false;
    if (justApplied) {
      TostifyCustomContainer(
        'info',
        t('common:toast.messages.info'),
        t('job-application:job-apply.toast.just')
      );
      return true;
    }
    listingItem?.Applicants.forEach((element) => {
      if (element?.cv?.id === user?.curriculumVitae?.id) {
        TostifyCustomContainer(
          'info',
          t('common:toast.messages.info'),
          t('job-application:job-apply.toast.applied')
        );
        result = true;
      }
    });
    return result;
  };

  return (
    <Row className="job-container__header">
      <Col xl={8} lg={8} md={12} sm={12} xs={12} className="job-main__title">
        <Row className={'job__main__info'}>
          <Col lg={5} sm={12} xs={12} className={'vacancy__logo__container'}>
            <img
              src={
                listingItem?.companyLogo.url || listingItem?.companyLogo.preview
              }
              id="logo"
              alt="Placifull"
              className={'vacancy__logo'}
            />
          </Col>
          <Col lg={7} sm={12} xs={12}>
            <div className={'job__label'}>
              {t(`job-common:working-time.options.${listingItem?.workingTime}`)}
            </div>
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
                  className="job-item-card__ratings"
                  fullSymbol={<FaStar className="ratings__icon" />}
                  emptySymbol={<FaRegStar className="ratings__icon" />}
                  value={starValue}
                  onClick={(rate) => {
                    handleRating(rate);
                  }}
                />
              </div>
            )}
            <div className={'job__name'}>{listingItem?.positionHeader}</div>
            <div className={'job__location'}>
              <IoLocationOutline className={'job__icon'} />
              {listingItem?.officeAddress}
            </div>
            <div className={'job__company'}>
              <RiBuildingLine className={'job__icon'} />{' '}
              {listingItem?.companyName}
            </div>
            <div className={'job__salary'}>
              {listingCurrency}
              {formatNumber(listingItem?.monthlySalaryFrom)} - {listingCurrency}
              {formatNumber(listingItem?.monthlySalaryTo)}{' '}
              <em> {t(`job-detail:header.salary-month`)}</em>
            </div>
          </Col>
        </Row>
      </Col>
      <Col xl={4} lg={4} md={12} sm={12} xs={12} className="job-buttons">
        <div className="button-container">
          <div>
            <Button
              onClick={() => handleApplicants()}
              className="header-buttons"
            >
              {t(`job-detail:header.buttons.apply`)}
            </Button>
          </div>
          {/* <div>
            <Button className="header-buttons btn-success">
              {t(`job-detail:header.buttons.share`)}
            </Button>
          </div> */}
        </div>
      </Col>

      <ApplicantForm
        t={t}
        listingItem={listingItem}
        show={applicantForm}
        heading={listingItem?.positionHeader}
        applicants={listingItem?.Applicants || []}
        currency={listingCurrency}
        justApplied={justApplied}
        setJustApplied={setJustApplied}
        id={listingItem?.id}
        isPreview={isPreview}
        setApplicantForm={setApplicantForm}
        onHide={() => setApplicantForm(false)}
      />
    </Row>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(Header);
