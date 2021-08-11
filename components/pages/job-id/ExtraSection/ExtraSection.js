import { useEffect } from 'react';
import { SubPageHeading } from 'components/common';
import { Spinner } from 'react-bootstrap';
import { VacancyListingService } from 'services';
import Link from 'next/link';
import { formatNumber } from 'utils';
import useUserListings from 'hooks/useUserListings';

const ExtraSection = (props) => {
  const { t, listingItem } = props;
  const [isLoading, isSingleListing, userItems, userItemCount] =
    useUserListings(listingItem, VacancyListingService);
  let listingCount = 0;

  useEffect(() => {
    listingCount = 0;
  }, []);

  return (
    <>
      {!isSingleListing && (
        <div className="job-container__extra">
          <SubPageHeading className="extra__heading">
            {t('job-detail:extra.heading')} {`(${userItemCount})`}
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
                      {t('job-detail:extra.table.number')}
                    </th>
                    <th scope="col"> {t('job-detail:extra.table.country')}</th>
                    <th scope="col">
                      {' '}
                      {t('job-detail:extra.table.full-address')}
                    </th>
                    <th scope="col"> {t('job-detail:extra.table.position')}</th>
                    <th scope="col"> {t('job-detail:extra.table.contract')}</th>
                    <th scope="col"> {t('job-detail:extra.table.time')}</th>
                    <th scope="col"> {t('job-detail:extra.table.salary')}</th>
                    <th className="last__col__row" scope="col">
                      {t('job-detail:extra.table.end-date')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userItems.map((item) => {
                    return (
                      <Link href={`/job-search/${item?.id}`} key={item.id}>
                        <tr className={'standalone__row'}>
                          <td scope="row">{++listingCount}</td>
                          {item?.country?.native ? (
                            <td>{`${item?.country?.native}/${item?.country?.name}`}</td>
                          ) : (
                            <td>{`${item?.country?.name}`}</td>
                          )}
                          <td>{item?.officeAddress}</td>
                          <td>{item?.positionHeader}</td>
                          <td>
                            {' '}
                            {t(
                              `job-common:contract-type.options.${item?.contractType}`
                            )}
                          </td>
                          <td>
                            {t(
                              `job-common:working-time.options.${item?.workingTime}`
                            )}
                          </td>
                          <td>
                            <div>
                              {item?.hourlySalaryFrom &&
                                `${
                                  item?.currency?.symbol_native
                                } ${formatNumber(item?.hourlySalaryFrom)} `}
                            </div>
                            <div>
                              {item?.monthlySalaryFrom &&
                                `${
                                  item?.currency?.symbol_native
                                } ${formatNumber(item?.monthlySalaryFrom)} `}
                            </div>
                            <div>
                              {item?.annualSalaryFrom &&
                                `${
                                  item?.currency?.symbol_native
                                } ${formatNumber(item?.annualSalaryFrom)} `}
                            </div>
                          </td>
                          <td>
                            {t(
                              `job-detail:extra.table.condition.${item?.condition}`
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
