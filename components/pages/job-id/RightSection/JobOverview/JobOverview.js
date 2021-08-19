import { Row, Col, Container } from 'react-bootstrap';
import { AiOutlineWallet } from 'react-icons/ai';
import { RiCalendar2Line, RiEye2Line, RiBuildingLine } from 'react-icons/ri';
import { IoGlobeOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { formatNumber, getDayCount } from 'utils/standaloneFunctions';
import useListingCurrency from 'hooks/useListingCurrency';

const JobOverview = (props) => {
  const { t, listingItem } = props;
  const [listingCurrency] = useListingCurrency(listingItem);
  return (
    <div className="right-section__job-overview">
      <h5>{t('job-detail:job-overview.heading')}</h5>
      <Container className="item-container">
        <Row className="overview-item">
          <Col lg={2} sm={2} xs={2} className={'item__icon'}>
            <AiOutlineWallet className={'job__icon'} />
          </Col>
          <Col lg={10} sm={10} xs={10} className={'item__info'}>
            <div>
              <em>{t('job-detail:job-overview.items.offered-salary')}</em>
            </div>
            {listingItem?.annualSalaryFrom && (
              <div>
                {listingCurrency + ' '}
                {`${formatNumber(listingItem?.annualSalaryFrom)} -
                ${formatNumber(listingItem?.annualSalaryTo)}`}{' '}
                {listingItem?.currency?.symbol}{' '}
                {t('job-detail:job-overview.salary.annual')}
              </div>
            )}
            {listingItem?.monthlySalaryFrom && (
              <div>
                {listingCurrency + ' '}
                {`${formatNumber(listingItem?.monthlySalaryFrom)} -
                ${formatNumber(listingItem?.monthlySalaryTo)}`}{' '}
                {listingItem?.currency?.symbol}{' '}
                {t('job-detail:job-overview.salary.monthly')}
              </div>
            )}
            {listingItem?.hourlySalaryFrom && (
              <div>
                {listingCurrency + ' '}
                {`${formatNumber(listingItem?.hourlySalaryFrom)} -
                ${formatNumber(listingItem?.hourlySalaryTo)}`}{' '}
                {listingItem?.currency?.symbol}{' '}
                {t('job-detail:job-overview.salary.hourly')}
              </div>
            )}
          </Col>
        </Row>
        {listingItem?.enLanguages && (
          <Row className="overview-item">
            <Col lg={2} sm={2} xs={2} className={'item__icon'}>
              <IoGlobeOutline className={'job__icon'} />
            </Col>

            <Col lg={10} sm={10} xs={10} className={'item__info'}>
              <div>
                {' '}
                <em>{t('job-detail:job-overview.items.languages')}</em>
              </div>{' '}
              {listingItem.enLanguages?.map((item) => {
                return <div key={item}>{item}</div>;
              })}
            </Col>
          </Row>
        )}
        {listingItem.nativeLanguages && (
          <Row className="overview-item">
            <Col lg={2} sm={2} xs={2} className={'item__icon'}>
              <IoGlobeOutline className={'job__icon'} />
            </Col>
            <Col lg={10} sm={10} xs={10} className={'item__info'}>
              <div>
                <em>{t('job-detail:job-overview.items.native')}</em>
              </div>

              {listingItem.nativeLanguages?.map((item) => {
                return <div key={item}>{item}</div>;
              })}
            </Col>
          </Row>
        )}
        {listingItem?.vacancyOption && (
          <Row className="overview-item">
            <Col lg={2} sm={2} xs={2} className={'item__icon'}>
              <RiBuildingLine className={'job__icon'} />
            </Col>
            <Col lg={10} sm={10} xs={10} className={'item__info'}>
              <div>
                <em>{t('job-detail:job-overview.items.industry')}</em>
              </div>
              <div>
                {t(
                  `job-common:work-area.options.${listingItem?.vacancyOption}`
                )}
              </div>
            </Col>
          </Row>
        )}

        <hr className="separator" />

        <Row className="overview-item">
          <Col lg={2} sm={2} xs={2} className={'item__icon'}>
            <RiCalendar2Line className={'job__icon'} />
          </Col>
          <Col lg={10} sm={10} xs={10} className={'item__info'}>
            <div>
              {getDayCount(listingItem?.insertDate) == 0
                ? t('common:listing-input-date.today')
                : getDayCount(listingItem?.insertDate) == 1
                ? t('common:listing-input-date.yesterday')
                : `${getDayCount(listingItem?.insertDate)} ${t(
                    'common:listing-input-date.days-ago'
                  )}`}
            </div>
          </Col>
        </Row>

        <Row className="overview-item">
          <Col lg={2} sm={2} xs={2} className={'item__icon'}>
            <RiEye2Line className={'job__icon'} />
          </Col>
          <Col lg={10} sm={10} xs={10} className={'item__info'}>
            <div>
              {listingItem?.popularity?.views
                ? listingItem?.popularity?.views
                : 0}
              {' ' + t('job-detail:job-overview.views')}
            </div>
          </Col>
        </Row>

        <Row className="overview-item">
          <Col lg={2} sm={2} xs={2} className={'item__icon'}>
            <IoDocumentTextOutline className={'job__icon'} />
          </Col>
          <Col lg={10} sm={10} xs={10} className={'item__info'}>
            <div>
              {listingItem?.Applicants?.length > 0
                ? listingItem?.Applicants?.length
                : 0}
              {' ' + t('job-detail:job-overview.applicants')}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default JobOverview;
