import Gallery from './Gallery';
import About from './About';
import GeneralInformation from './GeneralInformation';
import Features from './Features';
const RightSection = (props) => {
  const { t, listingItem } = props;
  return (
    <div className="transport__id__left">
      <Gallery listingItem={listingItem} t={t} />
      <About listingItem={listingItem} t={t} />
      <GeneralInformation listingItem={listingItem} t={t} />
      <Features listingItem={listingItem} t={t} />
    </div>
  );
};

export default RightSection;
