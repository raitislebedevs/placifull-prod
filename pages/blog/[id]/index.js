import { useEffect } from 'react';
import { LoadingOverlay } from 'components/common';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { BlogService } from 'services';
import { withTranslation } from 'i18n';
import BlogItem from 'components/pages/blog-id';

const BlogDetails = (props) => {
  const { t, blogItem } = props;
  const router = useRouter();

  useEffect(() => {
    if (!blogItem) {
      router.push('/404');
    }
  }, []);

  if (!blogItem) {
    return <LoadingOverlay />;
  }

  return (
    <div className="blog__item__container">
      <Head>
        <title>{blogItem?.header}</title>
        <meta
          property="og:image"
          content={blogItem?.gallery.url}
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content={'Placifull.com'}
          key="ogsitename"
        />
        <meta property="og:title" content={blogItem?.header} key="ogtitle" />
        <meta
          property="og:description"
          content={blogItem?.header}
          key="ogdesc"
        />
      </Head>
      <Container>
        <BlogItem blogItem={blogItem} t={t} />
      </Container>
    </div>
  );
};

BlogDetails.getInitialProps = async ({ query }) => {
  const { id } = query;
  try {
    const { data } = await BlogService.GET(id);
    return {
      blogItem: data,
      namespacesRequired: ['common', 'navbar', 'footer', 'blog'],
    };
  } catch {}
};
BlogDetails.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(BlogDetails);
