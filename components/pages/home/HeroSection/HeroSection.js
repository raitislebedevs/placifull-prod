import { AiOutlineArrowRight } from 'react-icons/ai';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ReactTypingEffect = dynamic(() => import('react-typing-effect'), {
  ssr: false,
});

const backgroundHero = '/static/images/enterprise.png';

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
      <div
        id="hero-section"
        className="home-container__hero-section"
        style={{ backgroundImage: `url(${backgroundHero})` }}
      >
        <div className="hero-section__bg-overlay"></div>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="hero-section__content-hero">
                <h1 className="content-hero__heading">
                  {t('hero-section.head.line-1')}
                  {'  '}
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
                </h1>
                <h1 className="content-hero__heading">
                  {t('hero-section.head.line-2')}
                </h1>
                <p className="content-hero__text">
                  {t('hero-section.head.line-3')}
                </p>
                <Link href="/sign-in">
                  <Button className="content-hero__button">
                    <AiOutlineArrowRight className="button__icon" />{' '}
                    {t('hero-section.button')}
                  </Button>
                </Link>
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
