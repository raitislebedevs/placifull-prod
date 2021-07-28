//import Gallery from './Gallery';
import About from './About';
import Features from './Features';
const RightSection = (props) => {
  const { t, listingItem } = props;

  return (
    <div className="job__id__left">
      {/*listingItem?.listingGallery && (
        <Gallery listingItem={listingItem} t={t} />
      )*/}
      <About listingItem={listingItem} t={t} />
      <Features listingItem={listingItem} t={t} />
    </div>
  );
};

export default RightSection;
