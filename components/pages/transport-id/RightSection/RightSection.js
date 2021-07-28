import ContactForm from './ContactForm';
import ContactTimes from './ContactTimes';

const RightSection = (props) => {
  const { t, listingItem } = props;

  return (
    <div className="transport__right__section">
      <ContactForm listingItem={listingItem} t={t} />
      <ContactTimes listingItem={listingItem} t={t} />
    </div>
  );
};

export default RightSection;
