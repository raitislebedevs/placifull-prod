import ContactForm from './ContactForm';
import ContactTimes from './ContactTimes';
import Ultilities from './Ultilities';

const RightSection = (props) => {
  const { t, listingItem } = props;

  return (
    <div className="real-estate__right__section">
      <ContactForm listingItem={listingItem} t={t} />
      <ContactTimes listingItem={listingItem} t={t} />
      <Ultilities listingItem={listingItem} t={t} />
    </div>
  );
};

export default RightSection;
