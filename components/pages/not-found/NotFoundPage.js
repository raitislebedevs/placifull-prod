import Link from 'next/link';

const NotFoundPage = (props) => {
  const { t } = props;

  return (
    <div id="notfound">
      <div className="not_found_container">
        <div>
          <img
            src={
              'https://placifull-static.s3.eu-central-1.amazonaws.com/404.png'
            }
            className="not_found_image"
            alt="Placifull"
          />
        </div>
        <div className="not_found_text">
          <h2>{t('main-text')}</h2>
          <p>{t('sub-text')}</p>
          <Link href="/">{t('navigation')}</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
