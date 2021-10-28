import { BountyMarker } from 'components//common/index';
import useListingCurrency from 'hooks/useListingCurrency';
import ContactForm from './ContactForm';
import ContactTimes from './ContactTimes';
import JobOverview from './JobOverview';

const RightSection = (props) => {
  const { t, listingItem } = props;
  const [listingCurrency] = useListingCurrency(listingItem);

  return (
    <div className="job__right__section">
      <BountyMarker
        t={t}
        listingCurrency={listingCurrency}
        listingItem={listingItem}
      />
      <JobOverview listingItem={listingItem} t={t} />
      <ContactForm listingItem={listingItem} t={t} />
      <ContactTimes listingItem={listingItem} t={t} />
    </div>
  );
};

export default RightSection;
