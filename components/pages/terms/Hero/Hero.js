import { FaChevronRight } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

const HeroTerms = (props) => {
  const { t } = props;

  return (
    <div className="terms__link__container">
      <section className="terms__hero__section">
        <Container className="terms__header__link">
          <h4 className="terms__header__title"> {t('terms:hero.heading')}</h4>
          <div className="terms__header__navbar">
            <nav aria-label="breadcrumb" className="">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/" aria-label="Home">
                    Placifull
                    <FaChevronRight />
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">{t('terms:hero.heading')}</a>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      {/* <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg viewBox="0 0 2880 48" fill="none">
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div> */}
    </div>
  );
};

export default HeroTerms;
