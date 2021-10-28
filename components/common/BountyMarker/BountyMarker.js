import { Row, Col } from 'react-bootstrap';

const BountyMarker = (props) => {
  const { t, listingItem, listingCurrency } = props;

  const bountyDays = [
    { label: t('common:bounty.oneToFive'), key: 'oneToFive' },
    { label: t('common:bounty.sixToFifteen'), key: 'sixToFifteen' },
    { label: t('common:bounty.sixteenPlus'), key: 'sixteenPlus' },
  ];

  return (
    <>
      {(listingItem?.BountyReward?.oneToFive ||
        listingItem?.BountyReward?.sixToFifteen ||
        listingItem?.BountyReward?.sixteenPlus) && (
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className={'bounty'}>
          <div className={'bounty__border'}>
            <div className={'bounty__text'}>{t('common:bounty.label')}</div>
            <Row>
              <>
                {listingItem?.BountyReward?.oneToFive && (
                  <Col
                    xl={4}
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                    className={'bounty__container'}
                  >
                    <div>
                      <div className={'bounty__label'}>
                        {t('common:bounty.oneToFive')}{' '}
                      </div>
                      <div className={'bounty__currency'}>
                        {`${listingCurrency} ${listingItem?.BountyReward?.oneToFive}`}
                      </div>
                    </div>
                  </Col>
                )}
                {listingItem?.BountyReward?.sixToFifteen && (
                  <Col
                    xl={4}
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                    className={'bounty__container'}
                  >
                    <div>
                      <div className={'bounty__label'}>
                        {t('common:bounty.sixToFifteen')}{' '}
                      </div>
                      <div className={'bounty__currency'}>
                        {`${listingCurrency} ${listingItem?.BountyReward?.sixToFifteen}`}
                      </div>
                    </div>
                  </Col>
                )}
                {listingItem?.BountyReward?.sixteenPlus && (
                  <Col
                    xl={4}
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                    className={'bounty__container'}
                  >
                    <div>
                      <div className={'bounty__label'}>
                        {t('common:bounty.sixteenPlus')}{' '}
                      </div>
                      <div className={'bounty__currency'}>
                        {`${listingCurrency} ${listingItem?.BountyReward?.sixteenPlus}`}
                      </div>
                    </div>
                  </Col>
                )}
              </>
            </Row>
          </div>
        </Col>
      )}
    </>
  );
};
export default BountyMarker;
