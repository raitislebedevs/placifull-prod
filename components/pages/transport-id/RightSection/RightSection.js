import { BountyMarker } from 'components//common/index';
import useListingCurrency from 'hooks/useListingCurrency';
import ContactForm from './ContactForm';
import ContactTimes from './ContactTimes';

const RightSection = (props) => {
  const { t, listingItem } = props;
  const [listingCurrency] = useListingCurrency(listingItem);

  return (
    <div className="transport__right__section">
      <BountyMarker
        t={t}
        listingCurrency={listingCurrency}
        listingItem={listingItem}
      />
      <ContactForm listingItem={listingItem} t={t} />
      <ContactTimes listingItem={listingItem} t={t} />
    </div>
  );
};

export default RightSection;
