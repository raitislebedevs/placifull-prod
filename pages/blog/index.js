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
          content="nekustamie īpašumi, transports, blogs, darbs, padoms darba meklējumos, padoms dzīvokļa iegādē, padoms mājas iegādē, kā sakrāt mājai, real estate, job, transportation, blog, advice moving abroad, advice job hunting, advice buying a hous"
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
