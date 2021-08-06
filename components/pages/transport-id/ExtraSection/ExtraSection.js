import { useEffect } from 'react';
import { SubPageHeading } from 'components/common';
import { Spinner } from 'react-bootstrap';
import { TransportListingService } from 'services';
import Link from 'next/link';
import { formatNumber } from 'utils';
import useUserListings from 'hooks/useUserListings';

const ExtraSection = (props) => {
  const { t, listingItem } = props;
  const [isLoading, isSingleListing, userItems, userItemCount] =
    useUserListings(listingItem, TransportListingService);
  let listingCount = 0;

  useEffect(() => {
    listingCount = 0;
  }, []);

  return (
    <>
      {isSingleListing && (
        <div className="transport-container__extra">
          <SubPageHeading className="extra__heading">
            {t('transport-detail:extra.heading')} {`(${userItemCount})`}
          </SubPageHeading>
          {isLoading ? (
            <div className="list-items__loading">
              <Spinner
                as="span"
                animation="border"
                variant="danger"
                size="md"
                role="status"
              />
            </div>
          ) : (
            <div className="table__overflow">
              <table className="table__Listing">
                <thead className="thead-dark">
                  <tr>
                    <th className="first__col__row" scope="col">
                      {t('transport-detail:extra.table.number')}
                    </th>
                    <th scope="col">
                      {' '}
                      {t('transport-detail:extra.table.country')}
                    </th>
                    <th scope="col">
                      {' '}
                      {t('transport-detail:extra.table.brand-model')}
                    </th>
                    <th scope="col">
                      {' '}
                      {t('transport-detail:extra.table.price')}
                    </th>
                    <th scope="col">
                      {' '}
                      {t('transport-detail:extra.table.production-year')}
                    </th>
                    <th className="last__col__row" scope="col">
                      {t('transport-common:condition.label')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userItems.map((item) => {
                    return (
                      <Link href={`/transport/${item?.id}`} key={item.id}>
                        <tr className={'standalone__row'}>
                          <td scope="row">{++listingCount}</td>
                          {item?.country?.native ? (
                            <td>{`${item?.country?.native}/${item?.country?.name}`}</td>
                          ) : (
                            <td>{`${item?.country?.name}`}</td>
                          )}
                          <td>
                            {item?.transportBrand
                              ? `${item?.transportBrand}  ${item?.transportModel}`
                              : ''}
                          </td>
                          <td>
                            {`${item?.currency?.symbol_native} `}
                            {formatNumber(item?.price)}
                          </td>
                          <td>{item?.year}</td>
                          <td>
                            {t(
                              `transport-common:condition.options.${item?.condition}`
                            )}
                          </td>
                        </tr>
                      </Link>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ExtraSection;
