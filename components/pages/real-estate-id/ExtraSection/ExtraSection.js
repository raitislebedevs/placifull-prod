import { SubPageHeading } from 'components/common';
import { Spinner } from 'react-bootstrap';
import RealEstateListingServices from 'services/realEstateListingServices';
import Link from 'next/link';
import { formatNumber } from 'utils';
import useUserListings from 'hooks/useUserListings';
import { useEffect } from 'react';

const ExtraSection = (props) => {
  const { t, listingItem } = props;
  const [isLoading, isSingleListing, userItems, userItemCount] =
    useUserListings(listingItem, RealEstateListingServices);

  let listingCount = 0;

  useEffect(() => {
    listingCount = 0;
  }, []);

  return (
    <>
      {isSingleListing && (
        <div className="real-estate-container__extra">
          <SubPageHeading className="extra__heading">
            {t('real-estate-detail:extra.heading')} {`(${userItemCount})`}
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
                      {t('real-estate-detail:extra.table.number')}
                    </th>
                    <th scope="col">
                      {' '}
                      {t('real-estate-detail:extra.table.country')}
                    </th>
                    <th scope="col">
                      {' '}
                      {t('real-estate-detail:extra.table.full-address')}
                    </th>
                    <th scope="col">
                      {' '}
                      {t('real-estate-detail:extra.table.area')}
                    </th>
                    <th scope="col">
                      {' '}
                      {t('real-estate-detail:extra.table.bed-rooms')}
                    </th>
                    <th scope="col">
                      {' '}
                      {t('real-estate-detail:extra.table.price')}
                    </th>
                    <th scope="col">
                      {' '}
                      {t('real-estate-detail:extra.table.year-built')}
                    </th>
                    <th className="last__col__row" scope="col">
                      {t('real-estate-common:condition.label')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userItems.map((item) => {
                    return (
                      <Link href={`/real-estate/${item?.id}`} key={item.id}>
                        <tr className={'standalone__row'}>
                          <td scope="row">{++listingCount}</td>
                          {item?.country?.native ? (
                            <td>{`${item?.country?.native}/${item?.country?.name}`}</td>
                          ) : (
                            <td>{`${item?.country?.name}`}</td>
                          )}
                          <td>{item?.fullAddress}</td>
                          <td>{item?.area}</td>
                          <td>{item?.rooms}</td>
                          <td>
                            {`${item?.currency?.symbol_native} `}
                            {formatNumber(item?.price)}
                          </td>
                          <td>{item?.yearBuilt}</td>
                          <td>
                            {t(
                              `real-estate-common:condition.options.${item?.condition}`
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
