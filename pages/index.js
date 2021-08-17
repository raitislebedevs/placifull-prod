import Head from 'next/head';
import PropTypes from 'prop-types';
import { withTranslation } from 'i18n';
import {
  HeroSection,
  RealEstateSection,
  JobSection,
  TransportationSection,
  ServiceSection,
  PriceSection,
} from '../components/pages/home';
import { isListingsFree } from 'constants/parameters';

const Home = (props) => {
  const { t } = props;
  return (
    <div className="home-container">
      <Head>
        <title>Placifull</title>
      </Head>
      <HeroSection t={t} />
      <RealEstateSection t={t} />
      <TransportationSection t={t} />
      <JobSection t={t} />
      <ServiceSection t={t} />
      {!isListingsFree && <PriceSection t={t} />}
    </div>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ['common', 'home', 'navbar', 'footer'],
});

Home.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation(['home', 'common'])(Home);
