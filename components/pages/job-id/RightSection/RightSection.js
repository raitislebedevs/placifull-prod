import ContactForm from './ContactForm';
import ContactTimes from './ContactTimes';
import JobOverview from './JobOverview';

const RightSection = (props) => {
  const { t, listingItem } = props;

  return (
    <div className="job__right__section">
      <JobOverview listingItem={listingItem} t={t} />
      <ContactForm listingItem={listingItem} t={t} />
      <ContactTimes listingItem={listingItem} t={t} />
    </div>
  );
};

export default RightSection;
