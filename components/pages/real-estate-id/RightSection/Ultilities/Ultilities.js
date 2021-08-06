import { useEffect, useState } from 'react';
import { SubPageHeading } from 'components/common';

const Ultilities = (props) => {
  const { t, listingItem } = props;
  const [listingCurrency, setListingCurrency] = useState('$');

  useEffect(() => {
    handleListingCurrency();
  }, []);

  const handleListingCurrency = () => {
    if (listingItem?.currency?.symbol)
      return setListingCurrency(listingItem?.currency?.symbol);

    if (listingItem?.currency) return setListingCurrency(listingItem?.currency);
  };
  return (
    <>
      {listingItem?.totalUltilities && (
        <div className="right-section__utilities">
          <SubPageHeading className="utilities__heading">
            {t('real-estate-common:utilities.heading')}
          </SubPageHeading>
          <div className="utilities__items">
            {listingItem?.ultilitiesPrice &&
              Object.entries(listingItem?.ultilitiesPrice)?.map(
                (item) =>
                  typeof item[1] === 'number' &&
                  item[1] > 0 && (
                    <div className="items__wrapper" key={item[0]}>
                      <div className="wrapper__label">
                        {t(`real-estate-common:utilities.items.${item[0]}`)}
                      </div>
                      <div className="wrapper__value">
                        {listingCurrency} {item[1]}
                      </div>
                    </div>
                  )
              )}
            <div className="items__total-price">
              <div className="wrapper__label">
                {t('real-estate-common:utilities.total')}
              </div>
              <div className="wrapper__value">
                {listingCurrency}{' '}
                {listingItem?.totalUltilities ||
                  (listingItem?.ultilitiesPrice
                    ? Object.entries(listingItem?.ultilitiesPrice)
                        ?.filter(
                          (item) => typeof item[1] === 'number' && item[1] > 0
                        )
                        .reduce(
                          (accumulator, currentValue) =>
                            +accumulator + +currentValue[1],
                          0
                        )
                    : 0)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Ultilities;
