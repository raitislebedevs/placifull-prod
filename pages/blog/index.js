import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Hero from 'components/pages/blog/Hero';
import BlogSection from 'components/pages/blog/BlogSection';

const BlogPosts = (props) => {
  const { t } = props;
  return (
    <div className="termsPage-container main-container">
      <Head>
        <title>{t('blog:title')}</title>
        <meta
          name="keywords"
          content="voting board, user input, user suggestions, user meaningful, meaningful life, balsošanas dēlis, lietotāja ieteikumi, lietotāja viedoklis"
        />
      </Head>
      <Hero t={t} />
      <BlogSection t={t} />
    </div>
  );
};

BlogPosts.getInitialProps = async () => ({
  namespacesRequired: ['blog', 'navbar', 'footer', 'error'],
});

BlogPosts.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(BlogPosts);
