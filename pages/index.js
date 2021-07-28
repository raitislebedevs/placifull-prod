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
const logo = '/static/images/title.png';

const Home = (props) => {
  const { t } = props;
  return (
    <div className="home-container">
      <Head>
        <title>Placifull</title>
        <link rel="icon" href={logo} sizes="180x180" />
      </Head>
      <HeroSection t={t} />
      <RealEstateSection t={t} />
      <TransportationSection t={t} />
      <JobSection t={t} />
      <ServiceSection t={t} />
      <PriceSection t={t} />
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
