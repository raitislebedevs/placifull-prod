import { AiOutlineArrowRight } from 'react-icons/ai';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { upperCaseFirstLetter } from 'utils/standaloneFunctions';
const realEstateIntro = '/static/images/home-icons/property.svg';
const transportIntro = '/static/images/home-icons/transport.svg';
const jobIntro = '/static/images/home-icons/job.svg';

const ReactTypingEffect = dynamic(() => import('react-typing-effect'), {
  ssr: false,
});

const HeroSection = (props) => {
  const { t } = props;
  const messages = [
    t('hero-section.head.options.text-1'),
    t('hero-section.head.options.text-2'),
    t('hero-section.head.options.text-3'),
    t('hero-section.head.options.text-4'),
  ];

  return (
    <>
      <div id="hero-section" className="home-container__hero-section">
        <div className="hero-section__bg-overlay"></div>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="hero-section__content-hero">
                <h1 className="content-hero__heading">
                  {t('hero-section.head.line-1')}
                  <div>
                    <span className="heading__type-write element">
                      <span className="type-write__wrap">
                        <ReactTypingEffect
                          speed={250}
                          eraseSpeed={100}
                          eraseDelay={2000}
                          typingDelay={100}
                          cursorRenderer={(cursor) => (
                            <span className="heading__type-write-cursor">
                              {cursor}
                            </span>
                          )}
                          text={messages}
                        />
                      </span>
                    </span>
                  </div>
                </h1>
                <h1 className="content-hero__heading">
                  {t('hero-section.head.line-2')}
                </h1>
                <Row className="content-hero__text">
                  <Col xs={4} md={4} lg={4} xl={4}>
                    <Link href="/real-estate">
                      <div className={'container'}>
                        <div className={'home__icons'}>
                          <img alt="Real Estate" src={realEstateIntro} />
                        </div>
                        <div className="hover__container">
                          <div className="hover__text">
                            {upperCaseFirstLetter(
                              t(
                                'navbar:opportunities.real-estate'
                              ).toLowerCase()
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                  <Col xs={4} md={4} lg={4} xl={4}>
                    <Link href="/transport">
                      <div className={'container'}>
                        <div className={'home__icons'}>
                          <img alt="Transport" src={transportIntro} />
                        </div>
                        <div className="hover__container">
                          <div className="hover__text">
                            {upperCaseFirstLetter(
                              t('navbar:opportunities.vehicles').toLowerCase()
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                  <Col xs={4} md={4} lg={4} xl={4}>
                    <Link href="/job-search">
                      <div className={'container'}>
                        <div className={'home__icons'}>
                          <img alt="Job Search" src={jobIntro} />
                        </div>
                        <div className="hover__container">
                          <div className="hover__text">
                            {upperCaseFirstLetter(
                              t('navbar:opportunities.job-search').toLowerCase()
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                </Row>
                <div>
                  <Link href="/sign-in">
                    <Button
                      className="content-hero__button"
                      aria-label="HeroButton"
                    >
                      <AiOutlineArrowRight className="button__icon" />{' '}
                      {t('hero-section.button')}
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="position-relative-top">
        <div className="shape-top">
          <svg viewBox="0 0 2880 96" fill="none">
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
